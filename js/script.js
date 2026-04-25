// Helper function for safer element selection
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Theme toggle
$("#theme-toggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Contact form
$(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you! Your message has been received.");
  event.target.reset();
});

// Profile picture hover message
const profilePic = $(".profile-pic");
const hoverMessage = $(".hover-message");

if (profilePic && hoverMessage) {
  profilePic.addEventListener("mouseenter", () => {
    hoverMessage.style.opacity = "1";
  });

  profilePic.addEventListener("mouseleave", () => {
    hoverMessage.style.opacity = "0";
  });
}

// Project search
const projectSearch = $("#project-search");
const projectCards = $$(".project-card");
const noResultsMessage = $("#no-results-message");

projectSearch?.addEventListener("input", () => {
  const searchValue = projectSearch.value.toLowerCase().trim();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const description = card.querySelector("p")?.textContent.toLowerCase() || "";

    const isMatch =
      title.includes(searchValue) || description.includes(searchValue);

    card.style.display = isMatch ? "block" : "none";

    if (isMatch) visibleCount++;
  });

  if (noResultsMessage) {
    noResultsMessage.style.display = visibleCount ? "none" : "block";
  }
});

// AI news loader
const newsButton = $("#load-news");
const newsList = $("#news-list");
const newsStatus = $("#news-status");

const aiKeywords = ["ai", "artificial intelligence", "machine learning", "llm"];

newsButton?.addEventListener("click", async () => {
  if (!newsList || !newsStatus) return;

  newsList.innerHTML = "";
  newsStatus.textContent = "Loading AI news...";

  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const storyIds = await response.json();
    let foundStories = 0;

    for (const id of storyIds) {
      if (foundStories === 5) break;

      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      const story = await storyResponse.json();

      if (!story?.title) continue;

      const title = story.title.toLowerCase();
      const isAiRelated = aiKeywords.some((keyword) =>
        title.includes(keyword)
      );

      if (!isAiRelated) continue;

      const storyUrl =
        story.url || `https://news.ycombinator.com/item?id=${story.id}`;

      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <a href="${storyUrl}" target="_blank" rel="noopener noreferrer">
          ${story.title}
        </a>
        <p>Source: Hacker News</p>
      `;

      newsList.appendChild(card);
      foundStories++;
    }

    newsStatus.textContent =
      foundStories === 0 ? "No AI-related news found right now." : "";
  } catch {
    newsStatus.textContent =
      "Sorry, failed to load AI news. Please try again later.";
  }
});

// About text word animation setup
const aboutText = $("#about-text");

if (aboutText) {
  aboutText.innerHTML = aboutText.textContent
    .split(" ")
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");
}
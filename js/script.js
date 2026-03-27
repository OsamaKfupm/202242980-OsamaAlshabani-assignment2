const themeToggleButton = document.getElementById("theme-toggle");
const contactForm = document.querySelector(".contact-form");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you! Your message has been received.");
  contactForm.reset();
});

const profilePic = document.querySelector(".profile-pic");
const hoverMessage = document.querySelector(".hover-message");

profilePic.addEventListener("mouseenter", () => {
  hoverMessage.style.opacity = "1";
});

profilePic.addEventListener("mouseleave", () => {
  hoverMessage.style.opacity = "0";
});

const projectSearch = document.getElementById("project-search");
const projectCards = document.querySelectorAll(".project-card");
const noResultsMessage = document.getElementById("no-results-message");

projectSearch.addEventListener("input", () => {
  const searchValue = projectSearch.value.toLowerCase().trim();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();
    const matches =
      title.includes(searchValue) || description.includes(searchValue);

    card.style.display = matches ? "block" : "none";

    if (matches) {
      visibleCount++;
    }
  });

  noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
});

const newsButton = document.getElementById("load-news");
const newsList = document.getElementById("news-list");
const newsStatus = document.getElementById("news-status");

if (newsButton) {
  newsButton.addEventListener("click", async () => {
    newsList.innerHTML = "";
    newsStatus.textContent = "Loading AI news...";

    try {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();

      let count = 0;

      for (let i = 0; i < storyIds.length && count < 5; i++) {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`
        );
        const story = await storyResponse.json();

        if (
          story &&
          story.title &&
          (story.title.toLowerCase().includes("ai") ||
            story.title.toLowerCase().includes("artificial intelligence") ||
            story.title.toLowerCase().includes("machine learning") ||
            story.title.toLowerCase().includes("llm"))
        ) {
          const card = document.createElement("div");
          card.classList.add("news-card");

          const storyUrl = story.url ? story.url : `https://news.ycombinator.com/item?id=${story.id}`;

          card.innerHTML = `
            <a href="${storyUrl}" target="_blank" rel="noopener noreferrer">${story.title}</a>
            <p>Source: Hacker News</p>
          `;

          newsList.appendChild(card);
          count++;
        }
      }

      if (count === 0) {
        newsStatus.textContent = "No AI-related news found right now.";
      } else {
        newsStatus.textContent = "";
      }
    } catch (error) {
      newsStatus.textContent = "Sorry, failed to load AI news. Please try again later.";
    }
  });
}


const aboutText = document.getElementById("about-text");

if (aboutText) {
  const words = aboutText.textContent.split(" ");
  aboutText.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");
}
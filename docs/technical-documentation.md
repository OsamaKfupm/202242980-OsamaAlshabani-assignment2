# Technical Documentation

## 📁 Project Structure

- `index.html`  
  Main structure of the website, containing all sections (Hero, About, Projects, Contact, AI News)

- `css/styles.css`  
  Handles layout, styling, responsive design, animations, and theme support

- `js/script.js`  
  Contains all JavaScript logic for interactivity and data handling

- `assets/images/`  
  Stores images such as profile picture and project images

- `docs/`  
  Contains documentation files (AI usage report and technical documentation)

---

## 🧠 Design Decisions

- Used **Flexbox** for navigation and layout alignment
- Used **CSS Grid** for displaying project cards and news items
- Implemented **responsive design** using media queries to support mobile, tablet, and desktop views
- Chose a **clean and minimal UI** for readability and professional appearance
- Added a **dark/light theme toggle** for better user experience

---

## ⚙️ Features Implementation

### 1. Responsive Design
- Media queries adjust layout for smaller screens
- Navigation and content stack properly on mobile devices
- Images and sections scale appropriately

---

### 2. Theme Toggle (Dark/Light Mode)
- JavaScript toggles a `dark-mode` class on the `<body>`
- CSS changes colors, backgrounds, and components based on the theme
- Hero background uses overlay adjustments instead of replacing the image

---

### 3. Profile & Hero Section
- Profile image styled as a circular image using `border-radius: 50%`
- Hero section uses a background image with overlay for readability
- Hover interaction displays a welcome message

---

### 4. Projects Section
- Displays project cards using CSS Grid
- Includes hover animations (lift, shadow, image zoom)
- Implements live search filtering using JavaScript

---

### 5. About Section Interaction
- JavaScript dynamically wraps each word in a `<span>`
- CSS applies hover effects (scaling, color change, glow) to individual words

---

### 6. Contact Form
- Basic form validation using HTML attributes
- JavaScript prevents default submission
- Displays confirmation message upon submission

---

### 7. AI News (Data Handling Requirement)

- Uses **Fetch API** to retrieve data from the Hacker News API
- Filters results to show AI-related topics (AI, ML, LLM, etc.)
- Dynamically creates and displays news cards
- Includes:
  - Loading state feedback
  - Error handling with user-friendly message
  - Fallback when no relevant news is found

---


# Your Energy - GoIT Project

A modern, responsive web application for browsing and managing fitness exercises. Built with Vite and vanilla JavaScript, featuring dynamic exercise filtering, favorites management, and interactive modals with API integration.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features Implementation](#key-features-implementation)
- [Team Workflow](#team-workflow)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## 🎯 About

Your Energy is a fitness exercise catalog application that allows users to:
- Browse exercises by categories (Muscles, Body Parts, Equipment)
- Filter and search through exercise collections
- View detailed exercise information with animations
- Rate exercises and provide feedback
- Save favorite exercises for quick access
- Enjoy responsive design across all devices

**Design:**
[Figma Design File](https://www.figma.com/design/E52uzlaSsHQS9yzLSQrtSX/YourEnergy--Copy-?node-id=126-18318&t=8Tr8GUtplZLQ2Dmk-0)

**API Documentation:**
[Your Energy API Docs](https://your-energy.b.goit.study/api-docs/#/)

**Live Demo:**
[Your Energy App](https://b01ma.github.io/your-energy-goit/)

## ✨ Features

### Exercise Browsing
- **Dynamic Filtering**: Filter exercises by Muscles, Body Parts, or Equipment
- **Category Cards**: Visual category selection with hover effects
- **Pagination**: Navigate through large exercise collections
- **Real-time Search**: Search exercises by name within selected categories
- **Responsive Grid**: Adaptive layout for mobile, tablet, and desktop

### Exercise Details
- **Interactive Modals**: View exercise details in smooth, animated modals
- **Exercise Information**: 
  - Animated GIF demonstrations
  - Target muscle groups
  - Body part focus
  - Equipment requirements
  - Calories burned
  - Exercise duration
  - Popularity rating
- **Star Ratings**: Visual rating display with partial star fills (e.g., 3.7 stars)
- **Smooth Transitions**: Modal-to-modal transitions without backdrop flicker

### Rating System
- **Interactive Rating**: Submit ratings with visual star feedback
- **User Reviews**: Add written feedback for exercises
- **Email Integration**: Associate ratings with email addresses
- **Form Validation**: Client-side validation for rating submissions

### Favorites Management
- **Save Exercises**: Add exercises to favorites with one click
- **Persistent Storage**: Favorites saved in localStorage
- **Dedicated Page**: Separate favorites view with full management
- **Remove from Favorites**: Easy removal with visual feedback
- **State Synchronization**: Button states update across all views

### Additional Features
- **Daily Quotes**: Motivational fitness quotes
- **Smooth Scrolling**: Enhanced navigation experience
- **Loading States**: Animated loaders during data fetching
- **Toast Notifications**: User feedback with iziToast
- **WebP Images**: Optimized image loading for better performance
- **SVG Icon System**: Scalable vector icons with sprite sheet

## 🛠 Tech Stack

- **Build Tool:** Vite 5.4.6
- **Language:** Vanilla JavaScript (ES6+)
- **HTTP Client:** Axios 1.13.2
- **CSS:** Modular CSS with PostCSS processing
- **Modal Libraries:**
  - MicroModal 0.6.1 - Lightweight, accessible modals
  - iziModal 1.6.1 - Advanced modal features
- **Notifications:** iziToast 1.4.0 - Toast notifications
- **Plugins:**
  - vite-plugin-full-reload - Auto-reload on file changes
  - vite-plugin-html-inject - HTML partial injection
  - postcss-nested - Nested CSS rules
  - postcss-sort-media-queries - Optimize media queries

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/b01ma/your-energy-goit.git
   cd your-energy-goit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in your terminal)
   - The browser will open automatically

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

**Note:** The build is configured for GitHub Pages deployment with base path
`/your-energy-goit/`.

### Preview Production Build

```bash
npm run preview
```

After running preview, visit: `http://localhost:4173/your-energy-goit/`

## 📁 Project Structure

```
your-energy-goit/
├── src/
│   ├── index.html              # Home page
│   ├── favorites.html          # Favorites page
│   ├── main.js                 # Main entry point
│   ├── css/
│   │   ├── styles.css          # Main stylesheet importer
│   │   ├── components/         # Component-specific styles
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── hero.css
│   │   │   ├── filter-panel.css
│   │   │   ├── category_template.css
│   │   │   ├── exercise-card.css
│   │   │   ├── exercise-modal.css
│   │   │   ├── rating-modal.css
│   │   │   ├── pagination.css
│   │   │   ├── loader.css
│   │   │   ├── home-quote.css
│   │   │   └── to_top_btn.css
│   │   ├── global/             # Global styles
│   │   │   ├── base.css
│   │   │   ├── reset.css
│   │   │   └── container.css
│   │   └── pages/              # Page-specific styles
│   │       ├── home.css
│   │       └── favorites.css
│   ├── js/
│   │   ├── api/
│   │   │   └── api.js          # API client with Axios
│   │   ├── components/
│   │   │   ├── header.js       # Header navigation
│   │   │   ├── filter-panel.js # Exercise filtering logic
│   │   │   ├── category-template.js # Category card rendering
│   │   │   ├── exercise-card.js # Exercise card rendering
│   │   │   ├── exercise-modal.js # Modal functionality
│   │   │   ├── exercise-modal-favorites.js # Favorites management
│   │   │   ├── pagination.js   # Pagination logic
│   │   │   ├── quote.js        # Daily quote feature
│   │   │   ├── favorites.js    # Favorites page logic
│   │   │   ├── search.js       # Search functionality
│   │   │   └── subscribe.js    # Newsletter subscription
│   │   └── utilities/
│   │       └── loader-cards.js # Loading animations
│   ├── img/
│   │   ├── icons.svg           # SVG sprite sheet
│   │   └── webp/               # Optimized WebP images
│   ├── partials/               # HTML partials
│   │   ├── components/
│   │   │   ├── header.html
│   │   │   ├── footer.html
│   │   │   ├── exercise-modal.html
│   │   │   └── rating-modal.html
│   │   └── content/
│   │       ├── content-home.html
│   │       └── content-favorites.html
│   └── public/                 # Static assets
├── package.json
├── vite.config.js              # Vite configuration
└── README.md
```

## 🔧 Key Features Implementation

### Modal System
The project uses a dual-modal system with smooth transitions:

**Exercise Modal:**
- Fetches exercise details from API by ID
- Displays animated GIF, ratings, and detailed information
- Add/remove from favorites with state synchronization
- Opens rating modal without closing backdrop

**Rating Modal:**
- Interactive 5-star rating system
- Form validation for email and review text
- Submits ratings to API
- Smooth transition back to exercise modal

**Technical Details:**
- MicroModal for lightweight, accessible modals
- Custom transition logic to keep backdrop visible between modals
- Prevents flicker on first modal open with display state initialization
- SVG icons with dynamic paths for Vite production builds

### Filter & Search System
**Three-level filtering:**
1. **Category Level**: Muscles, Body Parts, Equipment
2. **Subcategory Level**: Specific muscle groups, body parts, or equipment types
3. **Search Level**: Real-time search within selected subcategory

**Responsive Pagination:**
- Mobile: 8 exercises per page
- Desktop: 10 exercises per page
- Category cards: 9 (mobile) / 12 (desktop)
- Smooth scroll to top on page change

### Favorites System
**localStorage-based persistence:**
- Stores exercise objects with all necessary data
- Synchronizes button states across home and favorites pages
- Event-driven updates using custom events
- Trash icon for removal on favorites page
- Heart icon for adding on home page

### Star Rating Display
**Decimal precision rendering:**
- Full stars for whole numbers
- Partial star fills using CSS `clip-path`
- SVG-based with smooth animations
- Displays ratings like 3.7, 4.2 accurately

### Image Optimization
- All images converted to WebP format
- 85% quality for optimal size/quality balance
- ~23% size reduction vs original JPG
- Responsive images with srcset for retina displays

### Loading States
- Custom "YOUR ENERGY" animated loader
- Positioned 24px from top, horizontally centered
- Displays during API calls
- Clears content before showing to prevent layout shift

## 👥 Team Workflow

### Branch Strategy

We use a two-branch workflow:

- **`main`** - Production-ready code
- **`staging`** - Development and testing branch

### Working on Features

1. **Pull the latest changes**

   ```bash
   git checkout staging
   git pull origin staging
   ```

2. **Create a feature branch** (optional, for larger features)

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Write clean, maintainable code
   - Follow the existing code style
   - Test your changes locally

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

5. **Push your changes**

   ```bash
   git push origin feature/your-feature-name
   # or if working directly on staging:
   git push origin staging
   ```

6. **Create a Pull Request**

   - Go to the GitHub repository
   - Create a PR from your feature branch to `staging`
   - Request review from team members
   - Address any feedback

7. **After approval**
   - Merge to `staging` for testing
   - When ready for production, create PR from `staging` to `main`

### Commit Message Convention

Use clear, descriptive commit messages:

```
feat: add new exercise filter
fix: resolve layout issue on mobile
docs: update installation instructions
style: format CSS files
refactor: restructure favorites module
test: add unit tests for API calls
```

### Code Review Guidelines

- **Review promptly** - Try to review PRs within 24 hours
- **Be constructive** - Provide helpful feedback
- **Test locally** - Pull the branch and test functionality
- **Check for:**
  - Code quality and readability
  - Performance implications
  - Mobile responsiveness
  - Browser compatibility

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |

## 🤝 Contributing

1. Ensure your code follows the project structure
2. Test your changes across different browsers
3. Update documentation if needed
4. Keep commits atomic and well-described
5. Communicate with the team about major changes

### CSS Guidelines

- Use modular CSS structure
- Place component styles in `css/components/`
- Place page styles in `css/pages/`
- Use CSS custom properties (variables) defined in base.css
- Follow consistent naming conventions
- **Key CSS Variables:**
  - `--color-primary: #9dff00` (Green accent)
  - `--color-bg: #F4F4F4` (Light background)
  - `--color-dark: #242424` (Dark text)
  - `--color-light: #ffffff` (White)
  - `--color-yellow: #FFB800` (Rating stars)

### JavaScript Guidelines

- Use ES6+ features (modules, arrow functions, async/await)
- Keep functions small and focused
- Use meaningful variable names
- Handle errors appropriately with try/catch
- Comment complex logic
- Use event delegation for dynamic elements
- **API Integration:**
  - All API calls through centralized `api.js`
  - Use Axios interceptors for error handling
  - Handle loading states consistently
- **State Management:**
  - localStorage for persistent data (favorites)
  - Custom events for cross-component updates
  - Centralized state functions for consistency

### HTML Guidelines

- Use semantic HTML5 elements
- Keep partials modular and reusable
- Use data attributes for JavaScript hooks
- Ensure accessibility (aria labels, roles)
- Optimize images (WebP format preferred)

## 🎨 Design Patterns

### Modal Pattern
```javascript
// Opening modal with data
const exerciseData = await api.getExercisesById(id);
updateModalContent(exerciseData);
MicroModal.show('exerciseModal');

// Transition between modals (keeping backdrop)
exerciseModalContainer.style.display = 'none';
ratingModalContainer.style.display = 'block';
```

### Favorites Pattern
```javascript
// Save to localStorage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
favorites.push(exerciseData);
localStorage.setItem('favorites', JSON.stringify(favorites));

// Trigger update event
window.dispatchEvent(new Event('favorites-updated'));
```

### Pagination Pattern
```javascript
renderPagination({
  container: paginationElement,
  currentPage: 1,
  totalPages: 5,
  onPageChange: (newPage) => {
    loadExercises(newPage);
  }
});
```

## 🐛 Known Issues & Solutions

### Production Build Issues
- **SVG Icons not showing**: Import sprite with `import iconSprite from '/img/icons.svg'`
- **Images not loading**: Use absolute paths `/img/` not relative `./img/`
- **Modal warnings**: Set `debugMode: false` in MicroModal config

### Performance Optimizations
- WebP images for 23% size reduction
- Lazy loading for images
- Debounced search input
- Pagination to limit DOM elements
- CSS containment for layout stability

## 🚀 Deployment

The project is configured for GitHub Pages deployment:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The build creates optimized files in `dist/`:**
   - Minified JavaScript bundles
   - Optimized CSS
   - Processed HTML
   - Copied static assets

3. **Deploy to GitHub Pages:**
   - Push to `main` branch
   - GitHub Actions automatically deploys from `dist/`
   - Available at: `https://b01ma.github.io/your-energy-goit/`

**Base Path Configuration:**
```javascript
// vite.config.js
export default {
  base: '/your-energy-goit/',
  // ... other config
}
```

## 🧪 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Features used:**
- ES6+ JavaScript
- CSS Grid & Flexbox
- CSS Custom Properties
- Fetch API / Axios
- localStorage
- IntersectionObserver

## 📊 Project Metrics

- **Total Components:** 12+ JavaScript modules
- **CSS Files:** 20+ modular stylesheets
- **Pages:** 2 (Home, Favorites)
- **Modals:** 2 (Exercise Details, Rating)
- **API Endpoints:** 3 (Filters, Exercises, Ratings)
- **Image Optimization:** 23% size reduction
- **Bundle Size:** Optimized with Vite tree-shaking

## 📞 Support

For questions or issues:

- Open an issue on [GitHub Issues](https://github.com/b01ma/your-energy-goit/issues)
- Contact the development team
- Check API documentation: [Your Energy API](https://your-energy.b.goit.study/api-docs/)

## 🙏 Acknowledgments

- **Design:** Figma design by GoIT team
- **API:** Backend provided by GoIT
- **Icons:** Custom SVG sprite system
- **Images:** Optimized WebP format

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Exercise browsing with dynamic filtering
- ✅ Interactive exercise modals with API integration
- ✅ Star rating system (display + user submission)
- ✅ Favorites management with localStorage
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Image optimization (WebP conversion)
- ✅ Smooth modal transitions
- ✅ Loading states and error handling
- ✅ Pagination for all views
- ✅ Search functionality
- ✅ Daily motivational quotes

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Exercise history tracking
- [ ] Workout plan creation
- [ ] Social sharing features
- [ ] PWA support with offline mode
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Advanced filtering (combine multiple filters)
- [ ] Exercise comparison feature

---

**Built with ❤️ by GoIT dev team**  
**Author:** GoIT dev team  
**License:** ISC  
**Version:** 1.0.0  
**Repository:** [github.com/b01ma/your-energy-goit](https://github.com/b01ma/your-energy-goit)

---

### Quick Links
- 🎨 [Figma Design](https://www.figma.com/design/E52uzlaSsHQS9yzLSQrtSX/YourEnergy--Copy-?node-id=126-18318&t=8Tr8GUtplZLQ2Dmk-0)
- 📚 [API Documentation](https://your-energy.b.goit.study/api-docs/)
- 🚀 [Live Demo](https://b01ma.github.io/your-energy-goit/)
- 💻 [Source Code](https://github.com/b01ma/your-energy-goit)

# Your Energy - GoIT Project

A modern web application built with Vite for providing energy-related content
and services.

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Team Workflow](#team-workflow)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## 🎯 About

Your Energy is a web application designed to help users track and manage their
energy-related activities. The project features a home page and favorites
section, built with modern web technologies.

**Design:**
[Figma Design File](https://www.figma.com/design/E52uzlaSsHQS9yzLSQrtSX/YourEnergy--Copy-?node-id=126-18318&t=8Tr8GUtplZLQ2Dmk-0)

**API Documentation:**
[Your Energy API Docs](https://your-energy.b.goit.study/api-docs/#/)

## 🛠 Tech Stack

- **Build Tool:** Vite 5.4.6
- **HTTP Client:** Axios 1.13.2
- **CSS:** Custom CSS with modular structure
- **UI Libraries:**
  - iziToast 1.4.0 - Toast notifications
  - iziModal 1.6.1 - Modal dialogs
- **Plugins:**
  - vite-plugin-full-reload
  - vite-plugin-html-inject
  - postcss-sort-media-queries

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

**Note:** The build is configured for GitHub Pages deployment with base path `/your-energy-goit/`.

### Preview Production Build

```bash
npm run preview
```

After running preview, visit: `http://localhost:4173/your-energy-goit/`

## 📁 Project Structure

```
your-energy-goit/
├── src/
│   ├── index.html              # Main entry page
│   ├── favorites.html          # Favorites page
│   ├── main.js                 # JavaScript entry point
│   ├── css/
│   │   ├── styles.css          # Main stylesheet
│   │   ├── components/         # Component-specific styles
│   │   │   ├── footer.css
│   │   │   └── header.css
│   │   ├── global/             # Global styles
│   │   │   ├── base.css
│   │   │   ├── container.css
│   │   │   ├── normalize.css
│   │   │   └── variables.css
│   │   └── pages/              # Page-specific styles
│   │       ├── favorites.css
│   │       └── home.css
│   ├── img/                    # Images and icons
│   │   ├── icons/
│   │   └── webp/
│   ├── partials/               # HTML partials
│   │   ├── components/
│   │   │   ├── footer.html
│   │   │   └── header.html
│   │   └── content/
│   │       ├── content-favorites.html
│   │       └── content-home.html
│   └── public/                 # Static assets
├── package.json
├── vite.config.js              # Vite configuration
└── README.md
```

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
- Use global styles sparingly
- Follow BEM or consistent naming convention

### JavaScript Guidelines

- Use ES6+ features
- Keep functions small and focused
- Use meaningful variable names
- Handle errors appropriately
- Comment complex logic

## 📞 Support

For questions or issues:

- Open an issue on GitHub
- Contact the development team
- Check existing documentation

---

**Author:** GoIT dev team  
**License:** ISC  
**Version:** 1.0.0

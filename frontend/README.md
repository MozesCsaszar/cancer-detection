# Frontend Setup Guide

Installation and development instructions for the React TypeScript Vite frontend.

> For general project information and technology overview, see [../README.md](../README.md)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 9.0.0 or higher) or **yarn**
- **Git** (for version control)

You can check your versions by running:

```bash
node --version
npm --version
```

## Installation

### 1. Navigate to Frontend Directory

```bash
cd BigData/frontend
```

### 2. Install Dependencies

Install all project dependencies using npm:

```bash
npm install
```

This will install all dependencies listed in `package.json` for the frontend application.

### 3. Environment Setup (Optional)

If you need to configure environment variables, create a `.env` file in the root of the frontend directory:

```bash
# Example .env file
VITE_API_URL=http://localhost:5000
```

Variables should be prefixed with `VITE_` to be accessible in the frontend.

## Available Scripts

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

This will start the server at `http://localhost:3000` by default. The application will automatically reload when you make changes.

### Production Build

Build the project for production:

```bash
npm run build
```

This command:

1. Compiles TypeScript (`tsc -b`)
2. Bundles the application with Vite

The built files will be in the `dist/` directory, ready for deployment.

### Preview Built Application

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality and style compliance:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint -- --fix
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable React components
│   ├── features/         # Feature modules
│   │   └── OurDataTable/ # Data table feature
│   ├── pages/            # Page components
│   │   └── Dashboard/    # Main dashboard page
│   ├── hooks/            # Custom React hooks
│   │   └── useCsvData.ts # Hook for CSV data handling
│   ├── api/              # API client and utilities
│   ├── assets/           # Images, fonts, and other static assets
│   ├── App.tsx           # Main App component
│   ├── App.css           # App styles
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/
│   └── OurDataClean.csv  # Sample CSV data
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # TypeScript configuration for app
├── tsconfig.node.json    # TypeScript configuration for build tools
├── vite.config.ts        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
└── README.md             # This file
```

## Development Guidelines

### TypeScript

- Use TypeScript for all new files (`.ts` or `.tsx`)
- Define types for props, state, and API responses
- Enable strict mode in `tsconfig.json` for better type safety

### Code Style

- Follow the ESLint configuration in `eslint.config.js`
- Use Tailwind CSS classes for styling when possible
- Keep components modular and reusable

### Component Organization

- Functional components with hooks
- Custom hooks in the `hooks/` directory
- Feature-specific components in `features/` directory
- Shared components in `components/` directory

## Building for Production

### Steps to Deploy

1. Build the project:

   ```bash
   npm run build
   ```

2. The production-ready files will be in the `dist/` directory

3. Deploy the contents of `dist/` to your web server or hosting platform

### Common Hosting Options

- **Vercel**: Automatic deployments from git
- **Netlify**: Simple drag-and-drop or git integration
- **AWS S3 + CloudFront**: Static hosting with CDN
- **Docker**: Containerized deployment

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- --port 3001
```

### ESLint Errors

Fix ESLint issues automatically:

```bash
npm run lint -- --fix
```

### Module Not Found Errors

Clear node_modules and reinstall:

```bash
rm -r node_modules package-lock.json
npm install
```

(On Windows PowerShell, use `Remove-Item -Recurse -Force node_modules` and `Remove-Item package-lock.json`)

### TypeScript Errors

Rebuild TypeScript:

```bash
npm run build
```

## Browser Support

The project supports:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Vite provides fast HMR during development
- Tree-shaking removes unused code in production builds
- Lazy loading supported through React's `Suspense` and dynamic imports
- Consider using React Query for efficient server state management

## Git Workflow

```bash
# Create a new branch for features
git checkout -b feature/feature-name

# Make your changes and commit
git add .
git commit -m "Description of changes"

# Push to remote
git push origin feature/feature-name

# Create a pull request on GitHub
```

## Support

For issues, questions, or contributions, please contact the development team or open an issue on the repository.

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [React Query Documentation](https://tanstack.com/query/latest)

# BigData Project

A comprehensive data analysis and visualization platform for cancer detection research, featuring a modern web-based frontend with data processing and real-time analytics capabilities.

## Project Overview

This is a Master's program project focused on big data processing and analysis with a focus on cancer detection. The project combines modern web technologies with data science to provide interactive data visualization and analysis tools.

## Project Structure

```
Project Folder/
├── frontend/               # React TypeScript Vite application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature modules
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API client utilities
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets (CSV data, etc.)
│   └── README.md           # Frontend setup instructions
└── README.md               # This file
```

## Getting Started

### Prerequisites

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 9.0.0 or higher) or **yarn**
- **Git** (for version control)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BigData
   ```

2. **Set up the frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   For detailed frontend setup instructions, see [frontend/README.md](./frontend/README.md)

3. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## Frontend Setup

For comprehensive frontend setup instructions, including:

- Detailed installation steps
- Available npm scripts
- Development guidelines
- Production build and deployment
- Troubleshooting

Please refer to [**frontend/README.md**](./frontend/README.md)

## Key Features

- **Data Visualization**: Interactive charts and graphs using Recharts
- **Data Tables**: Advanced table functionality with filtering, sorting, and pagination using React Table
- **Real-time Updates**: Socket.io integration for live data updates
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Type Safety**: Full TypeScript support for development confidence
- **CSV Support**: Import and parse CSV data directly in the browser

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues, questions, or contributions, please open an issue on the repository or contact the development team.

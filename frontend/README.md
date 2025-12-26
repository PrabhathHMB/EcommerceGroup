# Fresh Flowers - E-commerce Frontend

A beautiful React + Vite frontend for the Fresh Flowers e-commerce platform.

## Features

- 🌸 Browse beautiful flower arrangements
- 🛒 Shopping cart functionality
- 📦 Order management
- 👤 User authentication
- ⭐ Product reviews and ratings
- 📱 Responsive design

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- React Toastify

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Configuration

Make sure the backend is running on `http://localhost:5454` or update the API base URL in `src/services/api.js`.

## Environment Variables

You can create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:5454
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── context/       # React context providers
├── services/      # API service layer
└── App.jsx        # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint


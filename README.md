# Electric Link Pan Africa — Frontend

Modern, responsive marketing website for **Electric Link Pan Africa Limited**, connected to the Laravel product API.

## Design

- Flat, professional B2B/industrial aesthetic
- Deep blue accent (`#0D3B66`) for CTAs and highlights
- Montserrat typography, neutral palette, generous whitespace
- Mobile-first, accessible contrast, minimal hover-only animation

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7

## Getting Started

### 1. Start the Laravel API

```bash
cd Backend
php artisan serve
```

The API runs at `http://localhost:8000`.

### 2. Start the frontend

```bash
cd Frontend
npm install
npm run dev
```

The site runs at `http://localhost:5173` and proxies `/api` requests to the Laravel backend.

### Environment

Copy `.env.example` to `.env` and set:

```
VITE_API_URL=/api
```

For production, point `VITE_API_URL` to your deployed API base URL (e.g. `https://api.electriclink.co.ke/api`).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, categories, trust points, featured products, contact |
| `/products` | Full catalog with search and category filter |
| `/products/:id` | Product detail with WhatsApp inquiry |
| `/categories/:slug` | Products by main category |

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

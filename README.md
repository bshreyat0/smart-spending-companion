# Travel Planner (Express + SQLite)

Full-stack travel planning application built with Node.js, Express, SQLite (`better-sqlite3`), EJS, and Bootstrap.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open:
   [http://localhost:3000](http://localhost:3000)

## Features implemented

- User authentication (register/login/logout) with `bcrypt` + `express-session`
- Trip management (create, view, edit, delete)
- Itinerary builder with day + time slot (morning / afternoon / evening)
- Budget tracker with planned vs actual by category and running total
- Traveler management (name + optional contact)
- Packing checklist with packed/unpacked toggles
- Trip dashboard summary with:
  - dates and status
  - days remaining
  - traveler count
  - budget used vs total
  - upcoming activities
- Trip filters (destination, status, date range)
- Printable trip summary page
- PDF export via `pdfkit`
- Optional weather widget (set `OPENWEATHER_API_KEY`)
- Jenkins CI/CD testing

## Optional environment variables

- `PORT` (default `3000`)
- `SESSION_SECRET` (default `travel-planner-secret`)
- `OPENWEATHER_API_KEY` (enables live weather block on dashboard)

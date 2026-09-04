# ClubApp (SlashForge)

A campus event and club management portal built for SlashForge '26. Students can discover events, RSVP, and check in via QR code; organizers can manage events and track attendance in real time.

## Features

- Browse events by category on a responsive homepage
- View individual event details
- RSVP to events (no login required)
- QR code generated on registration
- Organizer QR scanner for event check-in
- Organizer dashboard showing registered vs. attended counts per event

## Tech Stack

- React + Vite
- Supabase (database + row-level security)
- React Router
- `qrcode.react` for QR generation
- `html5-qrcode` for QR scanning
- Regular CSS (no framework)

## Getting Started

1. Clone the repo:
```bash
   git clone https://github.com/AdityaAjay07/SlashForge.git
   cd SlashForge
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the project root with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run the dev server:
```bash
   npm run dev
```

## Known Limitations

- No authentication yet — the `/organizer` route is not access-restricted. This was a deliberate scope decision for the hackathon timeline.
- Registration data (`name`, `email`) is currently readable by anyone with the anon key, due to RLS policy requirements for returning newly-created rows. Would be tightened with proper auth.

## Project Structure

src/
├── components/ # Reusable UI pieces (Navbar, Hero, EventCard, CategoryCard, Footer, RSVPForm)
├── pages/ # Route-level pages (Home, Events, EventDetail, Scanner, Dashboard, Organizer)
├── supabaseClient.js
└── App.jsx # Routing and top-level data fetching


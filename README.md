# GATE Digital Student Hub

A modern educational portal built for GATE Degree College, Tirupati, designed as a student-focused digital hub rather than an official college website unless specifically authorized.

## Features

- Premium responsive homepage and academic landing page
- Student Hub routes for notices, exams, materials, jobs, scholarships and more
- Event gallery and department overview
- Admin login, dashboard and contact configuration screens
- Floating phone and WhatsApp controls with safe configuration logic
- Supabase-ready data model and storage structure
- Demo content clearly labelled to avoid presenting unofficial information as official college data

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion
- Supabase

## Project Structure

- `App.tsx` — main app, routes and page content
- `FloatingContactButtons.tsx` — reusable floating contact component
- `index.css` — Tailwind entry and global styles
- `vite.config.ts` — Vite configuration
- `README.md` — project documentation

## Environment Variables

Create a `.env` file with the following values:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Setup

1. Create a Supabase project.
2. Enable authentication with email/password.
3. Create the tables listed in the project brief: profiles, notices, exams, materials, jobs, scholarships, departments, feedback, events, gallery, important_links, social_links, contact_settings.
4. Enable Row Level Security for all tables.
5. Create storage buckets:
   - `college-gallery`
   - `study-materials`
   - `notice-attachments`
   - `event-images`

## Authentication

- Use Supabase Auth for admin and staff login.
- Define roles such as `admin`, `staff`, and `student` in the profile table.
- Protect admin routes by checking user role before access is granted.

## RLS

Apply row-level policies that allow:

- Public read access for published content
- Students to submit feedback without viewing other feedback
- Admin and staff to create, update, delete and publish records

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The app can be deployed to Vercel or Netlify.

1. Add the environment variables to the hosting platform.
2. Point the build command to `npm run build`.
3. Publish the output folder from Vite.

## Admin Setup

- Open `/admin/login`
- Sign in with an authorized Supabase user
- Use the admin dashboard to manage notices, jobs, scholarships and settings

## Contact Settings

The contact settings page allows you to configure:

- Phone number
- WhatsApp-enabled number
- Landline
- Email
- Address
- Google Maps URL
- WhatsApp enabled/disabled
- Phone button enabled/disabled

The floating contact buttons must use those values and never assume that every number supports WhatsApp.

## WhatsApp Configuration

- Do not enable WhatsApp automatically for unverified numbers.
- Use a verified number when enabling `whatsapp_enabled`.
- Normalize numbers to international format for wa.me links.

## Social Media Configuration

- Use only verified social-media links.
- Store URLs in Supabase for admin updates.
- Open links in a new tab.

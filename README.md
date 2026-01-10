# GigLink 🚀

A premium, design-driven project link management system for freelancers and creators. GigLink allows you to curate and share your best work through beautiful, high-performance dashboards.

## ✨ Features

- **Premium Design Engineering**: Built with a focus on minimalist aesthetics (Vercel/Linear style) and fluid micro-interactions.
- **Smart Resource Management**:
  - **Multi-step Animated Form**: A refined, context-aware "Add Link" widget with keyboard navigation support (Arrow keys/Enter).
  - **Smart Validation**: Real-time URL and title validation with smooth, non-intrusive error animations.
  - **Categorized Resources**: Automated icon mapping and styling for Figma, GitHub, Video, and more.
- **Micro-interactions**:
  - **Two-Tap Deletion**: A contextual "Sure?" confirmation flow to prevent accidental removals without disruptive dialogs.
  - **Symmetrical Layouts**: Perfectly aligned column baselines for a stable, professional dashboard feel.
- **Performance First**:
  - Built on **Next.js 15** with App Router.
  - **Server Actions** for secure, lightning-fast database operations.
  - **Supabase** backend for authentication and real-time data.
  - **Framer Motion** for hardware-accelerated, origin-aware animations.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Backend**: Supabase (Auth & Postgres)
- **Icons**: Lucide React
- **Form Handling**: React Use Measure (for smooth layout transitions)

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shrey258/giglink.git
   cd giglink
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file with your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📐 Design Philosophy

GigLink follows the **Rule of Clarity and Simplicity**. Every interaction is designed to be hardware-accelerated, accessible, and origin-aware. We prioritize `ease-out` transitions and spring physics to make the UI feel alive and responsive.

---

Built with ❤️ by [Shrey](https://github.com/shrey258)

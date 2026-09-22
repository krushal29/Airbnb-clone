# PlayPowerLabs Airbnb Clone

A production-grade, pixel-accurate frontend implementation of the Airbnb vacation-rental listing page for **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"**, engineered as part of the PlayPowerLabs Frontend Engineering technical evaluation.

---

## Overview

This project implements a desktop-first, highly responsive web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. It strictly adheres to Airbnb’s visual design system, interaction patterns, accessibility standards (WAI-ARIA & WCAG 2.1 AA), and robust engineering practices.

The implementation was constructed using an AI-augmented workflow where AI acted as an engineering accelerator while architecture, component boundaries, accessibility enforcement, and verification were independently designed and strictly reviewed.

---

## Key Features

- **Pixel-Accurate Listing Page**: Matches container widths (1280px), vertical rhythms, typography scales (Inter), and custom design tokens.
- **Hero Photo Bento Grid**: 5-photo responsive bento grid with zoom hover interactions and floating "Show all photos" trigger.
- **Full-Screen Photo Tour Overlay**: Dedicated gallery overlay featuring room-by-room photo grouping, category filter pills, smooth Framer Motion transitions, and background scroll locking.
- **Production-Grade Lightbox**: Full-screen single-photo viewer with direction-aware slide transitions, image counter (`i / 15`), caption badges, and boundary disable states.
- **Complete Keyboard Accessibility**:
  - `Escape`: Closes active modals, photo tour, or lightbox.
  - `ArrowLeft` / `ArrowRight`: Navigates images in Lightbox.
  - Focus trapping and focus restoration to trigger elements.
  - Custom `:focus-visible` indicators and `@media (prefers-reduced-motion)` support.
- **Interactive Sticky Reservation Card**:
  - Live price recalculation based on calendar check-in/checkout dates.
  - Interactive 10% discount banner claim.
  - Floating guest selection dropdown with adult, child, infant, and pet counters.
  - Itemized price breakdown with taxes and fees.
- **Sticky Sub-Navigation Bar**: Smoothly slides into view once the hero leaves the viewport, providing anchor jumps and instant reserve action.
- **Dual-Month Interactive Calendar**: Date range selection with minimum-stay enforcement, range highlight fills, and clear dates action.
- **Stylized Location Map**: Interactive visual cartography of Candolim Beach with pulse marker and zoom controls.
- **Grand Rating Hero & Breakdown**: 4.95 rating banner with 6 categorical progress bars and searchable reviews dialog.
- **Nearby Stays & Exploration**: Curated holiday stays in Candolim & North Goa with interactive wishlist heart toggles and explore breadcrumbs.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture & state management |
| **Language** | [TypeScript 5.x](https://www.typescriptlang.org/) | Strict type safety with `verbatimModuleSyntax` |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Instant HMR and optimized production bundling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS `@theme` tokens & utility classes |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth layout transitions & overlay animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Semantic SVG icons (no emoji icons) |
| **Linter** | [Oxlint](https://oxc.rs/) | High-performance linting (0 errors, 0 warnings) |

---

## Running Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## Production Build & Verification

To compile the production bundle and execute strict type checking:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

To run the linter:
```bash
npm run lint
```

---

## Frontend Architecture

The frontend follows a modular, feature-oriented architecture with decoupled UI primitives:

```
src/
├── components/
│   ├── ui/                    # Reusable Design System Primitives
│   │   ├── Button.tsx         # Polymorphic Button (primary, secondary, outline, ghost, gradient)
│   │   ├── IconButton.tsx     # Accessible circular button with focus rings
│   │   ├── Modal.tsx          # Framer Motion accessible dialog with focus trap
│   │   ├── Section.tsx        # Section container with standardized border dividers
│   │   └── index.ts           # Barrel export
│   ├── Header/                # Global Header and StickySubNav
│   ├── ListingHero/           # Title row, Share/Save, and Bento PhotoGrid
│   ├── ListingContent/        # Summary, Guest Favourite badge, Host, Description, Sleeping, Amenities
│   ├── Calendar/              # DualMonthCalendar with interactive date selection
│   ├── Reservation/           # Sticky ReservationCard, DiscountBanner, GuestPickerDropdown
│   ├── Reviews/               # Grand ratings breakdown, ReviewCard list, and ReviewsSection
│   ├── Location/              # Stylized Candolim Beach map with zoom controls
│   ├── Host/                  # Meet your Host profile card & Superhost stats
│   ├── ThingsToKnow/          # House rules, safety, and cancellation policies with modals
│   ├── NearbyListings/        # Curated nearby Candolim stays and category pills
│   ├── PhotoTour/             # Full-screen PhotoTourModal with category filters & grouping
│   ├── Lightbox/              # High-fidelity LightboxViewer with keyboard controls
│   ├── Modals/                # AmenitiesModal, DescriptionModal, ReviewsModal, ShareModal
│   └── Footer/                # Global footer with breadcrumbs, links, and currency
├── data/
│   └── listing.ts             # Strongly-typed mock listing data and high-res photos
├── hooks/
│   ├── useBodyScrollLock.ts   # Prevents background scrolling when overlays are open
│   ├── useKeyboard.ts         # Centralized keyboard shortcuts
│   └── useScrollPosition.ts   # Tracks viewport position for StickySubNav reveal
├── types/
│   └── listing.ts             # TypeScript interfaces for all domain entities
├── lib/
│   └── utils.ts               # Price formatters, class merging utilities
├── App.tsx                    # Root application assembler
├── index.css                  # Tailwind CSS v4 @theme tokens, global CSS, a11y rules
└── main.tsx                   # React root entry point
```

---

## Enterprise Cloud Platform Architecture

In addition to the frontend implementation, a comprehensive production-scale architecture for an internet-scale vacation rental marketplace (inspired by Airbnb) has been designed and exported:

- High-Resolution Architecture Diagram: [`architecture/architecture-diagram.png`](architecture/architecture-diagram.png)
- Printable Vector PDF: [`architecture/architecture-diagram.pdf`](architecture/architecture-diagram.pdf)
- Scalable Vector SVG: [`architecture/architecture-diagram.svg`](architecture/architecture-diagram.svg)

### Architectural Highlights
- **Edge Tier & Client Touchpoints**: Global Anycast Edge Network, Cloudflare WAF, Serverless Edge Compute, HTTP/3 (QUIC) delivery.
- **Presentation & Assets**: Containerized Next.js / SSR application cluster with automated asset hashing, immutable S3 origin with pre-rendered pages.
- **Edge Ingress & Routing**: Envoy Ingress Gateway, Multi-AZ High-Throughput Load Balancers, Experience API (BFF aggregation layer).
- **Domain Microservices Mesh**: Decoupled Identity & Auth, Property Catalog, Reservation Engine, User & Profile, Reviews & Feedback, and Financial & Checkout services.
- **Data Persistence & Acceleration**: Multi-AZ AWS Aurora PostgreSQL (Primary + 3x Read Replicas), Redis Enterprise in-memory cluster, Amazon S3 media store, OpenSearch discovery fleet.
- **Async Event Fabric**: Distributed Apache Kafka event mesh partitioned by Listing ID & User ID for strict sequential ordering.
- **Background Workers**: Async Notification Consumer fleet (SendGrid/Twilio), Media Transcoding workers (WebP/AVIF compression), and Debezium Change Data Capture (CDC) search index synchronization.

---

## AI-Assisted Development Workflow

AI was leveraged as an engineering accelerator throughout the project lifecycle while maintaining rigorous independent engineering oversight and verification:

1. **Reference Analysis**: Systematic reverse-engineering of page anatomy, token systems, and interaction models.
2. **Component Generation**: Rapid scaffold generation followed by manual refactoring for strict TypeScript typing and modular component boundaries.
3. **Visual QA**: Adversarial visual comparison against reference implementations to eliminate P0/P1 layout drift.
4. **Accessibility Audits**: Dedicated focus management, WAI-ARIA validation, and keyboard trapping review.
5. **Architecture Modeling**: Programmatic generation of multi-tier cloud infrastructure diagrams.

For full agent persona definitions and the chronological prompt log, refer to:
- [`ai-workflow/README.md`](ai-workflow/README.md)
- [`ai-workflow/prompts.md`](ai-workflow/prompts.md)
- Persona configurations: `ui-agent.md`, `interaction-agent.md`, `accessibility-agent.md`, `visual-qa-agent.md`, `architecture-agent.md`, `code-review-agent.md`.

---

## Originality Statement

This codebase was independently designed, written, and structured from scratch. It does not scrape, clone, or copy the source code or proprietary bundle of the reference website. All styles, UI primitives, state management hooks, and component layouts are original implementations inspired by public Airbnb visual standards.

---

## Accessibility Compliance (WCAG 2.1 AA)

- **Keyboard Navigation**: The entire page, including modals, photo tour, lightbox, and dropdowns, is operable purely via keyboard.
- **Modal Focus Trapping**: Focus is constrained within active dialogs; pressing `Tab` or `Shift+Tab` cycles within the modal.
- **Focus Restoration**: Closing an overlay automatically restores keyboard focus to the triggering element.
- **Escape Key Handling**: Uniform `Escape` key listeners across all modals, dropdowns, and viewers.
- **Accessible Labeling**: All icon buttons include explicit `aria-label`s; dialogs specify `role="dialog"` and `aria-modal="true"`.
- **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)` by disabling transition durations for users with vestibular sensitivities.
- **Contrast & Visibility**: Distinct `focus-visible:ring-2` outline indicators prevent invisible focus states.

---

## Known Limitations

- **Simulated Checkout**: Clicking "Reserve" demonstrates an interactive submission confirmation and does not process live credit card transactions.
- **Mocked Backend**: Dynamic date ranges, reviews, and amenities operate on realistic local mock data rather than live network endpoints.
- **Static Map**: The location map uses a custom high-precision SVG vector map of Candolim Beach rather than a Google Maps / Mapbox JavaScript API key to avoid external billing credentials.

---

## Submission Contents

The repository / ZIP bundle contains:
- Complete source code (`src/`, `public/`, `index.html`)
- Configuration files (`package.json`, `tsconfig.json`, `vite.config.ts`, `.oxlintrc.json`)
- System architecture diagram in PNG, PDF, and SVG (`architecture/`)
- Architecture diagram generator script (`scripts/generate_architecture_diagram.py`)
- AI workflow documentation and prompt log (`ai-workflow/`)
- Project README (`README.md`) and Walkthrough (`walkthrough.md`)

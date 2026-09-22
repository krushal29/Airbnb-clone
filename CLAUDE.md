# Engineering Guidelines & Technical Standards Handbook — Candolim Luxury Stay Marketplace

This operational handbook provides the core architectural rules, coding standards, development commands, and quality thresholds for AI agents and software engineers contributing to the **PlayPowerLabs Airbnb Vacation Rental Listing Platform**.

---

## 1. System Identity & Evaluation Context

- **Application Designation**: PlayPowerLabs Airbnb Listing Experience
- **Property Invariant**: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10" (Candolim, North Goa, India)
- **Technical Context**: PlayPowerLabs Frontend Engineering Technical Evaluation
- **Delivery Scope**: Desktop-first, pixel-accurate rental listing interface equipped with customizable design tokens, strict keyboard accessibility (WCAG 2.1 Level AA conformance), spring-animated Framer Motion overlays, and an enterprise multi-AZ cloud architecture model.

---

## 2. Technology Architecture & Runtime Stack

| Layer / Capability | Technology Choice | Architectural Purpose |
| :--- | :--- | :--- |
| **UI Library** | React 19 (`react`, `react-dom`) | Declarative component hierarchy and concurrent rendering |
| **Language & Typing** | TypeScript 5.x | Strict type safety enforced via `verbatimModuleSyntax: true` |
| **Tooling & Bundler** | Vite 8 (`@vitejs/plugin-react`) | Instant module replacement and optimized production rollup |
| **Design Engine** | Tailwind CSS v4 (`@tailwindcss/vite`) | CSS-first `@theme` token definitions within `src/index.css` |
| **Physics & Overlays** | Framer Motion (`framer-motion`) | Hardware-accelerated modal transitions and spring gestures |
| **Iconography** | Lucide React (`lucide-react`) | Standardized accessible SVG icons |
| **Class Utilities** | `clsx` + `tailwind-merge` | Deterministic dynamic class resolution |
| **Static Linter** | Oxlint (`oxlint`) | Sub-millisecond Rust-based linting pipeline |

---

## 3. Developer CLI & Operational Tasks

Execute all CLI directives directly from the project root:

| Operational Task | CLI Command | Target Expected Behavior |
| :--- | :--- | :--- |
| **Dependency Resolution** | `npm install` | Deterministic dependency tree install from `package-lock.json` |
| **Interactive Dev Server** | `npm run dev` | Launches local Vite development server at `http://localhost:5173/` |
| **Typecheck & Production Build** | `npm run build` | Validates TypeScript bindings (`tsc -b`) followed by Vite chunking |
| **Static Code Inspection** | `npm run lint` | Runs `oxlint` static checks (mandates 0 errors and 0 warnings) |
| **Production Preview** | `npm run preview` | Spins up local HTTP server hosting the compiled `dist/` bundle |

---

## 4. Architectural Rules & Code Invariants

### TypeScript & Typing Rigor
- **Isolated Type Imports**: Enforce `import type { ... }` across all type-only dependencies to adhere to `verbatimModuleSyntax: true`.
- **Zero Loose Typing Policy**: Strictly prohibit `any` or ambiguous assertions. All domain state must derive from explicit interfaces in `src/types/listing.ts` or generic typings.
- **Component Prop Contracts**: Every component must declare a strongly typed interface for its props:
  ```tsx
  interface ReservationCardProps {
    readonly pricePerNight: number;
    readonly rating: number;
    readonly reviewCount: number;
    readonly onReserve: () => void;
  }
  ```

### Modular Domain Directory Taxonomy
Organize all visual components by bounded functional domains under `src/components/`:
- `src/components/ui/` — Base design tokens and UI primitives (`Button`, `IconButton`, `Modal`, `Section`)
- `src/components/Header/` — Primary navigation bar and scroll-triggered sticky sub-nav
- `src/components/ListingHero/` — Listing title header, action toggles (Share/Save), and 5-item bento grid
- `src/components/ListingContent/` — Key property details, host accolades, sleeping layouts, and amenities
- `src/components/Calendar/` — Interactive dual-month stay date picker
- `src/components/Reservation/` — Floating booking card, real-time rate calculator, and guest counter
- `src/components/Reviews/` — Multi-metric rating distribution bars and user feedback cards
- `src/components/PhotoTour/` — Categorized full-screen gallery modal with room classification
- `src/components/Lightbox/` — Single-photo theater modal with directional transitions
- `src/components/Location/` — Vector cartography view highlighting Candolim Beach
- `src/components/ThingsToKnow/` — House guidelines, health/safety standards, and cancellation rules
- `src/components/NearbyListings/` — Curated holiday stays in Candolim & North Goa

### Design Token Architecture
- **Theme Variables**: Maintain all global tokens in `src/index.css` via Tailwind CSS v4 `@theme`:
  - Brand Primary: `#FF385C` (Airbnb Coral Accent)
  - Charcoal Primary: `#222222`
  - Neutral Secondary: `#717171`
  - Subtle Borders: `#DDDDDD` / `#EBEBEB`
  - Canvas Neutral: `#F7F7F7`
- **Container Bounds**: Main page content is bounded by `max-w-[1280px]` with adaptive horizontal padding `px-6 md:px-10 xl:px-20`.
- **Keyboard Focus Rings**: Interactive elements must feature high-contrast focus rings: `focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none`.

---

## 5. Universal Accessibility Standards (WCAG 2.1 AA)

1. **Semantic Landmark Integrity**:
   - Limit the page to exactly one `<h1>` heading.
   - Employ explicit `<button>` elements for click actions; avoid clickable `<div>` wrappers.
2. **Keyboard Navigation Loops**:
   - `Escape`: Uniformly dismisses active lightboxes, photo tours, dropdowns, and popup dialogs.
   - `ArrowLeft` / `ArrowRight`: Steps backward and forward through images within the Lightbox viewer.
   - `Tab` / `Shift+Tab`: Constrained within open modals via programmatic focus trapping (`useBodyScrollLock`).
3. **Deterministic Focus Restoration**:
   - When closing any overlay or modal dialog, focus must automatically revert to the originating element.
4. **Accessible Labeling & ARIA Annotations**:
   - All icon-only triggers require meaningful `aria-label` strings.
   - All images require descriptive `alt` tags.
   - Modals must be tagged with `role="dialog"` and `aria-modal="true"`.
5. **Reduced-Motion Considerations**:
   - Respect user vestibular preferences by honoring `@media (prefers-reduced-motion: reduce)`.

---

## 6. Enterprise Cloud Topology & Release Deliverables

- **Platform Architecture Diagram**: Maintained at project root as `architecture-diagram.pdf` and `architecture-diagram.png`, with vector originals in `architecture/`.
- **Cloud Infrastructure Highlights**: Multi-AZ AWS EKS cluster deployment fronted by Cloudflare CDN and WAF, Envoy Ingress Proxy, BFF aggregation layer, independent microservices, Amazon Aurora Multi-AZ PostgreSQL (Primary + 3 Read Replicas), Redis Enterprise distributed cache, Amazon S3 object storage, OpenSearch cluster, and Apache Kafka event fabric.
- **Multi-Agent Orchestration**: Fully specified in `AGENTS.md` and `.claude/agents/`.

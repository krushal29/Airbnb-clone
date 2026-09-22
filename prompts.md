# AI Prompting History & Engineering Workflow Log

**Candidate Technical Submission**: PlayPowerLabs Airbnb Vacation Rental Listing Platform  
**Target Context**: Luxury 1BHK Rental with Jacuzzi in Candolim, North Goa  
**Architecture**: React 19, TypeScript (Strict), Tailwind CSS v4, Vite, Framer Motion  

---

## Executive Summary: My Prompting Philosophy & Engineering Style

When utilizing AI for frontend and systems engineering, my approach prioritizes **deterministic decomposition over single-prompt generation**. Rather than asking an LLM to "build an entire Airbnb clone" in one massive, error-prone request, I decompose the engineering lifecycle into sequential, contract-bound stages.

### Core Principles of My Prompting Style:
1. **Domain & Persona Specialization**: Constrain the AI's cognitive scope to specialized roles (e.g., *Design Systems Specialist*, *Interactive Motion Engineer*, *Adversarial QA Auditor*, *Accessibility Advocate*).
2. **Contract-First Specifications**: Every prompt defines explicit inputs, strict architectural constraints (e.g., 1280px container boundaries, zero loose `any` types, `verbatimModuleSyntax`), and deterministic acceptance criteria.
3. **Adversarial Feedback Loops**: Separate the generation phase from the evaluation phase. After generating components, I use distinct prompts acting as critical adversaries to find visual regressions, focus-trapping bugs, and DOM layout shifts.
4. **Verification Gates**: Each stage requires running static analysis (`oxlint`) and TypeScript compilation (`tsc -b && vite build`) before proceeding to downstream components.

---

## Chronological Prompt Log

---

### Session 01: Reverse-Engineering, Domain Taxonomy & Listing Schema

#### Purpose
Extract the target listing’s visual tokens, typography scale, responsive breakpoints, and establish a strongly-typed data schema before writing any UI components.

#### System Role / Persona
> Senior Frontend Architect & Systems Analyst

#### User Prompt
```markdown
You are a Senior Frontend Architect. We are building a pixel-accurate, production-tier clone of the Airbnb Vacation Rental Listing Page for "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10".

Perform an exhaustive architectural and structural deconstruction of the target listing:
1. Layout Geometry:
   - Determine the maximum container boundaries (1280px standard container) and responsive padding breakpoints (px-6 md:px-10 xl:px-20).
   - Analyze the 2-column content layout (8-column listing details vs 4-column sticky reservation card sidebar).
2. Visual Token Hierarchy:
   - Identify primary brand colors (#FF385C), charcoal text (#222222), muted captions (#717171), subtle divider borders (#DDDDDD / #EBEBEB), and elevation box-shadows.
   - Map font families (Inter) and typographic scale from 32px display titles down to 12px micro-labels.
3. Domain Modeling:
   - Create comprehensive TypeScript interfaces in `src/types/listing.ts` representing:
     - `ListingData` (title, location, rating, reviewCount, pricing, host metadata, amenities, bed configurations)
     - `ListingPhoto` (id, url, caption, category, orientation)
     - `AmenityItem` (category, title, description, iconName, isAvailable)
     - `ReviewItem` (author, date, rating, comment, avatarUrl)
4. Data Seeding:
   - Construct a realistic dataset in `src/data/listing.ts` containing 15 high-res photos mapped to room categories ('Living Room', 'Patio & Jacuzzi', 'Kitchen & Dining', 'Bedroom & Bath', 'Exterior & Pool').

Constraints:
- Strict TypeScript with verbatimModuleSyntax enabled.
- Zero loose `any` typings; every object must be strongly typed.
```

#### Engineering Output
- Established `src/types/listing.ts` with complete type definitions.
- Created `src/data/listing.ts` populated with realistic property data, ratings, and 15 categorized images.

---

### Session 02: Design Tokens & Polymorphic UI Primitives

#### Purpose
Establish the Tailwind CSS v4 `@theme` configuration in `src/index.css` and build accessible, polymorphic base primitives.

#### System Role / Persona
> Visual Systems & Design Token Engineer

#### User Prompt
```markdown
You are a Design Systems Specialist. We need to construct the foundation and reusable UI primitives for the Airbnb listing platform.

Tasks:
1. Tailwind CSS v4 Theme Architecture:
   - Configure `@theme` directives directly in `src/index.css`.
   - Define custom color variables (brand primary #FF385C, text dark, borders, neutral backgrounds).
   - Configure container constraints and standardized focus rings:
     `focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none`.
2. Polymorphic Button Primitive (`src/components/ui/Button.tsx`):
   - Support variants: 'primary' (Airbnb coral gradient/fill), 'secondary', 'outline', 'ghost'.
   - Sizes: 'sm', 'md', 'lg'.
   - Ensure proper focus ring visibility and disabled state ergonomics.
3. Circular IconButton Primitive (`src/components/ui/IconButton.tsx`):
   - Accessible circular action button with compulsory `aria-label` prop.
   - Hover background transitions and subtle active press scaling.
4. Accessible Modal Base Primitive (`src/components/ui/Modal.tsx`):
   - Framer Motion backdrop fade and spring-animated dialog pop.
   - Integrated `Escape` dismiss and cyclical focus trapping.
5. Section Container Primitive (`src/components/ui/Section.tsx`):
   - Consistent vertical rhythms with standardized top/bottom border dividers (`border-t border-neutral-200`).

Verification:
- Verify that `npm run build` succeeds with zero TypeScript errors.
- Do not use emoji icons; use Lucide React icons exclusively.
```

#### Engineering Output
- Configured custom tokens in `src/index.css`.
- Implemented `Button.tsx`, `IconButton.tsx`, `Modal.tsx`, `Section.tsx`, and barrel exports in `src/components/ui/index.ts`.

---

### Session 03: Page Assembly & Interactive Core Sections

#### Purpose
Assemble the complete listing page from top to bottom, implementing all domain components and maintaining desktop-first responsive constraints.

#### System Role / Persona
> Senior UI Engineer & Frontend Assembler

#### User Prompt
```markdown
You are a Senior UI Engineer. Implement the full listing page structure by composing atomic domain components top-to-bottom.

Page Sections to Construct:
1. Global Header (`src/components/Header/Header.tsx`):
   - Left: Airbnb logo.
   - Center: Search pill ("Anywhere · Anytime · Add guests" with coral search badge).
   - Right: "Become a host", global language selector, and user profile menu pill.
2. Sticky Sub-Navigation Bar (`src/components/Header/StickySubNav.tsx`):
   - Scroll-spy reveal when the hero leaves the viewport.
   - Anchor links ("Photos", "Amenities", "Reviews", "Location") with dynamic pricing CTA.
3. Listing Hero (`src/components/ListingHero/`):
   - Title row with Share and Save (wishlist toggle) buttons.
   - 5-photo Bento Grid with zoom-on-hover physics and floating "Show all 15 photos" button.
4. Core Content Sections (`src/components/ListingContent/`):
   - Listing summary, Guest Favourite gold badge, Meet the Host card, sleeping arrangements, and amenities matrix.
5. Interactive Dual-Month Calendar (`src/components/Calendar/DualMonthCalendar.tsx`):
   - Interactive date range selection with minimum stay rules, date range highlight fills, and clear dates trigger.
6. Sticky Reservation Card (`src/components/Reservation/`):
   - Real-time rate recalculation based on selected calendar dates.
   - Interactive 10% discount claim button.
   - Floating guest picker dropdown (adults, children, infants, pets).
   - Detailed price breakdown with cleaning fee, service fee, and taxes.
7. Reviews, Location Map, and Nearby Stays:
   - 4.95 grand rating display with 6 progress bars.
   - Visual vector map of Candolim Beach with pulse pin marker.
   - Nearby curated stays with wishlist toggles.

Assemble all components inside `src/App.tsx` and ensure 1280px maximum container width.
```

#### Engineering Output
- Implemented and assembled all 14 page sections in `src/App.tsx`.
- Integrated date selection state synchronization between the calendar and the floating booking card.

---

### Session 04: Overlay Choreography & Full-Screen Photo Tour

#### Purpose
Create the full-screen categorized photo tour modal with smooth transitions, category filtering pills, and scroll lock.

#### System Role / Persona
> Interaction & Motion Engineer

#### User Prompt
```markdown
You are an Interactive Motion Engineer. Build the dedicated full-screen Photo Tour overlay (`src/components/PhotoTour/PhotoTourModal.tsx`).

Requirements:
1. Triggering Points:
   - Clicking any photo in the 5-photo hero bento grid.
   - Clicking the floating "Show all 15 photos" button.
2. Layout & Categorization:
   - Full-screen modal with sticky category navigation bar ('Living Room', 'Patio & Jacuzzi', 'Kitchen & Dining', 'Bedroom & Bath', 'Exterior & Pool').
   - Smooth anchor scrolling to room sections.
   - Itemized room amenities header for each section.
3. Interaction Mechanics:
   - Clicking any photo opens the single-photo Lightbox viewer, passing the exact photo index.
   - Background scroll locking: body must not scroll while the modal is active.
   - `Escape` key and top-left Back button dismiss the tour.
4. Motion Physics:
   - Hardware-accelerated entrance and exit animations via Framer Motion.
```

#### Engineering Output
- Created `src/components/PhotoTour/PhotoTourModal.tsx` with category navigation and scroll locking.

---

### Session 05: Theater-Mode Lightbox & Directional Spring Physics

#### Purpose
Implement a high-fidelity, single-photo theater viewer with directional sliding animations, boundary controls, and keyboard navigation.

#### System Role / Persona
> Motion Physics & State Machine Engineer

#### User Prompt
```markdown
Implement the single-photo Lightbox viewer (`src/components/Lightbox/LightboxViewer.tsx`).

Specifications:
1. Presentation:
   - Theater-style deep black backdrop (#000000 / rgba(0,0,0,0.95)).
   - Centered high-resolution image with crisp aspect-ratio preservation.
   - Image counter ("i / 15") and room category caption badge.
   - Left and Right navigation chevron buttons with disabled boundary states.
2. Direction-Aware Slide Animations:
   - Use Framer Motion AnimatePresence with directional vectors:
     - Moving forward (`currentIndex + 1`): image slides in from the right.
     - Moving backward (`currentIndex - 1`): image slides in from the left.
3. Keyboard Trapping & Shortcuts:
   - `ArrowLeft`: Navigate to previous photo.
   - `ArrowRight`: Navigate to next photo.
   - `Escape`: Close lightbox.
4. Focus Trapping:
   - Focus must be trapped inside the lightbox.
   - When closed, focus must return to the thumbnail element that initiated the viewer.
```

#### Engineering Output
- Built `src/components/Lightbox/LightboxViewer.tsx` with directional slide variants and keyboard controls.

---

### Session 06: Adversarial Visual QA & Defect Elimination

#### Purpose
Perform visual diffing against reference designs, systematically triaging and eliminating visual discrepancies.

#### System Role / Persona
> Adversarial Visual QA Auditor

#### User Prompt
```markdown
Act as a strict Adversarial Visual QA Auditor. Your role is NOT to implement new features, but to rigorously compare our frontend implementation against reference visual standards.

Audit Criteria & Discrepancy Classification:
- Priority 0 (Blocker): Container width misalignment, broken columns, uncontained overflows.
- Priority 1 (High): Vertical rhythm discrepancies, font size/weight deviations, missing section dividers.
- Priority 2 (Medium): Hover transition mismatches, icon sizing differences, button padding inconsistencies.
- Priority 3 (Low): Subtle border color nuances, micro-spacing.

Inspect each area:
1. Header & Navigation: Height (80px), search pill shadow, logo alignment.
2. Bento Grid: 2-column layout (hero image 50% width, 2x2 grid 50% width), 8px gutters, rounded outer corners.
3. Content Column: 1280px max container, 8-col content to 4-col sticky card ratio.
4. Booking Card: Elevation shadow, border radius, discount banner positioning, pricing arithmetic.
5. Divider Lines: Standardized border-t border-neutral-200 across all section boundaries.

Generate an audit defect report and provide precise code remediations for all identified P0–P2 issues.
```

#### Engineering Output
- Standardized container constraints (`max-w-[1280px]`).
- Adjusted column layout ratios and gutter widths.
- Aligned typography weights and border dividers.
- Clean bill of health with zero unresolved P0/P1 defects.

---

### Session 07: Universal Accessibility (WCAG 2.1 AA) Remediation

#### Purpose
Conduct a comprehensive accessibility audit enforcing keyboard operability, screen-reader semantics, and layout-shift-free scroll locks.

#### System Role / Persona
> Universal Accessibility (a11y) Specialist

#### User Prompt
```markdown
You are an Accessibility Compliance Auditor. Audit and remediate the application to ensure full WCAG 2.1 Level AA conformance.

Mandatory Checks & Fixes:
1. Eliminate Desktop Scrollbar Layout Shift:
   - Setting `overflow: hidden` on `document.body` causes permanent browser scrollbars to disappear, jumping the entire 1280px page 15-17px to the right.
   - Build a custom hook `src/hooks/useBodyScrollLock.ts` that calculates `window.innerWidth - clientWidth` and applies compensation padding to the right edge during active modal states.
2. Bi-Directional Focus Restoration:
   - Ensure that opening any modal saves `document.activeElement`.
   - When the modal is dismissed via button or `Escape`, focus must programmatically restore to the triggering element.
3. Keyboard Focus Trapping:
   - Implement cyclical `Tab` / `Shift+Tab` focus traps inside `Modal.tsx` and `LightboxViewer.tsx`.
4. Semantic Markup & ARIA:
   - Exactly one `<h1>` heading per page.
   - Ensure all icon buttons declare explicit `aria-label` attributes.
   - Add descriptive `alt` tags to all 15 property photos.
   - Honor user motion preferences via `@media (prefers-reduced-motion: reduce)`.
```

#### Engineering Output
- Implemented `src/hooks/useBodyScrollLock.ts` with scrollbar compensation padding.
- Enhanced focus capture and restoration in `LightboxViewer.tsx` and `Modal.tsx`.
- Added high-contrast `:focus-visible` styling in `src/index.css`.

---

### Session 08: Distributed Cloud Architecture & Scalability Modeling

#### Purpose
Design a resilient, multi-AZ production cloud architecture diagram for an internet-scale vacation rental marketplace.

#### System Role / Persona
> Enterprise Cloud Solutions Architect

#### User Prompt
```markdown
Act as an Enterprise Cloud Solutions Architect. Design a production-grade, multi-tier cloud infrastructure diagram for an internet-scale vacation rental platform inspired by Airbnb.

Architecture Tiers to Model:
1. Edge Tier & Client Touchpoints:
   - Client Web SPA/PWA, Cloudflare Anycast CDN & WAF, Serverless Edge Handlers (TLS 1.3, DDoS protection).
2. Presentation Tier:
   - Containerized Next.js / SSR Application Cluster (AWS EKS Multi-AZ), S3 Static Asset Origin.
3. Edge Ingress & Routing:
   - Envoy Ingress Gateway, Multi-AZ High-Throughput Load Balancers (NLB/ALB), Experience API / BFF Layer.
4. Domain Microservices Mesh:
   - Decoupled Identity & Auth (Go/gRPC), Property Catalog (Java/Spring), Reservation Engine (Go/ACID), User & Profile, Reviews, and Financial/Payment Service (Stripe integration).
5. Data Persistence & Acceleration:
   - AWS Aurora PostgreSQL (Multi-AZ Primary + 3x Read Replicas), Redis Enterprise In-Memory Cluster, Amazon S3 Media Storage, OpenSearch Discovery Fleet.
6. Async Event Fabric & Background Workers:
   - Distributed Apache Kafka Event Mesh, Debezium CDC Search Ingestion, Media Transcoding Workers, Notification Consumer Fleet (Twilio/SendGrid).

Write a Python Matplotlib script (`scripts/generate_architecture_diagram.py`) that programmatically exports:
- High-resolution 16:9 PNG (300 DPI)
- Vector PDF
- Scalable SVG
```

#### Engineering Output
- Created `scripts/generate_architecture_diagram.py`.
- Generated `architecture/architecture-diagram.png` (6570x3698 px), `.pdf`, and `.svg`.

---

### Session 09: Static Analysis, Linter Hygiene & Final Production Verification

#### Purpose
Enforce zero TypeScript errors, clean linter execution, dead code elimination, and final build validation.

#### System Role / Persona
> Static Analysis & Release Governance Lead

#### User Prompt
```markdown
Perform a final production-readiness review and release verification:
1. Execute TypeScript type checking (`tsc -b`) and production bundling (`vite build`).
   - Fix all type mismatches, missing imports, or loose typings.
   - Verify `verbatimModuleSyntax` compliance with explicit `import type` statements.
2. Static Analysis:
   - Run `oxlint` across all source files and ensure 0 warnings and 0 errors.
3. Clean Up:
   - Remove unused components, dead imports, and obsolete hooks.
4. Generate Documentation:
   - Document project structure, architecture highlights, running instructions, and known limitations in `README.md` and `CLAUDE.md`.
```

#### Engineering Output
- `tsc -b && vite build` passed cleanly in ~350ms.
- `oxlint` reported 0 errors and 0 warnings across all source files.
- Compiled complete project documentation.

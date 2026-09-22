# Visual QA Audit Skill

## Objective
Verify visual fidelity against Airbnb reference design across desktop resolutions (`1440x900` and `1366x768`).

## Audit Checklist
1. **Header & Navigation**:
   - Header height fixed at 80px with subtle bottom border.
   - Pill search bar centered with icon separator and search trigger.
   - Sticky sub-nav reveals smoothly when hero grid leaves viewport.
2. **Hero Photo Grid**:
   - 5-photo bento grid layout with 460px height and 8px gaps.
   - Large photo on the left spans full height with rounded left corners.
   - Right 4 photos form 2x2 grid with rounded right corners.
   - "Show all photos" floating button positioned bottom-right (`bottom-6 right-6`).
3. **Reservation Sidebar**:
   - Sticky offset `top-28` to maintain viewport visibility.
   - Card border `rounded-3xl` with 16px soft box shadow (`shadow-xl`).
   - Guest selector dropdown aligns with card boundaries and closes on click outside.
4. **Modals & Overlays**:
   - Full-screen Photo Tour overlay with dark backdrop and category filter pills.
   - Lightbox single-photo viewer centered with index indicator and keyboard navigation.

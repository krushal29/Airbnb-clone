# Accessibility Audit Skill

## Objective
Verify WCAG 2.1 AA compliance, keyboard navigation, focus trapping, and screen reader semantics.

## Audit Checklist
1. **Keyboard Trapping & Modals**:
   - Every modal (`AmenitiesModal`, `DescriptionModal`, `ReviewsModal`, `PhotoTourModal`) must trap focus inside while open.
   - Pressing `Tab` on the last focusable element wraps back to the first focusable element.
   - Pressing `Shift+Tab` on the first element wraps to the last focusable element.
2. **Focus Restoration**:
   - Dismissing any dialog must return focus to the triggering element.
3. **Escape Key Handling**:
   - Pressing `Escape` must close the active modal, dropdown, or lightbox.
4. **Accessible Labels**:
   - All icon buttons must have `aria-label`.
   - Modals must declare `role="dialog"` and `aria-modal="true"`.
5. **Visible Focus**:
   - Focus indicators must remain visible (`focus-visible:ring-2`).
6. **Reduced Motion**:
   - Animations respect `@media (prefers-reduced-motion: reduce)`.

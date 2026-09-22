# Build & Code Health Verification Skill

## Objective
Verify strict TypeScript compilation, zero linter warnings, and production bundle generation.

## Verification Steps
1. **Linting Check**:
   ```bash
   npm run lint
   ```
   Must exit with code 0 and report 0 warnings and 0 errors.

2. **TypeScript Compilation & Production Build**:
   ```bash
   npm run build
   ```
   Runs `tsc -b && vite build`. Must compile with zero errors and generate `dist/` bundle.

3. **Bundle Preview**:
   ```bash
   npm run preview
   ```
   Verify production build loads at `http://localhost:4173/`.

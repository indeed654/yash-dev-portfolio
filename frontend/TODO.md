# Premium SaaS-Quality Portfolio Upgrade — TODO

## Step 1 — Baseline upgrade dependencies & scaffolding
- [x] Add required dependencies: framer-motion, three, @react-three/fiber, @react-three/drei, lenis

- [ ] Add shared motion utilities: src/utils/motion.ts (variants + reduced-motion)

- [ ] Add scroll reveal hook: src/hooks/useScrollReveal.ts
- [ ] Add Lenis integration: src/hooks/useLenis.ts + init in src/main.tsx
- [ ] Add scroll spy hook: src/hooks/useScrollSpy.ts

## Step 2 — Hero (keep composition)
- [ ] Create Hero scene component: src/components/hero/HeroScene.tsx using R3F/drei (particles, glass/AI orb, aurora, noise)
- [ ] Replace Hero.tsx background/video with HeroScene (lazy loaded)
- [ ] Add Framer Motion text reveal + magnetic CTA + entry choreography

## Step 3 — Navbar premium behavior
- [ ] Replace Navbar.tsx with glassmorphism + scroll hide/show
- [ ] Active section indicator via scroll spy
- [ ] Magnetic hover + animated underline
- [ ] Mobile menu with transitions

## Step 4 — Section scroll reveals + transitions
- [ ] Wrap About, Skills, Experience, Projects, Certifications, Contact with scroll-reveal + Framer Motion transitions

## Step 5 — Projects premium cards
- [ ] Upgrade Projects cards: glass surface, tilt, border glow, hover elevation, micro-interactions
- [ ] Add GitHub / Live demo buttons only when URLs exist (else adapt safely)

## Step 6 — Skills premium presentation
- [ ] Update Skills.tsx: categorized cards remain, add marquee + progress indicators

## Step 7 — Contact form upgrade
- [ ] Implement glass contact form with validation + submit to backend
- [ ] Success animation + focus management
- [ ] Add resume download CTA using real URL (or omit only if not provided)

## Step 8 — Performance & quality gates
- [ ] Code split + lazy load heavy parts
- [ ] Reduced-motion support (no RAF work when prefers-reduced-motion)
- [ ] Run build and confirm no TS errors
- [ ] Lighthouse check for >95



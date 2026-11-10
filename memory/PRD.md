# PRD — "for Michelle" Farewell Letter Landing Page

## Original Problem Statement
Build a landing page like the provided image inspiration (dark bg, purple aurora silk waves, frosted glassmorphic card, big bold type) presenting a long heartfelt farewell letter from "jaycee" to her friend "Michelle" who is leaving for China. User requested a 3D background/effect.

## User Choices
- Full letter visible on scrollable page (glass cards)
- 3D background: purple aurora/silk waves + floating glowing particles/stars, both combined
- Recipient name "Michelle" prominent; keep it minimal, just the letter
- No music/sound
- Mobile-first (she'll open it on her phone)

## Architecture
- Frontend-only React app (backend untouched, default FastAPI hello endpoint)
- 3D: three + @react-three/fiber + @react-three/drei (MeshDistortMaterial silk blobs, Sparkles stars), fixed fullscreen canvas
- Motion: framer-motion (masked line-by-line hero reveal, scroll-reveals, parallax hero) + lenis smooth scrolling
- Fonts: Outfit (headings), Cormorant Garamond (body), Caveat (signature)
- Components: AuroraBackground, GlassCard, Hero, Marquee, Letter (5 numbered chapters), Signature

## Implemented (June 2026)
- Kinetic hero glass card mirroring inspiration image ("hi, Michelle. read this slow.")
- Slow editorial marquee ("don't be a stranger ✦ ur china era ✦ ...")
- Full letter verbatim in 5 numbered glassmorphic chapters with staggered scroll reveals
- Caveat handwritten "— jaycee" signature with glow
- Grain overlay, hidden scrollbars, purple selection color, custom page title
- Verified via screenshots on 390px mobile and 1920px desktop

## Backlog
- P1: Twilight Sparkle keychain photo/illustration moment in chapter 04
- P2: Shareable OG meta image; subtle shooting-star easter egg on tap
- P2: Reduced-motion fallback for low-end devices

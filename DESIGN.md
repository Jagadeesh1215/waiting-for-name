# Design Brief — VenIQ Media LLP

## Tone & Purpose
Premium digital agency for healthcare professionals. Sophisticated, refined, luxury SaaS aesthetic serving hospitals, doctors, clinics, and modern businesses. Bold, attention-grabbing effects befitting top-tier agency showcase.

## Color Palette
| Token | OKLCH | Hex | Semantic | Usage |
| --- | --- | --- | --- | --- |
| Primary | 48 0.13 289° | #2D1B69 | Deep Purple | Hero text, CTAs, highlights |
| Secondary | 53 0.16 285° | #4A2C9E | Secondary Purple | Buttons, borders, accents |
| Accent | 63 0.15 72° | #D4A017 | Muted Gold | Icons, numbered circles, hover borders |
| Accent-Light | 75 0.18 75° | #F0C040 | Bright Gold | CTA glow, bright highlights |
| Background | 98 0.02 290° | #F8F7FF | Light Purple-Grey | Main surface, calm neutral |
| Foreground | 12 0.04 285° | #1A1035 | Dark Purple | Body text, labels |
| Card | 99 0 0° | #FFFFFF | White | Content surfaces, cards |
| Card-Dark | 12 0.04 285° | #1A1035 | Dark Purple-Card | Dark mode cards |
| Border | 96 0.02 290° | #E8E3FF | Subtle Purple-Border | Input borders, dividers |

## Typography
**Display/Hero**: Fraunces (luxury serif). Metrics: 32px–64px for headlines. Serif reinforces premium, editorial brand.
**Body/UI**: DM Sans (400, 600). Metrics: 14px–18px. Modern, clean, professional.
**Mono**: Geist Mono for code blocks and technical labels. Metrics: 12px–14px.

## Structural Zones
| Zone | Background | Border | Purpose |
| --- | --- | --- | --- |
| Header/Nav | Sticky blur white/purple-tint | Bottom border soft | Logo, nav links, dark toggle, CTA |
| Hero | Gradient mesh (purple radials + bloom) | None | Headline, 3D scene (R3F) |
| Section | White or Light BG | None | Content cards in grid |
| Dark Section | #2D1B69 deep purple | None | Advantage blocks, CTAs |
| Card | White w/ gold border (hover) | 1px gold/15 | Glassmorphism, spring lift |
| Footer | #0D0A1A (dark) or slate-900 | Top border gold | 4 columns, links, social |

## Component Patterns
- **CTAs**: Gold bg, white text, rounded-full, spring hover scale + bloom glow, magnetic pull effect
- **Secondary CTA**: Purple border outline, hover gold fill + spring bounce
- **Section Labels**: Small caps, gold, letter-spacing-widest, text-shadow glow
- **Cards**: White bg, gold border (hover), spring-in animation on scroll, pbr-material shadow
- **Process Steps**: Gold numbered circles (4rem) with gradient + glow, dashed connectors animate, scale bounce on hover
- **Service Cards**: Icon + title + 2-line desc, hover: lift (spring) + gold left border glow

## Motion & Animation Choreography
- **Scroll reveal**: fadeUp — opacity 0→1, y 40→0 over 0.6s easeOut
- **Spring physics**: cubic-bezier(0.34, 1.56, 0.64, 1) for CTAs, cards, process steps (damping 8, mass 0.5, stiffness 200)
- **Premium ease**: cubic-bezier(0.23, 1, 0.32, 1) for section reveals, text animations
- **Stagger**: containerVariants delays children by 0.12s minimum
- **Headline split**: 3-line split reveal — each line 0.1s stagger, 0.8s total duration
- **Magnetic CTA**: 50px cursor proximity pull, spring bounce on click, gold glow activation
- **Card hover**: y 0→-6px, shadow lift (purple→gold tint), spring-in 0.7s
- **Process circles**: scale 1.08 + gold glow pulse on hover, dashed connectors animate dash-offset
- **Counter**: useMotionValue + useSpring from 0 to target when section enters viewport
- **Scroll progress**: fixed gold gradient line at top, 2px height, glow effect
- **3D parallax**: Mouse-driven camera (desktop), scroll-tilt (±5deg), auto-rotate (mobile)

## Elevation & Depth
- **PBR Materials**: Laptop bezel metallic (roughness 0.4), phone screen glossy (roughness 0.1), emissive platform (emissive 0.3)
- **Post-processing**: Bloom (threshold 0.8, strength 1.2) + DepthOfField (focal depth 4 units), adaptive disable on mobile/low-end
- **Shadow hierarchy**: `shadow-pbr-material` (rest), `shadow-pbr-material-hover` (elevated), `shadow-dof-blur` (depth)
- **Glassmorphism**: `glass-card` (light: blur 12px, bg white/65) or `glass-card-dark` (dark: blur 12px, bg purple/75)
- **Card depth**: Rest shadow-lg purple, hover shadow-2xl gold-tinted, spring animation lift

## 3D Scene & Rendering
- **Framework**: React Three Fiber + Three.js, physically-based materials (no ray-tracing), 60fps target
- **PBR**: Laptop metallic (roughness 0.4, metalness 0.8), phone glossy (roughness 0.1), platform emissive purple
- **Lighting**: Ambient white (intensity 0.5) + PointLight gold [5,5,5] + PointLight purple [-5,3,-3]
- **Post-processing**: Bloom (threshold 0.8, strength 1.2) + DepthOfField (focal depth 4, aperture 10)
- **Camera**: Perspective (fov 45, pos [0,0,8]); mouse parallax (desktop), scroll-tilt (±5deg), auto-rotate (mobile)
- **Objects**: Float laptop, phone, orbiting social icons (radius 3.5), sparkle particles (depth layers)

## Transition & Timing Utilities
- **Smooth**: `transition-smooth` (0.3s cubic-bezier(0.4, 0, 0.2, 1)) — standard interactive
- **Spring**: `transition-spring` (0.4s cubic-bezier(0.34, 1.56, 0.64, 1)) — bouncy, premium feel
- **Premium**: `transition-premium` (0.35s cubic-bezier(0.23, 1, 0.32, 1)) — refined ease-in-out
- **Mobile**: `prefers-reduced-motion` disables all animations (animation-duration 0.01ms)
- **Spring physics**: CTA hover (damping 8, mass 0.5, stiffness 200), card lift (spring-in 0.7s)
- **Easing palette**: easeOut (scroll reveals), easeInOut (transitions), spring cubic (premium interactions)

## Signature Details & Differentiation
- **Gold numbered circles**: Muted gold (#D4A017) numbered circles (4rem) with gradient + dashed connectors (animated dash-offset)
- **Glassmorphic cards**: White/purple bg with transparency + backdrop blur-12 + gold border on hover
- **Purple gradient mesh**: Subtle radial gradients (purple → violet) in hero background + bloom post-effect
- **Magnetic CTAs**: Gold buttons scale + glow on hover, spring bounce, proximity pull (50px)
- **3D hero**: React Three Fiber — floating laptop (PBR metallic), phone (glossy), orbiting icons, glowing platform + particles
- **Scroll progress**: Fixed gold line top (2px), animates with page scroll, glow effect

## Design Constraints
- No clinical coldness; use purple-tinted neutrals. Gold (#D4A017) for accents only. Subtle radial gradients.
- Fraunces display (32px+), DM Sans sections (20–24px), body (16px). Dark mode: deep purple + bright gold + white text.
- Mobile-first: 1-col mobile, 2-col tablet, 3-col desktop. All interactive: focus rings + AA+ contrast.
- Motion respects `prefers-reduced-motion`. 3D hero uses R3F with PBR materials, post-processing auto-adapts to device performance.

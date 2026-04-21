# Design Brief

## Tone & Purpose
Professional healthcare admin interface — clean, minimal, trustworthy. Prioritizes clarity and data legibility without clinical coldness. Medical context guides every decision.

## Color Palette
| Token | OKLCH | Semantic | Usage |
| --- | --- | --- | --- |
| Primary | 54 0.15 262° | Medical Blue | CTAs, highlights, active states |
| Background | 97.5 0.04 202° | Soft Blue-Grey | Main surface, calm neutral |
| Foreground | 25 0.08 253° | Dark Navy | Body text, labels |
| Card | 98 0 0 | White | Content surfaces |
| Border | 93 0.02 202° | Subtle Grey-Blue | Input borders, dividers |
| Success | 60 0.2 140° | Emerald | Badges, confirmation |
| Warning | 65 0.22 40° | Amber | Alerts, category highlight |
| Destructive | 55 0.22 25° | Red | Delete actions, errors |

## Category Color System
| Category | Color | Use Case |
| --- | --- | --- |
| SPINE | Blue-50/700 | Primary medical specialization |
| BRAIN | Amber-50/700 | Neurological content |
| NEUROLOGY | Purple-50/700 | Neurology specialty |
| REHABILITATION | Emerald-50/700 | Recovery & therapy |
| GENERAL | Slate-100/600 | Non-specific articles |

## Typography
**Display/UI**: General Sans (400, 600 weights). System fallback for consistency. Metrics: 14px–24px type scale.
**Content**: Lora serif for rich text in EditorJS editor. Serif reinforces editorial professionalism.
**Mono**: Fira Code for code blocks.

## Structural Zones
| Zone | Background | Border | Purpose |
| --- | --- | --- | --- |
| Header | Soft-blue-grey w/ subtle gradient | Bottom border | Status, breadcrumb |
| Sidebar | Soft-blue-grey | Right border | Navigation |
| Main Content | White card on background | None | Table, forms, content |
| Footer | Slate-50 | Top border | Pagination, meta |

## Component Patterns
- **Tables**: Striped rows (hover), category badges in cells, action buttons right-aligned
- **Forms**: Stacked fields, icon-prefixed inputs (search), step indicator pills, progress bar
- **Cards**: Stat cards, post preview cards with image thumbnails
- **Modals**: Centered, scaleIn animation, backdrop blur, red delete modal
- **Toasts**: Bottom-right, slideUp animation, 3.6s duration
- **Pagination**: Chevron buttons, number buttons with active state

## Motion & Animation
- **Step transitions**: Fade-in 0.2s + slide-right 0.25s (motion library)
- **Modal enter**: ScaleIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)
- **Toast**: SlideUp 0.28s ease
- **Progress bar**: Width animate 0.35s smooth
- **Hover**: Subtle lift (-translate-y-0.5), 0.2s transition
- **All interactive**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## Elevation & Depth
- **Subtle shadows**: `shadow-sm` for cards (0 1px 2px)
- **Modal backdrop**: Semi-transparent dark (50%) + blur
- **Hover states**: Border color shift + shadow-md
- **Focus rings**: 3–4px blue-tinted ring

## Spacing & Rhythm
- **Base unit**: 4px grid. Padding: 12px (sm), 16px (md), 24px (lg).
- **Density**: Compact admin table (py-3.5), generous form fields (py-3).
- **Gaps**: Consistent 16px between sections, 8px between form groups.

## Signature Detail
**Medical blue accent line**: Progress bar uses gradient `from-medical-blue to-sky-400`. Step indicators show completed states with emerald checkmarks. Table rows fade on hover to soften interaction.

## Constraints
- No clinical / sterile whites; all surfaces have warm blue-grey undertone
- Category colors strict (no custom tints)
- No generic shadows; all soft, contextual
- Motion respects `prefers-reduced-motion`

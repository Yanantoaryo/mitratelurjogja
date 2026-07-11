# Design System Inspired by theFront

> Auto-extracted from `https://mui.com/store/previews/the-front-landing-page/` on 2026-07-11

## 1. Visual Theme & Atmosphere

Clean, minimal, and product-focused with deliberate use of whitespace.

The hero section leads with "Preview theFront - Multipurpose Template + UI Kit".

**Key Characteristics:**
- IBM Plex Sans as the heading font (custom web font loaded via @font-face)
- IBM Plex Sans as the body font for all running text
- Heading weight 700
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#0073e6` used for CTAs and brand highlights
- 1 shadow level(s) detected — tinted shadows
- Rounded corners (10px+) creating a friendly, approachable feel
- Tags: light, rounded, accented, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#0073e6`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#0073e6`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#1a1e23`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#666666`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#24292e`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#24292e` | `--palette-1` | block | large | text-light |
| 2 | `#0073e6` | `--palette-2` | button | small | text-light |

## 3. Typography Rules

- **Heading Font:** `IBM Plex Sans` (web font)
- **Body Font:** `IBM Plex Sans` (web font)

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | IBM Plex Sans | 32px | 700 | 48px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `32px` | headings |
| H1 | `18px` | headings |
| H2 | `16px` | headings |
| H3 | `15px` | headings |
| H4 | `13px` | headings |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: transparent;
  color: #ffffff;
  border-radius: 10px;
  padding: 8px 8px;
  font-size: 13px;
  font-weight: 500;
  border: 0.8px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `8px` — use multiples (16px, 24px, 32px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `8px` | element |
| spacing-2 | `6px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-button | `10px` | button |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Low | `rgba(51, 153, 255, 0.5) 0px 1px 0px 0px inset, rgba(0, 77, 153, 0.4) 0px -1px 0p...` | Cards, subtle elevation |

> **Note:** This site uses chromatic (color-tinted) shadows rather than pure black — this is a deliberate brand choice that adds warmth to elevation.

## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `IBM Plex Sans` for all headings and `IBM Plex Sans` for body text
- Use `#0073e6` as the single dominant accent/CTA color
- Maintain `8px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`10px`+) consistently for all interactive elements
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 700 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute IBM Plex Sans/IBM Plex Sans with generic alternatives
- Don't use irregular spacing — stick to 8px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#1a1e23` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 8px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #1a1e23
Accent:      #0073e6
Border:      #24292e
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `IBM Plex Sans` heading in `#1a1e23`, and a `#0073e6` CTA button."
2. "Create a pricing card using background `#0073e6`, border `#24292e`, `IBM Plex Sans` for text, and 24px padding."
3. "Design a navigation bar — `#ffffff` background, `#1a1e23` links, `#0073e6` for active state."
4. "Build a feature grid with 3 columns, 24px gap, each card using the card component style."
5. "Create a footer with `#1a1e23` background, `#ffffff` text, and 16px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct

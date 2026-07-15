# Design System Inspired by AgriHub

> Auto-extracted from `https://bestwpware.com/html/tf/agrihub/?storefront=envato-elements` on 2026-07-12

## 1. Visual Theme & Atmosphere

Friendly, approachable design with rounded shapes and generous whitespace.

The hero section leads with "Discover the art  of gardening" followed by "We have been operating for over a decade, providing top-notch services to our clients
              ".

**Key Characteristics:**
- Noto Serif as the heading font
- Montserrat as the body font for all running text
- Heading weight 700, letter-spacing -2.5px
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#fdd61f` used for CTAs and brand highlights
- 3 shadow level(s) detected — tinted shadows
- Rounded corners (10px+) creating a friendly, approachable feel
- Tags: light, rounded, accented, bold-typography, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#fdd61f`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#2ab939`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#1f4e3d`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#e9efe5`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#666666`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#eff3ed`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#ffffff` | `--palette-1` | section | large | text-dark |
| 2 | `#1f4e3d` | `--palette-2` | text-accent | large | text-light |
| 3 | `#eff3ed` | `--palette-3` | block | large | text-dark |
| 4 | `#f4fbf5` | `--palette-4` | block | large | text-dark |
| 5 | `#2ab939` | `--palette-5` | text-accent | large | text-dark |
| 6 | `#fdd61f` | `--palette-6` | text-accent | medium | text-dark |

## 3. Typography Rules

- **Heading Font:** `Noto Serif`, sans-serif
- **Body Font:** `Montserrat`, sans-serif

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | Noto Serif | 80px | 700 | 85px | -2.5px |
| H2 | Noto Serif | 50px | 400 | 58px | normal |
| H3 | Noto Serif | 30px | 400 | 39px | normal |
| H4 | Noto Serif | 24px | 700 | 31.2px | normal |
| Body | Montserrat | 16px | 400 | 30px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `80px` | headings |
| H1 | `50px` | headings |
| H2 | `48px` | headings |
| H3 | `46px` | headings |
| H4 | `40px` | headings |
| Body L | `39px` | body / supporting text |
| Body | `36px` | body / supporting text |
| Small | `30px` | body / supporting text |
| XS | `24px` | body / supporting text |
| Caption | `20px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: #2ab939;
  color: #ffffff;
  border-radius: 0px;
  padding: 0px 12px;
  font-size: 12px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: #2ab939;
  color: #ffffff;
  border-radius: 20px;
  padding: 18px 30px;
  font-size: 15px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #ffffff;
  border-radius: 0px;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
```

### Outline Button

```css
.btn-outline {
  background: transparent;
  color: #ffffff;
  border-radius: 20px;
  padding: 18px 30px;
  font-size: 15px;
  font-weight: 400;
  border: 0.8px solid rgb(42, 185, 57);
  cursor: pointer;
}
```

### Outline Button 2

```css
.btn-outline-2 {
  background: transparent;
  color: #1f4e3d;
  border-radius: 20px;
  padding: 18px 30px;
  font-size: 15px;
  font-weight: 400;
  border: 0.8px solid rgb(42, 185, 57);
  cursor: pointer;
}
```

### Ghost Button 2

```css
.btn-ghost-2 {
  background: transparent;
  color: #1f4e3d;
  border-radius: 0px;
  padding: 0px 0px;
  font-size: 20px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `18px` — use multiples (36px, 54px, 72px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `18px` | element |
| spacing-2 | `20px` | element |
| spacing-3 | `11px` | element |
| spacing-4 | `40px` | card |
| spacing-5 | `120px` | section |
| spacing-6 | `24px` | card |
| spacing-7 | `14px` | element |
| spacing-8 | `16px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-button | `10px` | button |
| radius-card | `20px` | card |
| radius-card | `50px` | card |
| radius-subtle | `5px` | subtle |
| radius-subtle | `4px` | subtle |
| radius-pill | `100px` | pill |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Deep | `rgba(42, 185, 57, 0.1) 0px 10px 30px 0px` | Hero sections, deep layers |
| Mid | `rgba(0, 0, 0, 0.2) 0px 0px 10px 0px` | Dropdowns, popovers |
| Deep | `rgba(0, 0, 0, 0.05) 0px 0px 60px 0px` | Hero sections, deep layers |

> **Note:** This site uses chromatic (color-tinted) shadows rather than pure black — this is a deliberate brand choice that adds warmth to elevation.

## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `Noto Serif` for all headings and `Montserrat` for body text
- Use `#fdd61f` as the single dominant accent/CTA color
- Maintain `18px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`10px`+) consistently for all interactive elements
- Make headlines large and bold — typography is the hero element
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 700 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute Noto Serif/Montserrat with generic alternatives
- Don't use irregular spacing — stick to 18px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#e9efe5` instead
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
- Maintain 18px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #e9efe5
Accent:      #fdd61f
Secondary:   #2ab939
Border:      #eff3ed
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `Noto Serif` heading in `#e9efe5`, and a `#fdd61f` CTA button with 0px radius."
2. "Create a pricing card using background `#1f4e3d`, border `#eff3ed`, `Montserrat` for text, and 54px padding."
3. "Design a navigation bar — `#ffffff` background, `#e9efe5` links, `#fdd61f` for active state."
4. "Build a feature grid with 3 columns, 54px gap, each card using the card component style."
5. "Create a footer with `#e9efe5` background, `#ffffff` text, and 36px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct

## 10. CSS Custom Properties

> 21 custom properties extracted from `:root` / `html` stylesheets.

### Color Variables

| Variable | Value |
|---|---|
| `--swiper-theme-color` | `#007aff` |
| `--body` | `#fff` |
| `--black-clr` | `#000` |
| `--white-clr` | `#fff` |
| `--p1-clr` | `#2ab939` |
| `--p2-clr` | `#fdd61f` |
| `--p900-clr` | `#1f4e3d` |
| `--pure900-clr` | `#225744` |
| `--p800-clr` | `#6d756d` |
| `--p700-clr` | `#191919` |
| `--p200-clr` | `#e9efe5` |
| `--p100-clr` | `#eff3ed` |
| `--box-clr` | `#2A5747` |
| `--shadow-clr` | `box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px` |

### Spacing Variables

| Variable | Value |
|---|---|
| `--bs-breakpoint-xs` | `0` |
| `--bs-breakpoint-sm` | `576px` |
| `--bs-breakpoint-md` | `768px` |
| `--bs-breakpoint-lg` | `992px` |
| `--bs-breakpoint-xl` | `1200px` |
| `--bs-breakpoint-xxl` | `1400px` |
| `--swiper-navigation-size` | `44px` |

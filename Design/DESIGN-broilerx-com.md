# Design System Inspired by broilerx.com

> Auto-extracted from `https://www.broilerx.com/en` on 2026-07-15

## 1. Visual Theme & Atmosphere

Clean, minimal, and product-focused with deliberate use of whitespace.

The hero section leads with "Your Daily Poultry Partner" followed by "The Best Technology and Support for Modern Farmers".

**Key Characteristics:**
- __Inter_221c8b as the heading font (custom web font loaded via @font-face)
- __Inter_221c8b as the body font for all running text
- Heading weight 900
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#f5be01` used for CTAs and brand highlights
- 2 shadow level(s) detected — tinted shadows
- Rounded corners (4px+) creating a friendly, approachable feel
- Tags: light, rounded, accented, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#f5be01`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#f7cb33`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.

### Text
- **Text Primary** (`#000000`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#475467`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#1e222c`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#1e222c` | `--palette-1` | section | large | text-light |
| 2 | `#ffffff` | `--palette-2` | block | large | text-dark |
| 3 | `#12141d` | `--palette-3` | section | large | text-light |
| 4 | `#0f172a` | `--palette-4` | button | medium | text-light |
| 5 | `#475467` | `--palette-5` | text-accent | small | text-light |
| 6 | `#f7cb33` | `--palette-6` | badge | small | text-dark |
| 7 | `#344054` | `--palette-7` | text-accent | small | text-light |
| 8 | `#667085` | `--palette-8` | text-accent | small | text-light |
| 9 | `#f5be01` | `--palette-9` | text-accent | small | text-dark |

## 3. Typography Rules

- **Heading Font:** `__Inter_221c8b` (web font)
- **Body Font:** `__Inter_221c8b` (web font)

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | __Inter_221c8b | 48px | 900 | 48px | normal |
| H2 | __Inter_221c8b | 30px | 500 | 36px | normal |
| H3 | __Inter_221c8b | 14px | 500 | 20px | normal |
| Body | __Inter_221c8b | 18px | 700 | 28px | normal |
| Small | __Inter_221c8b | 14px | 500 | 20px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `48px` | headings |
| H1 | `36px` | headings |
| H2 | `30px` | headings |
| H3 | `24px` | headings |
| H4 | `20px` | headings |
| Body L | `18px` | body / supporting text |
| Body | `16px` | body / supporting text |
| Small | `14px` | body / supporting text |
| XS | `12px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: #ffffff;
  color: #475467;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
```

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #475467;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: #ffffff;
  color: #0c111d;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 700;
  border: 0.8px solid rgb(245, 190, 1);
  cursor: pointer;
}
```

### Outline Button

```css
.btn-outline {
  background: transparent;
  color: #101828;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 0.8px solid rgb(245, 190, 1);
  cursor: pointer;
}
```

### Pill Button

```css
.btn-pill {
  background: #ffffff;
  color: #101828;
  border-radius: 9999px;
  padding: 0px 0px;
  font-size: 14px;
  font-weight: 500;
  border: 0.8px solid rgb(226, 232, 240);
  cursor: pointer;
}
```

### Pill Button 2

```css
.btn-pill-2 {
  background: #f7cb33;
  color: #101828;
  border-radius: 9999px;
  padding: 0px 0px;
  font-size: 14px;
  font-weight: 500;
  border: 0.8px solid rgb(226, 232, 240);
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `16px` — use multiples (32px, 48px, 64px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `16px` | element |
| spacing-2 | `24px` | card |
| spacing-3 | `8px` | element |
| spacing-4 | `12px` | element |
| spacing-5 | `40px` | card |
| spacing-6 | `20px` | element |
| spacing-7 | `4px` | element |
| spacing-8 | `6px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-subtle | `4px` | subtle |
| radius-button | `12px` | button |
| radius-button | `6px` | button |
| radius-button | `8px` | button |
| radius-card | `24px` | card |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |


## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `__Inter_221c8b` for all headings and `__Inter_221c8b` for body text
- Use `#f5be01` as the single dominant accent/CTA color
- Maintain `16px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`4px`+) consistently for all interactive elements
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 900 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute __Inter_221c8b/__Inter_221c8b with generic alternatives
- Don't use irregular spacing — stick to 16px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#000000` instead
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
- Maintain 16px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #000000
Accent:      #f5be01
Secondary:   #f7cb33
Border:      #1e222c
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `__Inter_221c8b` heading in `#000000`, and a `#f5be01` CTA button with 6px radius."
2. "Create a pricing card using background `#ffffff`, border `#1e222c`, `__Inter_221c8b` for text, and 48px padding."
3. "Design a navigation bar — `#ffffff` background, `#000000` links, `#f5be01` for active state."
4. "Build a feature grid with 3 columns, 48px gap, each card using the card component style."
5. "Create a footer with `#000000` background, `#ffffff` text, and 32px padding."

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

> 20 custom properties extracted from `:root` / `html` stylesheets.

### Spacing Variables

| Variable | Value |
|---|---|
| `--radius` | `0.5rem` |

### Other Variables

| Variable | Value |
|---|---|
| `--background` | `0 0% 100%` |
| `--foreground` | `222.2 84% 4.9%` |
| `--card` | `0 0% 100%` |
| `--card-foreground` | `222.2 84% 4.9%` |
| `--popover` | `0 0% 100%` |
| `--popover-foreground` | `222.2 84% 4.9%` |
| `--primary` | `222.2 47.4% 11.2%` |
| `--primary-foreground` | `210 40% 98%` |
| `--secondary` | `210 40% 96.1%` |
| `--secondary-foreground` | `222.2 47.4% 11.2%` |
| `--muted` | `210 40% 96.1%` |
| `--muted-foreground` | `215.4 16.3% 46.9%` |
| `--accent` | `210 40% 96.1%` |
| `--accent-foreground` | `222.2 47.4% 11.2%` |
| `--destructive` | `0 84.2% 60.2%` |
| ... | *(4 more)* |

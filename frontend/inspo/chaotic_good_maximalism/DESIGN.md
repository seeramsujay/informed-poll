---
name: Chaotic Good Maximalism
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3c3742'
  surface-container-lowest: '#100d16'
  surface-container-low: '#1d1a24'
  surface-container: '#221e28'
  surface-container-high: '#2c2833'
  surface-container-highest: '#37333e'
  on-surface: '#e8dfee'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#e8dfee'
  inverse-on-surface: '#332f39'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#ffb690'
  on-tertiary: '#552100'
  tertiary-container: '#aa4900'
  on-tertiary-container: '#ffdecf'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#15121b'
  on-background: '#e8dfee'
  surface-variant: '#37333e'
typography:
  display-2xl:
    fontFamily: Bebas Neue
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 100px
    letterSpacing: 0.02em
  display-xl:
    fontFamily: Bebas Neue
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 16px
  margin: 20px
---

## Brand & Style

This design system is built for a 22-year-old university demographic that thrives in the high-energy, fast-paced environment of viral social media. It rejects corporate sterility in favor of **Maximalist Glassmorphism**—a style that combines the depth of translucent layers with the aggressive energy of neon gradients and massive typography. 

The brand personality is "Chaotic Good": it is loud, opinionated, and visually stimulating, yet remains functionally intuitive. It draws inspiration from the gamified urgency of Duolingo and the community-centric data visualization of Letterboxd, wrapped in a TikTok-inspired aesthetic. The UI should feel like a living, breathing entity, utilizing noise textures and glow effects to break the "flatness" of traditional digital interfaces.

## Colors

The palette is anchored in a deep **neutral-950 (#0a0a0a)** background to provide maximum contrast for the vibrant neon elements. 

- **Electric Violet (#7c3aed to #4f46e5):** The primary driver for brand identity and major interactive states.
- **Cyber Teal (#2dd4bf to #06b6d4):** Used for secondary actions and high-tech informational callouts.
- **Hot Coral (#f97316):** An urgent accent for notifications, highlights, and "break-out" moments.
- **Neon Green (#4ade80):** Reserved for success states and "level-up" gamification moments.

Surface colors utilize **neutral-900/60** with a high-intensity backdrop blur to create the glass effect, ensuring that the background noise texture remains visible through the UI layers.

## Typography

The typographic hierarchy relies on a "Loud and Clear" philosophy. **Bebas Neue** is used for all major headings and display text. It should be used at massive scales, often breaking traditional margin constraints to create a sense of urgency and impact. 

**DM Sans** handles the heavy lifting for body text and labels. It provides the necessary legibility to balance the chaotic display type. For interactive labels and buttons, use bold weights and slight tracking increases to maintain a chunky, tactile feel.

## Layout & Spacing

This design system uses a **fluid, high-density layout** that prioritizes vertical scrolling and "stacking" content cards. 

- **Grid Model:** A 12-column fluid grid for desktop and a 4-column grid for mobile.
- **Rhythm:** Spacing is aggressive. Small gaps (8px) are used to group related glass modules, while large gaps (40px+) are used to separate major content sections.
- **Intentional Overlap:** Elements are encouraged to slightly overlap or "break the box" to enhance the maximalist aesthetic.

## Elevation & Depth

Elevation is achieved through **translucency and luminosity** rather than traditional drop shadows.

1.  **Base Layer:** Neutral-950 background with a 10% grain/noise overlay.
2.  **Surface Layer:** Neutral-900 at 60% opacity with a `backdrop-filter: blur(24px)`.
3.  **Borders:** Razor-thin (0.5px to 1px) solid borders using a 20% white or a muted version of the primary brand color.
4.  **Active Glow:** Focused or active elements emit a colored outer glow (`box-shadow`) matching the element's primary gradient color (e.g., a violet glow for primary buttons).

## Shapes

The shape language is **chunky and rounded**. Standard containers use a 0.5rem radius, but primary interactive elements and "Hero" cards use significantly more rounded corners (1rem to 1.5rem) to feel more approachable and "squishy." This softness contrasts with the aggressive, sharp letterforms of Bebas Neue.

## Components

- **Buttons:** Chunky, high-contrast blocks. Primary buttons use the Electric Violet gradient with white bold text. Secondary buttons are "Glass" style with a razor-thin Cyber Teal border.
- **Glow-Active States:** When a user interacts with a text input or button, the element should trigger a 15px-20px spread glow of its accent color.
- **Cards:** Glassmorphic containers with a subtle noise texture. They do not have shadows; they rely on the backdrop blur and thin borders to separate from the background.
- **Chips/Badges:** High-saturation, solid fills using Hot Coral or Neon Green. Text is black (Neutral-950) for maximum legibility on bright backgrounds.
- **Inputs:** Darker than the surface (Neutral-950 at 40% opacity), featuring a bottom-border-only focus state that transitions into a full Cyber Teal glow.
- **Gamification Elements:** Progress bars should be thick (12px+) and use the Neon Green gradient, reminiscent of Duolingo's vibrant feedback loops.
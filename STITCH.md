Design a full portfolio website for Jay Pancholi — Muggleborn Dev, a solo developer studio
based in Melbourne. Generate mockups for all 6 pages: Home, Work, Projects, Services,
About, and Contact.

I have already set the colour palette in this project. Use it exactly.
Dark mode is the primary experience. Light mode must also be fully designed.

---

IDENTITY
Brand: Muggleborn Dev (muggleborn.dev)
Person: Jay Pancholi, Full Stack Developer
Current employer: Exco Partners
Tone: Casual, dry, sarcastic developer with studio confidence. Not corporate. Not generic.
Naming theme: Harry Potter spells and places (Obliviate, Gringotts, Spellbook, etc.)

---

TYPOGRAPHY

- Headings / Display: Bricolage Grotesque — wide, confident, editorial
- Body / UI: Manrope — clean, readable
- Code / Tech tags: JetBrains Mono — used on tech stack pills, labels, terminal-style UI
- Hero display size: 72–88px, tight tracking
- Section titles: 40–48px
- Body: 16–18px

---

BACKGROUND TEXTURE
Every page surface uses a dot-grid: radial-gradient dots at 20px intervals.
Dark mode: near-black navy dots. Light mode: very subtle light grey dots.
This texture is universal — never remove it from any page.

---

ANIMATIONS (design for these — show states and motion intent in mockups)

1. Scroll-driven reveals: sections and cards animate in as they enter the viewport —
   fade up with slight Y translate, staggered per element
2. Cursor-reactive: hero section background or floating elements subtly shift/parallax
   based on mouse position. Think magnetic pull, not jitter
3. Text animations on hero: the rotating role ticker cycles through
   "Full Stack Developer", "UI Engineer", "Frontend Architect", "Problem Solver"
   with a typewriter or character-scramble effect
4. Page transitions: smooth fade or slide between routes, not instant
5. Card hover: border brightens to primary teal, subtle scale 1.02, shadow lifts

---

NAVIGATION
No traditional header. Instead: a floating dock fixed to the bottom centre of the screen —
inspired by the macOS dock and the v1 site.

Dock behaviour:

- Floats ~24px above the bottom edge, horizontally centred
- Contains icon buttons for each route: Home, Work, Projects, Services, About, Contact
  plus a theme toggle icon
- Icons magnify on hover (macOS dock magnification effect)
- Active route icon is highlighted with primary teal indicator dot or glow beneath it
- On mobile: dock shrinks slightly, icons remain tappable (min 44px target)

Glassmorphism treatment on the dock:

- Background: frosted glass — semi-transparent dark surface with backdrop-filter blur
- Dark mode: rgba(13, 13, 20, 0.6) + backdrop-filter: blur(20px) saturate(1.8)
- Light mode: rgba(255, 255, 255, 0.6) + backdrop-filter: blur(20px) saturate(1.8)
- Border: 1px solid rgba(255, 255, 255, 0.08) on dark / rgba(0,0,0,0.08) on light
- Subtle inner shadow and outer glow
- Pill-shaped: border-radius 999px
- Padding: 12px 20px
- Dock itself has a very subtle drop shadow beneath it

Apply glassmorphism consistently across:

- The floating dock
- Cards on hover or featured cards
- Modal and popover surfaces
- The "Currently at Exco Partners" badge on the hero
- Any floating UI element that overlays the dot-grid

---

PAGE 1: HOME (/)
Hero (full viewport height):

- Large Bricolage Grotesque display headline, cursor-reactive background
- Animated intro: "Bello, I'm Jay Pancholi" — name highlighted in primary teal pill/badge
- Rotating role ticker below: "I'm a [Full Stack Developer]" — text cycles with animation
- "Currently at Exco Partners" with arrow-up-right icon, orange accent badge (matching v1)
- Subtle scroll indicator at bottom

Below the fold:

- Brief studio statement (2–3 lines, Manrope, large body) — "We build fast, thoughtful
  digital products. No fluff."
- Featured projects preview: 2 large cards (Obliviate, Gringotts) — scroll-reveal stagger
- CTA strip: "See all work →" and "Get in touch →"

---

PAGE 2: WORK (/work)
Employment timeline — credibility section.

Timeline layout with scroll-driven reveals per entry.
Each job card expands on click/hover to show highlights.

Jobs (in order):

1. Exco Partners — Full Stack Developer — 2023–Present
   Key work: Fair Work Commission customer service platform, Dynamics 365, React, MUI
2. inlight — Full Stack Developer — 2021–2023
   Key clients: TAC, Solstice Energy, Make-A-Wish, Amplar Health, Vicinity, Nando's
3. Zash Ventures — Full Stack Developer — 2021–2022
4. C2 Capital — WordPress Developer — 2020–2021

Freelance section below:

- Whitefox (2021), My Little Tag (2019–2020)

Design: Vertical timeline spine with dot markers. Company name large, role in muted mono.
Date range in JetBrains Mono. Collapsed by default, expands to bullet highlights.

---

PAGE 3: PROJECTS (/projects)
Featured projects at top — hero treatment:

OBLIVIATE
One-time secret sharing app. Share sensitive info via a self-destructing link.
The link dies after it's read — one view, gone forever.
Hero card: full-width or large asymmetric layout. Dark, high-contrast.
Magic/spell theme: lean into the name — encrypted, mysterious, ephemeral.

GRINGOTTS
Finance management and invoice app.
Named after the Gringotts bank from Harry Potter.
Hero card: second featured slot, slightly smaller than Obliviate.
Theme: precision, numbers, trust.

Below: grid of other projects —

- Nobel Prize Search (React, Next.js, Fuse.js, Tailwind)
- Robot Simulation (React, TypeScript, Tailwind)
- 2048 (React, Redux, MUI)
- SkipTheSearch (TypeScript, VitePress)

Each card: project name, one-liner, tech stack pills in JetBrains Mono, live + GitHub links.
Grid: 2 columns desktop, 1 column mobile. Scroll-reveal stagger on cards.
Card hover: teal border glow, scale 1.02.

---

PAGE 4: SERVICES (/services)
What Muggleborn Dev offers. Not a pricing table. Not a feature checklist.

Services:

- Full Stack Development (React, Next.js, Node.js, TypeScript)
- Front-End / UI Engineering (component systems, Tailwind, accessibility, Storybook)
- CMS Integration (Sanity, WordPress, Craft, Storyblok)
- API Design & Integration (REST, OData, Express.js)
- Schema-Driven Applications (form-heavy, React Hook Form, Zod, validation-first)
- CRM & Platform Integration (Dynamics 365, Dataverse)

Layout: large service name in Bricolage Grotesque, short honest description in Manrope.
Scroll-reveal per service block. No icons if they feel generic — typography does the work.
Optional: subtle "what I enjoy vs what I'll do professionally" framing in copy.

---

PAGE 5: ABOUT (/about)
Smart CV. Human first, document second. Also printable (print view: white bg, no dot-grid,
single column, A4 portrait).

Two-column desktop layout:
LEFT SIDEBAR (1/3 width, sticky):

- Photo: jay.jpeg, square aspect ratio, rounded-xl
- Name: Jay Pancholi
- Title: Full Stack Developer
- Location: Melbourne (MapPin icon)
- Current: Exco Partners
- Skills grouped by category (not a flat tag dump):
  Front End | UI/Style | Testing | State | Back End | CMS | DB | DevOps | Tools
  Each skill rendered as a JetBrains Mono pill in muted fill

RIGHT MAIN (2/3 width, scrollable):

- Bio: "I'm Jay Pancholi, a Full Stack Developer based in Melbourne..."
  Personal: gaming, hiking, scuba diving, keyboard enthusiast, LazyVim + tmux
- Experience section (same data as /work but CV-format — concise, printable)
- Freelance section
- Education: Swinburne University — Master of Information Technology
- Contact links at bottom

Scroll-reveal on right column sections, sidebar sticks.
Print button visible — triggers browser print with clean A4 layout.

---

PAGE 6: CONTACT (/contact)
Short. Human. No gimmicks.

Headline: "Let's work together." or something with personality.
Short paragraph: 2 lines max.

Contact links (icon + label):

- Email: jaypancholi94@gmail.com
- Phone: +61 (0) 450 691 794
- LinkedIn: @jay-pancholi
- GitHub: @jaypancholi94
- Instagram: @_jaypancholi_

Optional: minimal contact form (Name, Email, Message, Send).
Layout: centred, generous whitespace, large contact link targets.
Cursor-reactive background element in hero area.

---

DESIGN PRINCIPLES

- Apple-level layout discipline applied to a dark developer aesthetic
- Spacious, editorial, confident — not crowded
- Primary teal accent used sparingly: CTAs, active states, key highlights only
- Every interactive element has a visible hover state
- Accessibility: sufficient contrast in both modes, focus rings visible
- No decorative gradients, no rainbow accents, no generic SaaS patterns
- Animations enhance — they never block or delay content
- Glassmorphism is a first-class surface treatment: frosted blur + semi-transparent
  backgrounds on the dock, floating cards, badges, and overlays — not a decoration,
  a consistent material language across the whole site
- No traditional top navigation bar anywhere on any page

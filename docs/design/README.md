# Portfolio design toolkit — Engineering Fieldbook

A working design proposal, isolated from the existing homepage. Open `/design` on the Vite development server. Templates and components are real React, not images of interfaces. No publishing or production homepage replacement is included.

## Research scope

Reviewed November 12, 2026. The supplied [developer-portfolios collection](https://github.com/emmabostian/developer-portfolios) reports 2,101 portfolios. The user approved a focused visual review instead of an exhaustive review. Four listed references were examined alongside four supplemental examples. Observations concern the current sites, not necessarily the versions originally submitted to the collection.

| Reference | Observed choice | Implication for this portfolio |
| --- | --- | --- |
| [Brittany Chiang](https://brittanychiang.com) | Dark split layout, persistent identity/navigation, clearly structured experience and project evidence | Consistent metadata and easy access to work; avoid copying the familiar visual skin |
| [Adham Dannaway](https://www.adhamdannaway.com) | Split portrait embodies the designer/developer positioning; direct navigation and latest work | One strong visual idea can communicate an identity faster than a list of adjectives |
| [Bruno Simon](https://bruno-simon.com) | Interactive explorable world with controls, quality options, and source documentation | The medium can demonstrate ability. Keep your own experiment optional and project links direct. Page text and controls were inspected; the live 3D render did not finish during review, so its full experience was not visually assessed |
| [Lee Robinson](https://leerob.com) | Editorial serif type, short/long bio control, writing index, personal illustration | Layer information by depth; a small amount of personal context can feel authored |
| [Lynn Fisher](https://lynnandtonic.com), supplemental | Expressive lettering and book-like index with dotted leaders | A distinctive system comes from consistent choices, even with very few elements |
| [Jhey Tompkins](https://www.jhey.dev), supplemental | Black canvas, prototype index, playful objects and signature | Interaction should connect to demonstrable craft |
| [Cassidy Williams](https://cassidoo.co), supplemental | Personal portrait, conversational writing | A professional site can sound human and specific |
| [Tania Rascia](https://www.taniarascia.com), supplemental | Sidebar navigation, concise timeline, article/demo/source paths | Separate the quick scan from deeper technical exploration |

These are design observations, not a recruiting study. The recruiter-oriented design hypothesis is: identity → evidence → depth → contact. Someone should be able to understand your focus, inspect credible work, identify your contribution, and reach you without learning a novel interface.

## Existing codebase diagnosis

React 19 / Vite / Tailwind. Profile content is centralized in `src/data/profile.js`, with existing article and visual components. Good raw material: specific domains, repositories, and quantitative results.

Presentation problems observed in source and the local page:

- About precedes all work and occupies a long paragraph; numerous 128px gaps delay the first project.
- Long research titles and descriptions have nearly equal visual weight; the original split grid leaves much of the right column sparse.
- Publication metadata lives in a separately measured, absolutely positioned rail, creating avoidable alignment complexity.
- The native cursor is hidden globally. Essential content starts invisible behind reveal animations. Fixed blur masks soften the reading surface.
- A draggable terminal adds interface complexity without demonstrating the strongest project work.
- Decorative pulsing bars do not explain evaluation results, baselines, units, or methods.
- The four existing items omit three substantial hackathon projects.

## Recommended direction

**Engineering Fieldbook**: a warm, precise record of research and things built. Cream paper, deep green ink, rust annotation, restrained sans-serif labels, editorial serif accents, and project-specific visual studies. The connecting theme is moving from signals and models to usable systems.

Use a conventional navigation system. Put selected work directly after the hero. Each project gets a short human explanation, one defensible evidence point, and a route into details. Avoid skill percentages, unsupported impact counts, decorative metric plots, full-screen introductions, and mandatory games.

### Tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f4f1e9` | Main canvas |
| Ink | `#182821` | Main text and primary action |
| Secondary ink | `#566159` | Body text and metadata |
| Rule | `#d4d7cc` | Structure and separation |
| Accent | `#a63d24` | Annotations, interaction, focus |
| Signal | `#d6e6ba` | Selected controls and restrained highlights |

Typography: Arial/Helvetica system sans for body and structure; existing Source Serif 4 italic for editorial emphasis; system sans for metadata; monospace is prohibited throughout the site. Fallbacks are explicit. Display 48–88px; section 32–48px; body 16–18px at 1.65; metadata 11–12px. Small 9–10px labels are decorative or secondary; essential prose stays readable.

Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Content width 1200px within a 1328px outer shell; prose roughly 65ch. Desktop two-column project grid, mobile single column. 1px rules, mostly square corners, no pervasive shadows.

Interactions: native cursor, visible keyboard focus, buttons for actions, links for destinations, 44px main controls, no essential hover-only content, no entrance-animation dependency, reduced-motion support. The hero includes an animated synthetic signal with noise attenuation and play/pause controls; reduced-motion users start paused. Project concept illustrations have accessible names and are explicitly labeled; replace them with actual media where available.

## Page templates

1. **Home:** identity and focus → selected work (Steady Hands, TERRA, Punchd, LARPbox) → additional robotics project → compact research → contact.
2. **Case study:** project premise, event, stack, source/demo → visual artifact → problem → system/decisions → evidence and limitations → individual contribution → contact. Steady Hands contains sourced team-level narrative; other projects intentionally show editorial slots where verified copy is missing.
3. **Research:** domain summary → HERMES/SELENE rows → research detail pattern with question, method, results, limits, citation/source.
4. **About/contact:** brief personal introduction → areas of interest → verified history/résumé when supplied → email, GitHub, LinkedIn.
5. **Components:** colors, type, spacing, buttons, tags, award badge, metrics, project cards, research rows, and media/motion rules.
6. **References:** on-screen research rationale and reference links.

## Component contracts

Exported from `src/design/DesignToolkit.jsx`:

| Component | Inputs | Purpose |
| --- | --- | --- |
| `Eyebrow` | children | Short section metadata |
| `Action` | href OR onClick, secondary, children | Destination link or semantic action button |
| `Tag` | children | Technology or context label |
| `SectionHeading` | number, title, children | Consistent heading + optional annotation |
| `SignalLab` | — | Animated synthetic signal with keyboard-accessible noise control and play/pause |
| `Metric` | value, label, note | Evidence with context; no invented scale |
| `ProjectVisual` | kind, large | Accessible abstract concept study |
| `ProjectCard` | item, onOpen | Subject, evidence, summary, stack, case-study entry |
| `ResearchRow` | item | Research question, reported result, source link |
| `ContactStrip` | — | Consistent contact section using profile data |
| `HomeTemplate` | onOpen | Landing-page composition |
| `ProjectTemplate` | item | Case-study composition |
| `ResearchTemplate` | — | Research index/detail composition |
| `AboutTemplate` | — | About/contact composition |

Styles are scoped to `.design-toolkit`; the body cursor/background override applies only while the preview is mounted. The preview loads dynamically at `/design` and uses hash navigation. Hashes select templates, but selected project state is session-local: refreshing a case study currently returns to the default Steady Hands example. Production should use real project routes with unique metadata and deep links.

## Content inventory and provenance

The search index initially exposed only Punchd. The live browser profile exposed **three projects** and all three detail pages were read. This distinction matters: search results were stale.

- [Steady Hands](https://devpost.com/software/steady-hands-80stdj): Cal Hacks 13.0; magnetic pen tracking, Three.js simulation, motion metrics, Claude debrief, Cartesia speech. Team-reported nine-point check: 2.8mm horizontal RMS, 0.4mm stationary jitter, 8.2mm overall 3D RMS. Present the depth limitation alongside the better horizontal result. These measurements do not demonstrate clinical training effectiveness. Source repository linked by Devpost: https://github.com/noiritgc/Steady-Hands.
- [Punchd](https://devpost.com/software/punchd): Midnight Hackathon August 2026 **Mobile Track winner**; privacy-preserving loyalty PWA. Strong case-study material: nullifiers, historic Merkle roots, one-time vouchers, explicit proof-server trust boundary and remaining timing-correlation limitation. Award applies to the team project.
- [LARPbox TV](https://devpost.com/software/larpbox-tv): Shower Hacks; 3–8 players, shared-screen host and private phone interfaces, React/TypeScript, Node/Express, Socket.IO. Interesting engineering topics: authoritative game stages, voting validation, private state, reconnect/draft recovery. Original page links https://larpbox-0myv.onrender.com/.
- TERRA, HERMES, SELENE, RRPathPlanner: carried over from existing portfolio data. Results have not been independently reproduced. Venue labels in the existing data do not establish acceptance/publication status; add verified citations before publication claims.

### Information needed before a public redesign

- Sai’s personal contribution and owned technical decisions for each team project.
- Current résumé asset, graduation date, and desired roles/availability.
- Verified research status, citation links, evaluation details and metric units.
- Actual screenshots, hardware photos, or short demo clips. Concept illustrations are not product captures.

Do not block a design review on these details; keep the editorial notes visible in the toolkit and replace them before launch.

## Run and validation

```sh
npm run dev -- --host 127.0.0.1
# Visit http://127.0.0.1:5173/design
npm run build
```

Build passed. Browser QA covered desktop home, all six template views, case-study anchor navigation, the signal slider via keyboard, play/pause, and overflow checks. Computed-font checks found zero monospace elements in all six views. Mobile CSS is implemented but browser viewport emulation did not take effect, so mobile visual verification remains outstanding. Preview screenshots live alongside this document. Production hosting must support SPA fallback for `/design`, as the development server does. No automated test suite was added for this isolated presentation proposal.

## Direction 02 — Playful Systems

Added as the default `/design` view after the user requested a more interactive alternative with specimen content only. The editorial direction remains available through the comparison control. Main site unchanged.

Dark canvas, acid/cobalt/coral palettes, oversized proportional sans-serif typography, a draggable connected type composition, motion pause/resume, reset, a live headline editor, expandable content, and selectable home/case-study/about composition studies. No new résumé or biographical content was added. Arrow keys move focused canvas elements. Reduced-motion preferences start motion paused.

Files: `src/design/Playground.jsx`, `src/design/playground.css`. Build passes. Desktop browser checks include keyboard movement, specimen text editing, palette selection, expandable sections, composition switching, and comparison navigation. Mobile styles are present; mobile visual QA remains outstanding.

## Sample revision — Project Lens

The supplied Aahil Khan reference was inspected in-browser (main site and canvas). Its useful principle was exploratory interaction. The new sample uses an original project lens rather than its grid/name treatment or draggable desktop metaphor.

`PortfolioSample.jsx` provides a pointer-following reveal, project tabs with arrow-key navigation, a compact index, and a project dialog with focus containment, Escape-to-close, and focus restoration. Touch users can select projects and open details without hover. Reduced motion disables the rotating ornament and pointer-following reveal. Only short existing project summaries appear; no résumé/current-role content was introduced. `ProjectVisual.jsx` was extracted to remove a circular dependency.

Build passed. Desktop browser verification covered project switching, dialog open/Escape close, and the index. Illustrations are conceptual, not actual product screenshots. Main site remains unchanged.

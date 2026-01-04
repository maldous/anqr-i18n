import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
export const examples: PageDefinition = {
  title: 'ANQR Examples',
  description: 'Five real-world, production-style examples that show where QR codes create measurable value: uplifting a legacy retail counter code, branded retail payments and "scan-to" actions, print scaling from flyers to billboards, animated QR for digital signage, and cross-lingual collaboration using shareable Anchor links. Each example includes images, practical constraints, and a remix link back to the generator.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Open the full User Guide', type: 'guide' },
  ],

  sections: [
    // Example 1: Uplift an Existing QR Campaign
    {
      heading: 'Uplift an Existing QR Campaign',
      paragraphs: ['You already have a QR code on the counter - maybe it lives in a plastic stand or a laminated folder that\'s been there since "COVID menu" days. It still works, but it doesn\'t look on-brand, it\'s hard to scan under real shop lighting, and it\'s doing nothing to invite new customers in. This example shows how to uplift that existing campaign by recreating the QR with modern safety settings and brand styling while keeping the destination URL identical.', 'Real-world retail uplift usually starts with one question: "Can we make scanning feel effortless again?" When a customer is juggling a coffee, a wallet, and a conversation, the QR has to work on the first attempt. A crisp, branded uplift isn\'t just aesthetics - it\'s reducing micro-friction at the exact moment you\'re asking for action (pay, join, review, or explore).'],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'Uplift an Existing QR Campaign',
          caption: 'You already have a QR code on the counter - maybe it lives in a plastic stand or a laminated folder that\'s been there since "COVID menu" days. It still works, but it doesn\'t look on-brand, it\'s hard to scan under real shop lighting, and it\'s doing nothing to invite new customers in. This example shows how to uplift that existing campaign by recreating the QR with modern safety settings and brand styling while keeping the destination URL identical.',
        },
      ],
    },
    {
      heading: 'The challenge',
      paragraphs: ['Legacy point-of-sale QR codes tend to be treated as permanent fixtures: printed once, laminated, and forgotten. Over time, they pick up glare, fingerprints, low-contrast printing, and sometimes a too-small quiet zone that makes scanning unreliable - exactly when a customer is in a hurry. If the code looks unofficial or generic, people hesitate to scan, which quietly reduces conversions and foot traffic.', 'Counter signage has awkward physics: overhead downlights create hotspots, laminated sleeves reflect the phone\'s screen, and the QR often sits at an angle behind other clutter. If you\'ve ever watched someone hover their phone for five seconds and then give up, you\'ve seen why reliability is marketing: every failed scan is a lost chance to convert.'],
      images: [
        {
          src: '/images/examples/uplift-before.png',
          alt: 'The challenge',
          caption: 'Legacy point-of-sale QR codes tend to be treated as permanent fixtures: printed once, laminated, and forgotten. Over time, they pick up glare, fingerprints, low-contrast printing, and sometimes a too-small quiet zone that makes scanning unreliable - exactly when a customer is in a hurry. If the code looks unofficial or generic, people hesitate to scan, which quietly reduces conversions and foot traffic.',
        },
      ],
    },
    {
      heading: 'The uplift strategy',
      paragraphs: ['Keep the same destination URL (so the customer journey doesn\'t change), but regenerate the QR with stronger error correction, a guaranteed quiet zone, and conservative brand styling. ANQR lets you add colour and an optional centre overlay while Safety Mode guards scannability - so you get a code that looks intentional, matches your signage, and still scans fast on real phones.', 'Because the destination stays the same, you can roll out the uplift safely: replace the counter stand first, then update menus/posters later, and nothing breaks. If you can\'t guarantee the destination will stay forever, introduce a short, branded redirect URL now and treat that as your long-term campaign anchor for future changes.', 'Don\'t waste the uplift by sending people to a dead-end page. Pair the QR with a landing experience that matches the sign: a quick menu, a loyalty prompt, a "pay now" button, or a limited-time offer that feels worth scanning. The uplift works best when the sign, the QR, and the landing page all tell the same story.'],
      images: [
        {
          src: '/images/examples/uplift-after.png',
          alt: 'The uplift strategy',
          caption: 'Keep the same destination URL (so the customer journey doesn\'t change), but regenerate the QR with stronger error correction, a guaranteed quiet zone, and conservative brand styling. ANQR lets you add colour and an optional centre overlay while Safety Mode guards scannability - so you get a code that looks intentional, matches your signage, and still scans fast on real phones.',
        },
      ],
    },
    {
      heading: 'Step-by-step',
      paragraphs: ['Start with the exact URL currently encoded in your old QR. Then apply a conservative brand uplift: strengthen reliability first (quiet zone, error correction), add style second (colour/overlay), and validate last (test across devices and lighting).', '1 - Extract the exact URL from the existing QR and paste it into ANQR (this keeps your campaign behaviour unchanged).', '2 - Enable Safety Mode, set a minimum quiet zone, and choose Error Correction H for resilience against glare, scratches, and imperfect capture.', '3 - Apply brand styling conservatively: keep contrast high, avoid busy backgrounds, and keep any centre overlay small and centred.', '4 - Export the right format: SVG for print workflows; PNG only if you export at the final size and never scale up later.', '5 - Print one proof, test-scan in the real spot (day/night lighting), then commit to the final print run or signage update.', '6 - Lock the configuration by sharing the Anchor link internally so future reprints and variants stay consistent.'],
    },
    {
      heading: 'Why it works',
      paragraphs: ['You\'re not changing what the QR does - you\'re changing how confidently people will scan it. A clean, branded, well-sized code signals legitimacy, reduces friction at the counter, and makes the QR feel like part of your storefront experience instead of an afterthought. Safety Mode helps you avoid the common trap of "pretty but fragile" QRs that fail on older phones or under harsh lighting.', 'A well-executed uplift can also improve foot traffic because it makes the QR feel like an invitation, not a demand. When your window sign and counter sign look cohesive, customers are more likely to scan out of curiosity - especially if the value is clear (specials, booking, loyalty, or a quick pay flow).', 'Operationally, the uplift creates a single source of truth. Staff no longer reprint from screenshots, and designers no longer "rebuild" the QR from scratch. That consistency prevents subtle breakages and keeps your QR presence professional across every touchpoint.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: 'Recreate in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 2: Branded Retail Payments
    {
      heading: 'Branded Retail Payment QR',
      paragraphs: ['Retail payment QR codes live in the highest-pressure environment: the customer is ready to pay, there\'s a queue behind them, and every extra second feels expensive. At the same time, that payment moment is prime real estate for your brand - and for other "scan-to" actions like reviews, loyalty sign-ups, receipts, or hiring. This example shows how to keep payment scanning fast while still presenting a polished, on-brand QR experience.', 'A useful mental model: payment QRs are for speed; branded "scan-to" QRs are for choice. If you try to make one QR do everything, you risk slowing down the one journey that must be instant. Instead, keep payments clean and add a second QR nearby for jobs, reviews, receipts, loyalty, or social - all styled consistently.'],
      images: [
        {
          src: '/images/examples/retail-payments-overview.png',
          alt: 'Branded Retail Payment QR',
          caption: 'Retail payment QR codes live in the highest-pressure environment: the customer is ready to pay, there\'s a queue behind them, and every extra second feels expensive. At the same time, that payment moment is prime real estate for your brand - and for other "scan-to" actions like reviews, loyalty sign-ups, receipts, or hiring. This example shows how to keep payment scanning fast while still presenting a polished, on-brand QR experience.',
        },
      ],
    },
    {
      heading: 'The challenge',
      paragraphs: ['Many stores end up with a mix of QR codes: a bank-provided black-and-white payment code, a separate code for tips, a third for the menu, and a fourth for Instagram. They work, but they look inconsistent and often scan slowly because they\'re printed too small, covered in glare, or placed where customers can\'t comfortably scan. Worse, staff sometimes reprint "from a screenshot", accidentally degrading quality.', 'The fastest way payment QR campaigns degrade is duplication: the original bank code, a resized version for the menu, a photo in a staff group chat, and a screenshot in Canva. Each copy loses quality and consistency. The customer sees the chaos, even if they can\'t articulate it - and trust is the first thing that disappears when you ask people to scan at the counter.'],
      images: [
        {
          src: '/images/examples/retail-payments-before.png',
          alt: 'The challenge',
          caption: 'Many stores end up with a mix of QR codes: a bank-provided black-and-white payment code, a separate code for tips, a third for the menu, and a fourth for Instagram. They work, but they look inconsistent and often scan slowly because they\'re printed too small, covered in glare, or placed where customers can\'t comfortably scan. Worse, staff sometimes reprint "from a screenshot", accidentally degrading quality.',
        },
      ],
    },
    {
      heading: 'The solution',
      paragraphs: ['Use ANQR\'s payment templates (where available) so the encoded payload stays compliant, then apply only safe branding - subtle colour, generous quiet zone, and a restrained centre overlay. If you also want hiring, reviews, or loyalty, consider pairing the payment QR with a separate branded "scan-to" QR, or use a single landing page that offers multiple actions while keeping the payment flow clean and predictable.', 'For hiring and other actions, you can create a campaign landing page that is easy to update without changing the printed QR. That gives you a rotating "Scan here to apply" or "Scan for today\'s special" without reprinting signage every week - while still keeping the payment QR dedicated to payments.'],
      images: [
        {
          src: '/images/examples/retail-payments-after.png',
          alt: 'The solution',
          caption: 'Use ANQR\'s payment templates (where available) so the encoded payload stays compliant, then apply only safe branding - subtle colour, generous quiet zone, and a restrained centre overlay. If you also want hiring, reviews, or loyalty, consider pairing the payment QR with a separate branded "scan-to" QR, or use a single landing page that offers multiple actions while keeping the payment flow clean and predictable.',
        },
      ],
    },
    {
      heading: 'Design constraints',
      paragraphs: ['Payment apps are less forgiving than generic scanners. Prioritise instant recognition: high contrast, minimal distortion, no busy backgrounds, and no edits to finder patterns. Keep the printed code large enough to scan in one try from arm\'s length, and assume the worst lighting (nighttime, bright sun through a window, reflective laminate).', 'If you\'re using a payment standard, don\'t "beautify" it beyond recognition. Keep finder patterns untouched, avoid rounded module shapes if your target app is strict, and test with the real payment apps. Some apps will reject a code that a camera scanner happily decodes.'],
    },
    {
      heading: 'Recommended settings',
      paragraphs: ['Default to Error Correction H, a quiet zone of at least 4 modules, and conservative overlay coverage. If you\'re printing for a counter, treat 3–5 cm as a minimum and scale up if the sign will sit behind glass or in a dim corner. Test with the exact apps your customers use - bank apps and wallet apps - not just a camera scanner.', 'Treat the physical sign like a product: place it where a phone can focus (not too close, not too far), keep it upright, and avoid reflective acrylic if possible. A slightly larger, matte sign almost always outperforms a small glossy one, even if the small glossy sign looks nicer on day one.'],
    },
    {
      heading: 'Why this approach works',
      paragraphs: ['This approach keeps the payment payload compliant while still giving you a cohesive brand presence. Customers scan faster when the code is physically easy to capture and visually trustworthy; staff make fewer mistakes when there\'s one "approved" master configuration to reprint. You can then add additional branded "scan-to" codes nearby (jobs, reviews, loyalty) without compromising the payment experience.', 'When payment scanning is fast, customers feel in control - and that positive feeling rubs off on your brand. You can then layer marketing opportunities around it (reviews, loyalty, jobs) without adding friction to the payment moment.'],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Recreate in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 3: Print Scaling
    {
      heading: 'Print scaling: from flyers to billboards',
      paragraphs: ['Large-format printing is where QR codes most often fail - not because the data is wrong, but because the artwork is. If a QR is exported as a small PNG and later scaled up in design software, the crisp edges turn into blur and aliasing, which can destroy scan reliability at distance. This example demonstrates why vector export matters and how to choose outputs that stay sharp from 5 cm stickers to multi-metre signage.', 'Print scaling isn\'t just about resolution - it\'s also about real scanning distance. A QR on a billboard might be technically perfect but still useless if it\'s too small for the distance people stand. As a practical rule of thumb, increase physical QR size as distance increases, and favour simpler payloads (shorter URLs) so the code stays less dense.'],
      images: [
        {
          src: '/images/examples/print-scaling-overview.png',
          alt: 'Print scaling: from flyers to billboards',
          caption: 'Large-format printing is where QR codes most often fail - not because the data is wrong, but because the artwork is. If a QR is exported as a small PNG and later scaled up in design software, the crisp edges turn into blur and aliasing, which can destroy scan reliability at distance. This example demonstrates why vector export matters and how to choose outputs that stay sharp from 5 cm stickers to multi-metre signage.',
        },
      ],
    },
    {
      heading: 'The challenge',
      paragraphs: ['A common workflow is "design small, scale later": someone drops a QR image into a poster, then a week later the poster becomes a banner, and the QR is stretched to fit. The result can look acceptable to the eye but fails in phone cameras because the module edges are no longer clean. At scale, tiny defects compound - and you only discover it after printing hundreds of dollars\' worth of signage.', 'If you\'re printing at scale, ask for a proof and scan it before approving the run. Don\'t rely on on-screen previews or vendor assurances. Printing introduces variables (ink spread, substrate texture, finishing) that can push a borderline QR over the edge.'],
      images: [
        {
          src: '/images/examples/print-scaling-before.png',
          alt: 'The challenge',
          caption: 'A common workflow is "design small, scale later": someone drops a QR image into a poster, then a week later the poster becomes a banner, and the QR is stretched to fit. The result can look acceptable to the eye but fails in phone cameras because the module edges are no longer clean. At scale, tiny defects compound - and you only discover it after printing hundreds of dollars\' worth of signage.',
        },
      ],
    },
    {
      heading: 'PNG at poster size',
      paragraphs: ['A low-resolution PNG scaled up introduces softened edges and uneven module shapes. Phones interpret that softness as noise, especially under reflections or at distance, so scan time increases or fails entirely. If you must use PNG, you need to export at final size (or larger) so you never scale up after the fact.', 'If your workflow forces PNG, export larger than you need and scale down in layout - never the other way around. Scaling down preserves crisp edges; scaling up invents pixels and creates blur. Also avoid lossy formats (JPEG) and avoid "optimisation" tools that recompress images.'],
      images: [
        {
          src: '/images/examples/print-scaling-png.png',
          alt: 'PNG at poster size',
          caption: 'A low-resolution PNG scaled up introduces softened edges and uneven module shapes. Phones interpret that softness as noise, especially under reflections or at distance, so scan time increases or fails entirely. If you must use PNG, you need to export at final size (or larger) so you never scale up after the fact.',
        },
      ],
    },
    {
      heading: 'SVG at poster size',
      paragraphs: ['SVG keeps module edges mathematically precise, so the QR remains crisp at any size. That precision is what matters for reliable scanning: sharp contrast boundaries, consistent module geometry, and a stable quiet zone. For professional print workflows, SVG also reduces the risk of accidental recompression compared to raster images.', 'SVG also makes brand governance easier: you can store a single master QR asset and reuse it across every campaign format without generating a new file each time. That reduces mistakes and keeps your QR consistent across flyers, posters, packaging, and signage.'],
      images: [
        {
          src: '/images/examples/print-scaling-svg.png',
          alt: 'SVG at poster size',
          caption: 'SVG keeps module edges mathematically precise, so the QR remains crisp at any size. That precision is what matters for reliable scanning: sharp contrast boundaries, consistent module geometry, and a stable quiet zone. For professional print workflows, SVG also reduces the risk of accidental recompression compared to raster images.',
        },
      ],
    },
    {
      heading: 'Export workflow',
      paragraphs: ['Use SVG when you can, and treat the QR like a critical asset: export once, lock it, and reuse it. When handing artwork to a designer or print shop, supplying an SVG (and a PDF proof) prevents "helpful" resizing that breaks scannability.', '1 - Export SVG from ANQR and place it into your design tool (Figma/Illustrator/InDesign) at the final intended size.', '2 - Ensure the quiet zone stays clear: no frames, patterns, or crop marks intruding into the margin.', '3 - If the QR sits on photography or texture, add a solid backing shape behind it (light background, sharp edges).', '4 - Request a PDF proof from the printer, then scan the proof from the real distance and angle.', '5 - Lock the approved asset (and the generator share link) so reprints use the same source of truth.'],
    },
    {
      heading: 'When to use high-res PNG',
      paragraphs: ['High-resolution PNG can still work when a workflow requires raster (some platforms, older signage systems, or specific export pipelines). The rule is simple: export at the final physical size and DPI so you never scale up later. If you\'re unsure, export bigger than needed and scale down - scaling down is safe; scaling up is where quality dies.', 'Use PNG when the destination platform is raster-only (some ad networks, certain signage CMS tools, legacy systems). In those cases, export at final size and keep a "print master" folder so nobody accidentally reuses a tiny social-media PNG for a banner.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Recreate in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 4: Animated Signage
    {
      heading: 'Animated Signage QR',
      paragraphs: ['Animated QR codes can be powerful on screens because motion pulls the eye - especially on busy digital signage where static elements blend into the background. But animation is also where QR codes can become fragile: too fast, too flashy, or too much distortion and scanners give up. This example focuses on animation that is attention-grabbing without sacrificing reliability.', 'For digital signage, motion is attention. A subtle animated QR can increase scans simply because people notice it sooner, and that can translate into real business outcomes: more menu views, more sign-ups, more foot traffic into the store. The key is using animation as a spotlight, not as decoration that degrades the QR.'],
      images: [
        {
          src: '/images/examples/animated-signage-overview.png',
          alt: 'Animated Signage QR',
          caption: 'Animated QR codes can be powerful on screens because motion pulls the eye - especially on busy digital signage where static elements blend into the background. But animation is also where QR codes can become fragile: too fast, too flashy, or too much distortion and scanners give up. This example focuses on animation that is attention-grabbing without sacrificing reliability.',
        },
      ],
    },
    {
      heading: 'The challenge',
      paragraphs: ['Digital signage is competitive space. A static QR in the corner often becomes invisible, yet making it "more exciting" can accidentally make it unscannable. Screen brightness, refresh rate, moiré patterns from LED panels, and even video compression can introduce artefacts that don\'t exist in print. You need animation that survives real hardware, not just a desktop preview.', 'Screens introduce their own failure modes: LED pixel grids can create moiré, cheap players can drop frames, and heavy compression can smear edges. If the QR looks even slightly fuzzy on the screen, assume scan performance will drop - and fix size/contrast/format before you chase more creative effects.'],
      images: [
        {
          src: '/images/examples/animated-signage-before.png',
          alt: 'The challenge',
          caption: 'Digital signage is competitive space. A static QR in the corner often becomes invisible, yet making it "more exciting" can accidentally make it unscannable. Screen brightness, refresh rate, moiré patterns from LED panels, and even video compression can introduce artefacts that don\'t exist in print. You need animation that survives real hardware, not just a desktop preview.',
        },
      ],
    },
    {
      heading: 'Safe animation approach',
      paragraphs: ['Keep the QR readable in every frame. That usually means subtle motion (pulse, shimmer, gentle pattern transitions) that preserves finder patterns, module geometry, and contrast. Think "inviting movement", not "special effect". The goal is to improve discoverability while keeping scan time predictable.', 'The safest animated QRs preserve structure and vary only small visual aspects (a gentle pulse in the background, a slight pattern emphasis, or a calm shimmer). Avoid rotations, perspective warps, and anything that changes the relationship between modules.'],
      images: [
        {
          src: '/images/examples/animated-signage-after.png',
          alt: 'Safe animation approach',
          caption: 'Keep the QR readable in every frame. That usually means subtle motion (pulse, shimmer, gentle pattern transitions) that preserves finder patterns, module geometry, and contrast. Think "inviting movement", not "special effect". The goal is to improve discoverability while keeping scan time predictable.',
        },
      ],
    },
    {
      heading: 'Recommended settings',
      paragraphs: ['Use slower frame timing (around 200–300 ms per frame or slower), high error correction, and conservative styling. Avoid rapid flicker, heavy colour cycling, or transformations that bend modules. Always test on the actual signage display: what scans on a laptop may fail on an LED wall.', 'If your goal is advertising uplift, keep the loop short and readable. A 4–8 second loop that repeats is usually enough for people walking past, while still giving scanners time to lock on. If the screen content changes faster than the scan, slow it down or isolate the QR in a stable panel.'],
    },
    {
      heading: 'Format and delivery',
      paragraphs: ['For most signage players, GIF is the simplest delivery format, but it has colour limits and can create banding. If your player supports modern video formats, short loops (e.g., MP4/WebM) can look cleaner while preserving crisp edges - as long as compression settings don\'t blur the modules. Whatever you choose, keep the QR large enough that a customer can scan without hunting for focus.', 'If your signage CMS re-encodes uploads, prefer the format that survives it. Sometimes that\'s GIF; sometimes a short MP4; sometimes it\'s actually a static PNG because the system destroys animation fidelity. Your testing should include the full upload → playback → scan chain.'],
    },
    {
      heading: 'Placement on screens',
      paragraphs: ['Place the QR where a person can comfortably stand, hold a phone, and scan without blocking foot traffic. Give it enough on-screen time (several seconds) and avoid overlapping it with changing background content. If you pair it with a call-to-action, keep that text outside the QR artwork itself and maintain strong contrast around the code.', 'The most effective signage QRs are paired with an obvious offer or outcome: "scan for today\'s special", "scan to join the queue", "scan for directions", or "scan to claim a bonus". Your QR becomes a mini call-to-action inside the ad - and ANQR helps you keep that call-to-action reliable and consistent.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Recreate in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 5: Cross-lingual Collaboration
    {
      heading: 'Cross-Lingual QR Collaboration',
      paragraphs: ['When teams work across languages, QR projects often degrade into screenshots, copy/pasted settings, and "close enough" recreations that drift over time. ANQR\'s shareable Anchor links solve that: the configuration lives in a URL, so anyone can open the exact same QR setup, regardless of their interface language, and export identical results. This is especially useful when a designer, marketer, and developer are all touching the same campaign.', 'Cross-lingual collaboration becomes valuable the moment more than one person touches the QR: a designer adjusting aesthetics, a marketer changing landing copy, and an ops person needing a print re-run. Anchor links turn the QR configuration into a shareable artefact that can live in tickets, briefs, and documentation.'],
      images: [
        {
          src: '/images/examples/collaboration-overview.png',
          alt: 'Cross-Lingual QR Collaboration',
          caption: 'When teams work across languages, QR projects often degrade into screenshots, copy/pasted settings, and "close enough" recreations that drift over time. ANQR\'s shareable Anchor links solve that: the configuration lives in a URL, so anyone can open the exact same QR setup, regardless of their interface language, and export identical results. This is especially useful when a designer, marketer, and developer are all touching the same campaign.',
        },
      ],
    },
    {
      heading: 'The challenge',
      paragraphs: ['In real campaigns, the risk isn\'t just translation - it\'s configuration drift. One person changes error correction, another tweaks colours, someone else forgets the quiet zone, and suddenly you have multiple "official" QRs floating around. For global teams, the problem multiplies: different locales, different tooling, and different assumptions about what settings matter.', 'Without a single source of truth, teams often "solve" translation by sending screenshots - but screenshots hide the settings that matter. You lose error correction, quiet zone enforcement, output format choices, and any safety checks. Over time, each locale drifts into its own version of the campaign.'],
      images: [
        {
          src: '/images/examples/collaboration-before.png',
          alt: 'The challenge',
          caption: 'In real campaigns, the risk isn\'t just translation - it\'s configuration drift. One person changes error correction, another tweaks colours, someone else forgets the quiet zone, and suddenly you have multiple "official" QRs floating around. For global teams, the problem multiplies: different locales, different tooling, and different assumptions about what settings matter.',
        },
      ],
    },
    {
      heading: 'The solution',
      paragraphs: ['Use a single, approved master configuration link. Team members open it in their preferred language, but the underlying QR settings stay locked to the link. That means branding, safety settings, output format, and payload structure remain consistent - and you can review changes by sharing a new versioned link when you intentionally update the campaign.', 'With a master share link, the campaign becomes reproducible. Anyone can open it, export the required format, and be confident it matches the approved settings. That reduces review overhead and prevents last-minute surprises like a payment app rejecting the code on launch day.'],
      images: [
        {
          src: '/images/examples/collaboration-after.png',
          alt: 'The solution',
          caption: 'Use a single, approved master configuration link. Team members open it in their preferred language, but the underlying QR settings stay locked to the link. That means branding, safety settings, output format, and payload structure remain consistent - and you can review changes by sharing a new versioned link when you intentionally update the campaign.',
        },
      ],
    },
    {
      heading: 'How it works',
      paragraphs: ['A share link contains the full QR configuration. Open it and you\'ll see the generator pre-filled exactly as intended - ready to export, remix, or hand off to another team member.', '1 - Build the master configuration once (payload + safety + styling + output defaults).', '2 - Share the Anchor link in the campaign brief, and treat it as the authoritative source for reprints and variants.', '3 - Recipients open the link with their preferred language parameter; only the UI changes, not the QR payload.', '4 - Export required variants (SVG for print, PNG for web, GIF/video for signage) from the same link to prevent drift.', '5 - When you intentionally change the campaign, publish a new link version and retire the old one with a clear note.'],
    },
    {
      heading: 'Language parameter',
      paragraphs: ['Share links can include a language parameter so the interface loads in the recipient\'s locale. This changes menus and labels for the human, not the encoded QR payload - the code itself remains identical across languages.', 'If you\'re working with agencies or contractors, the language parameter is also a trust-building tool: it removes friction for the recipient while keeping the technical configuration unchanged. That means fewer mistakes, faster turnaround, and a cleaner audit trail of what was actually approved.'],
    },
    {
      heading: 'Collaboration workflow',
      paragraphs: ['Create a master link for the campaign (brand styling + safety settings + output format). Store that link in your brief, ticket, or style guide. When someone needs a new export (SVG for print, GIF for signage, PNG for social), they use the same master link so the QR stays consistent. If you update the campaign, publish a new master link intentionally and retire the old one - no more mystery screenshots.', 'A simple governance pattern works well: one master link per campaign, stored in a shared document; one person responsible for publishing updates; and a "do not edit without approval" note. It sounds formal, but it saves time the first time you need a reprint under pressure.', 'This is also a marketing advantage: consistent QR styling across markets makes the brand feel coherent globally, even when the surrounding copy is localised. People trust what looks official, and trust is what makes scanning a default behaviour instead of a risky choice.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Recreate in Generator',
          type: 'generator',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Open the full User Guide', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: 'Open the gallery', type: 'gallery' },
  ],
};

# Content and Appearance Customization

## Content

| What to change | Location | Method |
| --- | --- | --- |
| Heading lines | `frontend/src/components/Hero.js` | Edit the `lines` array and additional `MaskedLine` |
| Recipient | `frontend/src/components/Hero.js` | Edit the `data-testid="hero-name"` element |
| Letter | `frontend/src/components/Letter.js` | Edit the `paragraphs` array; each string produces one paragraph |
| Closing message and sender | `frontend/src/components/Signature.js` | Edit the closing sentence and signature text |
| Browser tab title and description | `frontend/public/index.html` | Edit `<title>` and the meta description |

Keep JavaScript string syntax valid and save files as UTF-8 to preserve emoji and Chinese characters. When changing only the design, preserve the string contents and paragraph boundaries.

## Appearance and animations

- **Background palette:** mesh `color`/`colorB`, lights, and the Canvas background in `AuroraBackground.js`; the body color is also in `App.css`.
- **Glass cards:** radius, transparency, blur, borders, and shadows in `GlassCard.js`. Section padding is set where the card is used in `Hero.js` or `Letter.js`.
- **Typography:** `.font-heading`, `.font-apple`, and `.font-signature` in `App.css`. Caveat loads from Google Fonts.
- **Width and spacing:** Tailwind classes such as `max-w-lg`, padding, `space-y-7`, and the `sm:` breakpoint in the content components.
- **Text animations:** the `initial`, `animate`, `whileInView`, and `transition` properties in each component.
- **Smooth scrolling:** Lenis configuration in `App.js`.
- **Sparkles:** count, size, distance, and cleanup timing in `TapSparkles.js`; the `burst` keyframe in `App.css`.
- **Rendering workload:** Sparkles counts, sphere segments, and Canvas DPR in `AuroraBackground.js`.

Component filenames above are relative to `frontend/src/components/`; `App.js` and `App.css` are in `frontend/src/`.

## Update workflow

Content is compiled with the frontend. Changing the letter requires rebuilding and publishing again; there is no editor dashboard or remote content source. Do not place secrets in components or frontend environment variables because the output is readable by the browser.

Emergent and PostHog integrations are in `public/index.html`; external fonts are referenced in the HTML and `App.css`. Integration changes should be checked in a production build.

After editing, follow the [change verification steps](DEVELOPMENT.md#verifying-changes).

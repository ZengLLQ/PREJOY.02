# Development Guide

## Setup

Use Node.js compatible with the dependencies in `frontend/package.json` and Yarn Classic 1.22.22. The repository has no `.nvmrc` or `engines` declaration to pin Node. The browser needs JavaScript and WebGL for the 3D background. Python/MongoDB is only required for the [optional backend](BACKEND.md).

From the project root:

```powershell
cd frontend
yarn install --frozen-lockfile
yarn start
```

The default server is at [localhost:3000](http://localhost:3000). Stop it with `Ctrl+C`. Use the existing Yarn lockfile and avoid mixing in an npm lockfile. Installation downloads the visual editing package from the tarball URL in the manifest.

## Architecture

`src/index.js` mounts `App` into the `root` element. `App` runs Lenis through `requestAnimationFrame`, mounts the background and tap effects, then renders `Hero`, `Letter`, and `Signature`. The animation loop and Lenis instance are cleaned up when the component unmounts.

| Component | Responsibility |
| --- | --- |
| `Hero.js` | Opening text, recipient name, parallax, scroll hint |
| `Letter.js` | Content array and paragraph reveal animations |
| `Signature.js` | Closing message and signature |
| `GlassCard.js` | Glass cards and spring-based mouse tilt |
| `AuroraBackground.js` | 3D scene, camera, materials, and particles |
| `TapSparkles.js` | Sparkles on pointerdown events |

These components are in `frontend/src/components/`. The background reads the scroll position through a ref and updates colors, rotation, and the camera each frame. The page does not mount a router or fetch content from an API. Not all additional dependencies and `ui/` components are used by the active page.

## Configuration

| Location / variable | Purpose |
| --- | --- |
| `craco.config.js` | Alias `@` to `src`, hook linting, webpack-dev-server 5 compatibility |
| `tailwind.config.js` | Tailwind configuration |
| `jsconfig.json` | Editor import resolution |
| `ENABLE_HEALTH_CHECK=true` | Webpack health check plugin and development server endpoints |
| `PORT` | Development server port |
| `PUBLIC_URL` | Asset base URL when building for a subpath |

To change the port in PowerShell, run from `frontend`:

```powershell
$env:PORT = '3001'
yarn start
```

After stopping the server, remove the override with `Remove-Item Env:PORT`. The current frontend page does not require `.env` or `REACT_APP_*` variables. Git ignores `.env` files.

The visual editing wrapper loads only in development mode. External scripts in `public/index.html` remain part of the production HTML.

## Build and hosting

Run `yarn build` from `frontend`. Configure the hosting project directory as `frontend`, the installation command as `yarn install --frozen-lockfile`, the build command as `yarn build`, and the publish directory as `build`. If the service runs commands from the repository root, adjust the directory change and use `frontend/build` as the publish output.

For a subpath deployment, set `PUBLIC_URL` before building and verify asset URLs at the actual location. Serve the output over HTTP; opening `public/index.html` through `file://` does not run the application. The current letter page does not require a deployed backend.

## Verifying changes

For application changes, run a build and check the browser:

1. The opening section, seven paragraphs, and signature are complete, including emoji and non-Latin characters.
2. Text is readable on mobile and desktop without horizontal scrolling.
3. Scroll progress, paragraph reveals, the background, mouse tilt, and tap sparkles work.
4. The console has no application errors and the hosted build loads its assets.

`yarn test` is available, but the repository does not yet contain frontend test cases. The root `tests/` directory contains only `__init__.py`; the backend has pytest configuration, not an implementation test suite. `test_result.md` is a historical record.

For documentation changes, check commands and paths against the code, validate local links, and run `git diff --check`. A successful build alone does not establish correct animations or accessibility. The code does not yet provide a dedicated WebGL fallback or reduced-motion preference handling.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `package.json` not found | Switch to the `frontend` directory |
| `craco` not found | Install dependencies from `frontend` |
| Port 3000 is occupied | Use a different `PORT` |
| Visual editing package download fails | Check access to the tarball host listed in the manifest |
| Background fails or runs slowly | Check WebGL, hardware acceleration, the console, DPR, and particle counts |
| Signature font looks different | Check Google Fonts access; a cursive fallback is available |
| Backend fails because of environment variables | Set `MONGO_URL` and `DB_NAME` before starting the server |

Return to the [README](../README.md).

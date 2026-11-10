# Farewell Michelle Frontend

A single-page React application for a personal letter with 3D animations.

## Commands

Run from the `frontend` directory with Yarn Classic 1.22.22:

```powershell
yarn install --frozen-lockfile
yarn start
yarn build
```

`start` runs the development server on port 3000 by default. `build` produces the `build/` directory. The `yarn test` script is available, but the repository does not yet include frontend test cases.

The `@/` alias points to `src/`. The frontend does not need `.env` to display the letter and does not currently call the backend.

## Guides

- [Project README](../README.md)
- [Development and architecture](../docs/DEVELOPMENT.md)
- [Content and appearance customization](../docs/CUSTOMIZATION.md)
- [Optional backend](../docs/BACKEND.md)

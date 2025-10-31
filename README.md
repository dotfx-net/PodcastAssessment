# Podcast Web App: React Tech Assessment

A small single‑page application (SPA) to browse and listen to podcasts. The app includes:
- Home view (podcast list)
- Podcast details (episodes list)
- Episode details

Client-side routing is used exclusively; the page never does a full reload.

---

## Environments & Build Modes

- **Development**: serves **non‑minimized** assets to aid debugging.
  - **WSL note**: my local setup is WSL with file‑watcher **polling** enabled to avoid inotify limitations. This does **not** affect regular macOS/Linux/Windows environments; it's a local dev optimization only.
- **Production**: outputs **concatenated and minimized** assets for optimal load time.

> Tooling choice: The assessment requested **Webpack 5**. I used Webpack even though a Vite setup could have been simpler and faster for DX.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Pure CSS** (no utility framework)
- **Webpack 5** (dev server + production build)
- **React Router 6+**
- **Jest** + **React Testing Library** for component tests
- **State**: [Zustand] for lightweight state + simple cache/TTL layer

---

## Requirements

- **Node.js** ≥ 19
- **npm**

---

## Getting Started

Install dependencies:
```bash
npm install
```

Run in development (non‑minified assets, changed files are automatically recompiled):
```bash
npm run dev
```

Build for production (minimized assets):
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

Run unit tests:
```bash
npm test
```

---

## Testing

- **Jest** + **React Testing Library** focus on behavior over implementation details.
- Tests live alongside components under `*.test.tsx`.
- Example coverage: rendering, routing, list/empty states, interactions.

Run:
```bash
npm test
```

---

## Design Decisions & Trade‑offs

- **Webpack 5 vs Vite**: Vite would offer faster HMR and simpler config. Webpack 5 was chosen to match the assessment request; the configuration emphasizes clarity and fast rebuilds where possible.
- **Pure CSS**: keeps the bundle lean and avoids CSS-in-JS overhead. For larger design systems, a small utility layer could be introduced.
- **Client‑only SPA**: keeps infra simple.

---

## Optimizations (Future Work)

1. **Virtualized list** for long podcast lists using **@tanstack/virtual** to minimize DOM nodes and improve scroll performance.
2. **Service Worker middleware** to intercept **and cache** podcast API responses differently from the UI state cache—e.g., stale‑while‑revalidate strategy, versioned precache, background sync.
3. **Move TTL to a backend**: introduce a tiny proxy that calls the third‑party API, applies **server‑side cache + TTL**, and serves normalized responses. This reduces client complexity and stabilizes rate limits.
4. **Code‑splitting** by route and critical‑CSS extraction to reduce initial payload.
5. **E2E tests** (Playwright/Cypress) for navigation and regressions.

---

## Additional Technical Notes (Assessment Context)

> **No `create-react-app` or similar boilerplates** were used.
> The goal was to configure everything **from scratch**: build, dev server, testing, and optimizations: to demonstrate a clear understanding of project setup and bundling.

### Architecture

The project follows a **feature-based folder structure** inspired by **hexagonal architecture** principles:

- **Domain layer**: entities, models, and business logic encapsulated as classes or types.
- **Application layer**: services that handle data fetching, caching, and transformation (e.g., podcast service using Zustand).
- **UI layer**: React components consuming domain models and services.

This separation improves testability and mirrors **DDD** (Domain-Driven Design) concepts, helping maintain clarity between **core logic** and **framework adapters**.

### TypeScript

All source code is written in **TypeScript**, leveraging strong typing to ensure code safety, better IDE support, and more reliable refactors.
TypeScript is used across the entire stack: from components to domain models and tests.

### CSS

The project uses **pure native CSS**, written manually without any CSS libraries or preprocessors, to showcase a solid grasp of layout and responsiveness.
While utility frameworks could accelerate development, the objective was to display understanding of raw styling principles.

### Testing

Unit tests are implemented with **Jest** and **React Testing Library**, validating both logic and UI interactions.
End-to-end (E2E) tests can be added using **Cypress**, which would verify navigation flows, playback interactions, and caching behavior across features.

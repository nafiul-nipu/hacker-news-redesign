# Hacker News Redesign

A React and TypeScript implementation of a redesigned Hacker News frontend. The application uses live Hacker News data via the [Algolia Hacker News Search API](https://hn.algolia.com/api) and supports article opening state, starred stories, paginated loading, infinite scrolling, and refresh-safe user state.

## Table of Contents

- [Project Summary](#project-summary)
- [Assignment Requirements Checklist](#assignment-requirements-checklist)
- [How to Run the Project](#how-to-run-the-project)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Technology Stack](#technology-stack)
- [User-Facing Features](#user-facing-features)
- [Design Interpretation](#design-interpretation)
- [Data Source and API Choice](#data-source-and-api-choice)
- [Application Architecture](#application-architecture)
- [State Management Model](#state-management-model)
- [React Query Strategy](#react-query-strategy)
- [Pagination and Infinite Scrolling](#pagination-and-infinite-scrolling)
- [Starred Stories Design](#starred-stories-design)
- [Opened Stories Design](#opened-stories-design)
- [Persistence After Refresh](#persistence-after-refresh)
- [Accessibility Notes](#accessibility-notes)
- [Testing](#testing)
- [Manual QA Checklist](#manual-qa-checklist)
- [Engineering Decisions and Tradeoffs](#engineering-decisions-and-tradeoffs)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Project Structure](#project-structure)
- [Notes for Evaluators](#notes-for-evaluators)

## Project Summary

The goal of this project is to build a fast, flexible, working Hacker News redesign using React. I focused on completing the core requirements reliably before adding bonus behavior. The final app supports both a live feed and a local starred list, while keeping user actions such as starred stories, opened stories, selected tab, theme, and scroll position available after refresh.

The application separates two kinds of state:

1. Server state, which is the live Hacker News feed from the [Algolia API](https://hn.algolia.com/api).
2. Client state, which is user-specific behavior such as starred stories, opened stories, theme, tab selection, and scroll position.

This separation is important because the Hacker News feed can change over time, but the user's local actions should remain stable.

## Assignment Requirements Checklist

| Requirement                                              |    Status | Implementation Notes                                                                                                                                                                                      |
| -------------------------------------------------------- | --------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implement the provided mockup using React                | Completed | Built with React and TypeScript. The UI follows the provided Hacker News redesign direction using a simple news layout, orange HN accent, story ranking, domain display, metadata, and footer navigation. |
| Use any libraries that help complete the task            | Completed | Uses React, TypeScript, Vite, Tailwind CSS, React Query, React Query persistence, React Icons, and Vitest.                                                                                                |
| Use a free API data source to fetch Hacker News data     | Completed | Uses the Algolia Hacker News Search API.                                                                                                                                                                  |
| Clicking articles opens the original source in a new tab | Completed | Story titles open with `target="_blank"`. If a story has no external URL, it falls back to the Hacker News discussion page.                                                                               |
| Opened articles display as opened in the app             | Completed | Opened story IDs are saved locally, and opened stories use a greyed title style.                                                                                                                          |
| Pagination                                               | Completed | The app supports loading additional API pages. A `Load more` fallback is included, although infinite scrolling may trigger before the button is needed.                                                   |
| Starring articles saves them separately                  | Completed | Users can save or unsave stories. Saved stories appear in a separate `starred` tab.                                                                                                                       |
| Come up with a starring solution                         | Completed | Starred stories are stored locally as full story objects, so the Starred tab can still render them even if the live feed changes.                                                                         |
| Bonus: persistent user state after refresh               | Completed | Starred stories, opened stories, active tab, theme, scroll position, and query cache are retained across refreshes.                                                                                       |
| Bonus: infinite scrolling                                | Completed | The app automatically loads more stories when the user reaches the bottom of the list.                                                                                                                    |
| Engineering excellence                                   | Addressed | Includes reusable hooks, separation of server and client state, typed data models, utility tests, linting, build check, and manual QA plan.                                                               |
| Documentation                                            | Completed | This README documents the design, state model, implementation decisions, testing, tradeoffs, and future work.                                                                                             |

## How to Run the Project

The project uses Node `v22.20.0`. A `.nvmrc` file is provided, so if you have `nvm` installed, run:

```bash
nvm install v22.20.0 // if not already installed
nvm use
```

Otherwise, install Node `v22.20.0` manually.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run unit tests:

```bash
npm run test:run
```

Run linting:

```bash
npm run lint
```

## Available Scripts

| Script             | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| `npm run dev`      | Starts the Vite development server.                          |
| `npm run build`    | Runs TypeScript build checks and creates a production build. |
| `npm run preview`  | Serves the production build locally for final review.        |
| `npm run lint`     | Runs ESLint.                                                 |
| `npm run test`     | Starts Vitest in watch mode.                                 |
| `npm run test:run` | Runs Vitest once, useful for submission checks.              |

## Technology Stack

| Technology                 | Why It Was Used                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------- |
| React                      | Required by the assignment and appropriate for a component-based frontend.            |
| TypeScript                 | Adds type safety for API response data, props, hooks, and local state.                |
| Vite                       | Fast development server and simple production build setup.                            |
| Tailwind CSS               | Quick, consistent styling without adding a heavy UI component library.                |
| TanStack React Query       | Handles server state, API loading, errors, caching, pagination, and refetch behavior. |
| React Query Persist Client | Keeps fetched query data available after browser refresh.                             |
| React Icons                | Provides simple star, moon, and sun icons.                                            |
| Vitest                     | Lightweight test runner that works well with Vite.                                    |
| GitHub Actions             | Runs lint, tests, build, and GitHub Pages deployment workflow.                        |
| GitHub Pages               | Hosts the production build from the `dist/` folder.                                   |

## Deployment

The app is configured for deployment to GitHub Pages through GitHub Actions.

The deployment workflow is defined in:

```txt
.github/workflows/deploy.yml
```

On every pull request, the workflow runs quality checks:

- installs dependencies with `npm ci`
- runs ESLint with `npm run lint`
- runs unit tests with `npm run test:run`
- builds the production app with `npm run build`

On every push to `main`, the workflow runs the same quality checks and then deploys the production `dist/` folder to GitHub Pages.

Because this is a Vite app deployed under a GitHub Pages project path, `vite.config.ts` includes:

```ts
base: "/hacker-news-redesign/";
```

If the repository name changes, this base path must be updated to match the GitHub Pages URL path.

GitHub Pages should be configured with:

```txt
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

## User-Facing Features

### Latest Stories Feed

The default view shows the latest Hacker News stories from the API. Each story includes:

- Position number
- Story title
- Source domain
- Points
- Author
- Relative time
- Comment count
- Save or saved action

### Open Original Article

Clicking a story title opens the original source in a new browser tab. If the story does not have an external URL, the app opens the Hacker News discussion page instead.

### Opened Story Styling

After a user clicks a story, the story is saved as opened. Opened stories use a greyed title color, similar to visited-link behavior. This helps users remember what they have already read.

### Starred Stories

The save button allows users to save stories. Saved stories are available through the `starred` tab. Clicking the saved state again removes the story from the starred list.

### Theme Toggle

The app supports light and dark themes. The default theme is dark. The selected theme is saved locally and restored after refresh.

### Paginated Loading

The latest feed loads stories in API pages. Infinite scrolling is the primary loading behavior, and a `Load more` button is included as a fallback. Because automatic loading can trigger as the user approaches the bottom of the list, the button may only appear briefly or may not be needed during normal scrolling.

### Infinite Scrolling

The app automatically loads more stories as the user reaches the bottom area of the list.

### Refresh-Safe User State

The following values remain after refresh:

- Starred stories
- Opened story IDs
- Active tab
- Theme
- Scroll position
- Previously fetched API pages, through React Query persistence

## Design Interpretation

The assignment allowed implementing either the light or dark version of the provided mockup. I implemented a clean, responsive version with support for both themes. The visual direction keeps the core Hacker News identity while making the page feel more modern.

Key design choices:

- Orange top border and accents to preserve Hacker News identity.
- Large readable story titles.
- Monospace story title styling for a technical/news feel.
- Grey metadata rows for hierarchy.
- Clear distinction between latest and starred views.
- Greyed styling for opened stories.
- Star icon plus text label for saved stories so the interaction is understandable.
- Header and footer navigation so users can switch tabs from either end of a long list.

## Data Source and API Choice

The app uses the Algolia Hacker News Search API:

```txt
https://hn.algolia.com/api/v1/search_by_date?tags=story&page={page}
```

I chose this endpoint because it provides:

- Live Hacker News story data
- Recent-first ordering through `search_by_date`
- Story filtering through `tags=story`
- Built-in pagination through the `page` parameter
- Pagination metadata through `page` and `nbPages`
- Useful story fields such as title, URL, author, points, comments, object ID, and creation timestamp

The API response is converted into a smaller app-specific shape in `src/api/algoliaHnAPI.ts`. This keeps the rest of the app from depending too heavily on the raw API field names.

For example, the API returns `hits` and `nbPages`, but the app uses:

```ts
return {
  stories: data.hits,
  page: data.page,
  totalPages: data.nbPages,
};
```

This makes the rest of the app easier to read and easier to change if the API layer changes later.

## Application Architecture

The application is organized around a small set of clear responsibilities.

### Root App

`src/App.tsx` coordinates the main app behavior:

- Fetch latest stories
- Restore query cache
- Manage active tab
- Manage scroll position
- Connect theme, opened stories, and starred stories
- Decide whether to render latest stories or starred stories
- Pass data and callbacks into presentational components

### Components

- `Header` renders top navigation and the theme toggle.
- `StoryList` renders the story collection, empty state, infinite scroll target, fallback Load More button, and loading-more text.
- `StoryItem` renders one story row, including title, domain, metadata, opened styling, and save/saved action.
- `Footer` repeats tab navigation for long scrolling pages.

### Hooks

Custom hooks contain reusable state or behavior:

- `useLatestStories` wraps React Query infinite fetching.
- `useInfiniteScroll` handles automatic loading near the bottom of the list.
- `useLocalStorage` creates a reusable state + localStorage helper.
- `useTheme` manages light/dark mode.
- `useOpenedStories` stores opened story IDs.
- `useStarredStories` stores saved story objects.

### Utilities

Utility functions keep formatting and URL logic out of the UI:

- `formatRelativeTimeFromSeconds` converts story timestamps into readable relative time.
- `getNewsDomain` extracts a clean domain name from a story URL.
- `getStoryUrl` returns the original story URL or falls back to the Hacker News discussion page.

## State Management Model

The app separates server state and client state.

### Server State

Server state is data owned by the API. In this app, that means the live Hacker News feed.

Managed by:

- `useLatestStories`
- React Query
- React Query persistence

Server state can change over time. For example, if new Hacker News stories are posted, story positions can shift. React Query helps manage this by caching data, marking it stale, and refetching when appropriate.

### Client State

Client state is data owned by the user or browser. In this app, that includes:

- Starred stories
- Opened stories
- Active tab
- Theme
- Scroll position

Managed by:

- `useLocalStorage`
- `useTheme`
- `useOpenedStories`
- `useStarredStories`

Client state should not depend on the current live feed order. For example, a starred story should remain saved even if it no longer appears on the first page of the live Hacker News feed.

## React Query Strategy

React Query is used because the Hacker News feed is server state. It handles several behaviors that would otherwise require manual code:

- Loading state
- Error state
- Caching
- Stale data handling
- Fetching the next page
- Avoiding unnecessary refetches
- Restoring cached data after refresh

The query client is configured in `src/main.tsx`:

```ts
gcTime: 1000 * 60 * 60 * 24,
staleTime: 1000 * 60,
```

### Stale Time

`staleTime` is set to 1 minute. This means fetched stories are treated as fresh for 1 minute. During that time, React Query can reuse the cached result instead of immediately fetching the same data again.

After 1 minute, the data becomes stale. Stale does not mean deleted. It means React Query is allowed to refetch on normal triggers such as remount, reconnect, or window focus.

### Garbage Collection Time

`gcTime` is set to 24 hours. This means inactive query data can remain in the cache for up to 24 hours before React Query removes it.

This helps avoid fetching everything again after a quick refresh, while also preventing old feed data from staying forever.

### Query Persistence

React Query's cache is saved to localStorage with the key:

```txt
hn-query-cache
```

This improves refresh behavior. If the user refreshes after loading several pages, React Query can restore previously fetched pages from localStorage.

Important distinction:

- React Query cache stores fetched API data.
- Custom localStorage hooks store user actions and preferences.

## Pagination and Infinite Scrolling

Pagination is implemented with React Query's `useInfiniteQuery`.

`useLatestStories` starts at page 0:

```ts
initialPageParam: 0;
```

When more stories are needed, React Query calls:

```ts
fetchLatestStories(pageParam);
```

The next page is calculated from the API response:

```ts
const nextPage = lastPage.page + 1;
```

If there are no more pages, `getNextPageParam` returns `undefined`. React Query then sets `hasNextPage` to false.

The app supports two loading paths:

1. Infinite scroll, which loads more when the user reaches the bottom area.
2. A `Load more` fallback button that calls the same loading handler.

Infinite scrolling is the primary experience. The fallback button exists for accessibility and resilience, but it may only appear briefly because the automatic observer can request the next page as the user approaches the bottom.

## Starred Stories Design

I implemented starred stories as a local saved list.

When a user saves a story:

- The full story object is stored in localStorage.
- The story appears in the `starred` tab.
- The save button changes to a filled star and `saved` text.
- Clicking again removes it from the saved list.

I stored full story objects instead of only IDs because the starred page should still be able to render saved articles even if the live feed changes later.

This was an intentional design choice:

- Opened stories only need IDs.
- Starred stories need enough data to render independently.

## Opened Stories Design

Opened stories are tracked by story ID.

When a user clicks a story title:

1. The link opens in a new tab.
2. The story ID is saved locally.
3. The title style changes to a greyed color.
4. The opened state remains after refresh.

Opened stories only store IDs because the app only needs to know whether the story has been opened before. Storing full story objects here would be unnecessary.

## Persistence After Refresh

The app persists several pieces of state.

| State           | Storage Key           | Purpose                                              |
| --------------- | --------------------- | ---------------------------------------------------- |
| Theme           | `hn-theme`            | Restores light/dark mode.                            |
| Active tab      | `hn-active-tab`       | Restores whether the user was on latest or starred.  |
| Opened stories  | `hn-opened-story-ids` | Keeps opened stories visually marked.                |
| Starred stories | `hn-starred-stories`  | Keeps saved stories available.                       |
| Scroll position | `hn-scroll-y`         | Restores approximate reading position after refresh. |
| Query cache     | `hn-query-cache`      | Restores fetched Hacker News pages after refresh.    |

The scroll position is restored only after React Query has finished restoring cached data and stories are rendered. This avoids trying to scroll before the page has enough height.

One important note: because Hacker News is live data, exact scroll position may not always map to the same story after a later refetch. For example, if two new stories are added above the old story, the user's previous pixel position may now show a different story. This is normal for live feeds. The saved user actions still remain correct because they are tied to story IDs.

## Accessibility Notes

The app uses semantic HTML where possible:

- `header`
- `main`
- `footer`
- `nav`
- `article`
- `button`
- `a`

ARIA is used only where it adds value. For example, the theme button uses an `aria-label` because the button is icon-based. The star button also includes an `aria-label` and visible text. Text buttons such as `Load more`, `latest`, and `starred` already expose readable text, so extra ARIA is not necessary.

This follows a simple accessibility rule:

Use semantic HTML first. Add ARIA only when the visible UI does not already provide enough meaning.

## Testing

I added a small unit test layer with Vitest. The tests focus on pure utility functions because these functions are deterministic, easy to verify, and do not require browser rendering or API mocking.

Covered files:

- `src/utils/getNewsDomain.test.ts`
- `src/utils/getStoryUrl.test.ts`
- `src/utils/formatRelativeTime.test.ts`

Covered behavior:

- URL domain cleanup
- fallback domain for missing or invalid URLs
- fallback Hacker News discussion URL when a story has no external link
- relative time formatting for minutes, hours, and days

Run tests:

```bash
npm run test:run
```

Current test status from local verification:

```txt
Test Files  3 passed
Tests       10 passed
```

I did not add full component tests because that would require extra setup for React Query providers, localStorage mocking, and IntersectionObserver mocking. For this time-boxed assignment, I chose a practical testing layer that verifies the reusable logic most likely to break quietly.

If this were a production project, the next testing step would be component tests for:

- `StoryItem` click behavior
- save/unsave behavior
- empty Starred state
- tab switching

Then I would add a small end-to-end test for the main user flow.

## Manual QA Checklist

The following manual checks were used.

### Initial Load

- App loads without console errors.
- Latest stories appear from live API data.
- Each story shows title, domain, points, author, time, comments, and save action.
- Empty state appears if the visible story list is empty.

### Article Opening

- Clicking a story opens a new tab.
- External stories open the original source.
- Stories without external URLs open the Hacker News discussion page.
- Clicked stories become visually muted.
- Opened styling remains after refresh.

### Starred Stories

- Clicking save adds a story to the starred list.
- Saved story shows filled star and `saved` text.
- Clicking saved again removes it.
- Starred tab shows saved stories.
- Starred tab works after refresh.
- Starred stories still render even if not currently visible in the latest feed.

### Pagination and Infinite Scroll

- The `Load more` fallback loads additional stories if clicked before infinite scrolling triggers.
- Infinite scroll loads more near the bottom.
- Loading-more feedback appears while fetching next page.
- Load More does not appear on the Starred tab.
- Duplicate loading is prevented while a page is already being fetched.

### Persistence

- Theme remains after refresh.
- Active tab remains after refresh.
- Opened stories remain marked after refresh.
- Starred stories remain after refresh.
- Scroll position is restored after refresh when stories are available.

### Error and Loading States

- Loading message appears during first load or cache restoration.
- Error message appears if the API request fails.

### Build and Quality Checks

Run:

```bash
npm run test:run
npm run build
npm run lint
```

## Engineering Decisions and Tradeoffs

### Completed and Working Over More Features

The requirements said quality matters more than attempting too many buggy features. I focused on finishing the required and bonus features cleanly instead of adding extra unrelated functionality.

### React Query Instead of Manual Fetch State

I used React Query because API data has its own lifecycle: loading, error, cache, stale data, pagination, and refetching. Managing all of that manually with `useState` and `useEffect` would work for a small prototype, but it becomes messy quickly.

React Query keeps server state separate from user state, which makes the app easier to reason about.

### LocalStorage for User State

The assignment asks for persistent user state after refresh. localStorage is appropriate here because the state is local to the browser and does not need authentication or a backend.

### Full Story Objects for Starred Stories

Starred stories are stored as full story objects. This lets the Starred tab render independently from the live feed. If only IDs were stored, the app would need to refetch individual stories or rely on stories still being present in the latest feed.

### IDs Only for Opened Stories

Opened stories only store IDs because the app only needs to check whether a story was opened. This keeps that state lightweight.

### Infinite Scroll With Load More Fallback

I kept infinite scrolling as the primary pagination experience and included a Load More fallback that uses the same loading handler.

Reasoning:

- Infinite scrolling satisfies the bonus requirement.
- The fallback button provides a manual path if automatic loading is missed.
- Both paths share the same React Query pagination logic.
- Because infinite loading can trigger early, the button may not always remain visible during normal scrolling.

### Utility Tests Instead of Full UI Tests

Full UI tests would require more setup and could consume too much time. I added unit tests for pure logic first because those tests are quick, useful, and reliable.

### Custom Hooks Instead of Redux

I considered Redux because it is commonly used in larger React applications for centralized state management. For this project, I chose custom hooks instead.

The main reason is that the app has two clearly separated kinds of state:

- Server state: latest Hacker News stories from the API.
- Client state: theme, active tab, opened stories, starred stories, and scroll position.

Server state is handled by React Query, which already provides caching, loading/error state, pagination, and persistence for API data. Adding Redux on top of that would duplicate some of React Query's responsibilities.

Client state is small and feature-specific, so I kept it in focused custom hooks:

- `useTheme`
- `useOpenedStories`
- `useStarredStories`
- `useLocalStorage`

This keeps the state logic easy to find without adding global Redux boilerplate.

If the app grew into a larger product with authentication, multiple pages, shared user settings, comments, profiles, and more cross-feature state, Redux Toolkit or another centralized store could become useful. For the current scope, custom hooks plus React Query provide a simpler and more focused state model.

## Known Limitations

These are not blockers, but they are worth documenting.

1. Starred stories are local to the browser.

   There is no user account or backend persistence. If the user switches browser or clears localStorage, starred stories are lost.

2. Scroll restoration is approximate.

   Since the Hacker News feed is live, story order can change after refetching. The saved scroll position may not always point to the exact same story later.

3. No full component test coverage yet.

   Utility tests are included. Component and end-to-end tests would be the next testing step.

4. No search or filtering beyond latest/starred.

   The assignment did not require search. The API supports it, but I intentionally kept the app focused.

5. No backend save API.

   Starring is implemented locally because the public Hacker News API does not provide a user-specific save endpoint for this app.

## Future Improvements

If I continued the project, I would focus on improvements that make the app more useful as a real Hacker News client, not just a coding assignment.

### Product Improvements

- Add search using the Algolia `search` endpoint.
- Add story filters such as `Ask HN`, `Show HN`, jobs, and front page.
- Add a direct comments link for each story so users can open the Hacker News discussion.
- Add a saved-story count beside the `starred` tab.
- Add a clear-all or bulk-manage option for starred stories.
- Add client-side pagination for very large starred lists.
- Add more specific empty states, such as `No starred stories yet`.
- Add better retry UI if the API request fails.

### Experience Improvements

- Improve keyboard focus styles for all interactive controls.
- Add smoother loading indicators for infinite scrolling.
- Add optional manual pagination for users who prefer not to use infinite scroll.
- Restore scroll position separately for `latest` and `starred` tabs.
- Further refine mobile spacing and typography after testing on more physical devices.
- Add user preferences for default theme and default tab.

### Engineering Improvements

- Store a compact normalized story shape for starred stories instead of the full API object.
- Add component tests for story actions, tab switching, and empty states.
- Add an end-to-end test for the core flow: load stories, open a story, star it, refresh, and verify persistence.
- Add account-based persistence through a backend if this became a multi-device product.

## Project Structure

```txt
src/
  api/
    algoliaHnAPI.ts              # API request and response normalization

  components/
    Header.tsx                   # App title, tab navigation, theme toggle
    Footer.tsx                   # Footer navigation
    StoryItem.tsx                # One story row
    StoryList.tsx                # Story list, infinite scroll, and Load More fallback

  hooks/
    useInfiniteScroll.ts         # Infinite scroll behavior
    useLatestStories.ts          # React Query infinite query hook
    useLocalStorage.ts           # Reusable localStorage-backed state hook
    useOpenedStories.ts          # Opened-story state
    useStarredStories.ts         # Starred-story state
    useTheme.ts                  # Theme state

  utils/
    formatRelativeTime.ts        # Relative time formatting
    getNewsDomain.ts             # Domain extraction
    getStoryUrl.ts               # Original URL or HN fallback URL
    *.test.ts                    # Vitest unit tests

  App.tsx                        # Main app composition
  main.tsx                       # React root and React Query setup
  types.ts                       # Shared TypeScript types
```

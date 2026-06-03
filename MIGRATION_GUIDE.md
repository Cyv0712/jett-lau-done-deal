# Production Mirroring & Migration Guide 🚀
This guide outlines the recent high-performance, security, SEO, and structural updates implemented in **Katingin Bikes**. Use this list to mirror these changes in the clone site (**Jett Lau Done Deal**).

---

## 📦 1. Frontend Bundler Code Splitting (Vite)
* **Goal:** Reduce main bundle size, improve LCP/FCP, and enable modular browser caching.
* **File to modify/create:** `frontend/vite.config.js`
* **Changes:** Configure `manualChunks` in the Rollup build options:
  ```javascript
  export default defineConfig({
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) return 'vendor-gsap';
              if (id.includes('react-bootstrap') || id.includes('bootstrap')) return 'vendor-bootstrap';
              if (id.includes('lucide-react')) return 'vendor-lucide';
              if (id.includes('react-icons')) return 'vendor-icons';
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) return 'vendor-react';
              return 'vendor-others';
            }
          }
        }
      }
    }
  })
  ```

---

## 🚦 2. React Dynamic Routing & Error Boundaries
* **Goal:** Load pages dynamically on-demand and prevent blank screens on network failures.
* **Files to create/modify:**
  * **`frontend/src/components/ErrorBoundary.jsx` [NEW]:** Standard class component to catch chunk-loading failures and show a themed reconnect banner with a retry trigger (`window.location.reload()`).
  * **`frontend/src/pages/NotFound.jsx` [NEW]:** Custom gold/dark themed 404 page.
  * **`frontend/src/App.jsx`:**
    * Convert static route imports to lazy loads:
      `const Home = lazy(() => import('./pages/Home'));`
    * Wrap `<Suspense>` inside the `<ErrorBoundary>` component.
    * Add a catch-all route at the bottom of `<Routes>`:
      `<Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />`

---

## ⚡ 3. Asset & CSS Optimization
* **Goal:** Maximize paint performance and meet accessibility guidelines.
* **Hero Image Load:**
  * In `frontend/index.html`, add a high-priority preload tag:
    `<link rel="preload" as="image" href="HERO_IMAGE_URL" fetchpriority="high" />`
  * In `frontend/src/components/SplashScreen.jsx`, add `fetchPriority="high"` to the rendered hero `<img>` tag and set `preload.fetchPriority = 'high';` in the `useEffect` preloading logic.
* **Tagline Lag Fix:**
  * Avoid animating CSS properties like `letter-spacing` in GSAP.
  * Define static spacing in `index.css`:
    ```css
    .splash-tagline {
      letter-spacing: 4px;
      will-change: transform, opacity;
    }
    ```
  * Only animate `opacity` and `y` (translateY) in the GSAP tagline timeline.
* **A11y (Accessibility) Contrast Checks:**
  * Ensure text color contrast ratio is greater than 4.5:1. 
  * Update `--text-muted` or secondary classes in `index.css` to a brighter shade.
  * Add descriptive `aria-label` tags to navbar buttons and social media icons in the footer.
* **Media Compression:**
  * Switch raw images to compressed WebP formats (`.webp`).
  * Add `loading="lazy"` to secondary/below-the-fold images (showroom lists, buyer avatars).

---

## 🧹 4. GSAP Memory Leak Prevention
* **Goal:** Ensure animations unmount cleanly without holding references.
* **File to modify:** `frontend/src/components/SplashScreen.jsx`
* **Changes:** Wrap splash timeline initializations within `gsap.context()` and return its `revert()` cleanup callback in `useEffect`:
  ```javascript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // timeline animations here
    }, containerRef);

    return () => ctx.revert(); // clean up memory leaks
  }, []);
  ```

---

## 🛡️ 5. Admin Security & Token Expirations
* **Goal:** Terminate expired user sessions gracefully.
* **File to modify:** `frontend/src/pages/Admin.jsx`
* **Changes:** 
  * Add a helper to clear tokens and storage:
    ```javascript
    const handleUnauthorized = () => {
      sessionStorage.removeItem('adminAuth');
      sessionStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      alert('Session expired. Please log in again.');
    };
    ```
  * Intercept API request responses. If the server returns a `401 Unauthorized` status on POST/PATCH/DELETE calls, trigger `handleUnauthorized()`.

---

## 📈 6. SEO Search Crawl Indexing
* **Goal:** Direct search engines to index legitimate public routes.
* **Files to create (in `frontend/public/`):**
  * **`robots.txt`:** Allow indexation of `/`, `/inventory`, etc. Disallow `/admin` routes.
  * **`sitemap.xml`:** Map key navigation endpoints with priority weighting.

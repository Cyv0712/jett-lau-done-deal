# Katingin Bikes - Website Feature Documentation

This document serves as the comprehensive feature list and technical specification manual for the **Katingin Bikes** web application, designed for preparing user guides, administrative manuals, and marketing copy.

---

## 1. System Overview
**Katingin Bikes** is a premium, high-performance web application built with a modern React frontend (powered by Vite) and an Express/Node.js backend. The platform is custom-tailored for a premium second-hand big bike dealership in Metro Manila, emphasizing transaction transparency, premium visual aesthetics (dark mode/void style), and optimized mobile engagement.

---

## 2. Customer-Facing Features (Public Site)

### 2.1. Navigation & Theme
* **Dark Aesthetics (Void Theme):** Fully custom premium styling featuring HSL-curated colors, smooth gradients, subtle borders, and glassmorphism elements matching the "big bike" luxury tone.
* **Session-Aware Splash Screen:** An introductory animated splash screen plays on first-time visits in a browser session. It automatically stores a flag in `sessionStorage` so that standard page refreshes bypass the animation, ensuring a fast and uninterrupted browsing experience.
* **Responsive Layout:** Optimized from the ground up for desktop, tablet, and mobile screens.

### 2.2. Interactive Homepage
* **Hero Banner:** A striking, high-impact introduction designed to capture rider interest instantly.
* **Brand Marquee:** A horizontally scrolling showcase displaying the logos of premium brands (BMW, Yamaha, Kawasaki, Honda, Ducati, KTM, etc.).
* **Featured Bikes:** A hand-picked showcase highlighting the most popular or recently added motorcycle listings.
* **About Snippet:** A brief summary introducing Katingin Bikes' core values (honest deals, transparent history, clean papers).

### 2.3. Advanced Inventory Search & Filtering (`/inventory`)
* **Live Catalog Feed:** Fetches live units directly from the database (restricted only to units marked as `Available`).
* **Disclaimer Banner:** Highlighted warning informing users that stocks and pricing are subject to change, encouraging direct channel verification.
* **Complex Multi-Filter System:**
  * **Text Search:** Matches query words against Brand, Model, or Type.
  * **Brand Filter:** Populates dynamically with only the brands currently in active inventory.
  * **Type Filter:** Populates dynamically with only the motorcycle types currently in active inventory (e.g., Adventure, Naked, Sport, Touring).
  * **Price Range:** Allows setting custom minimum and maximum price boundaries.
* **Interactive Active Filter Chips:** Displayed at the top of the grid to show applied filters. Users can clear individual filters by clicking a chip or click "Clear All" to reset immediately.
* **Skeleton Loader Cards:** Custom placeholder loading cards display during API fetch sequences to prevent page shift and improve perceived performance.

### 2.4. Detailed Product Profiles (`/bike/:id`)
* **Multi-Image Carousel:** Interactive photo slide viewer supporting high-quality uploads.
* **Key Specifications Panel:** Highlights critical specifications at a glance:
  * Year Model
  * Odometer Mileage (formatted with "km" suffix)
  * Cash Price (formatted in PHP `₱` with commas)
* **Technical Details Table:** Secondary grid detailing engine configuration, horsepower (HP), transmission type, and fuel tank capacity.
* **Detailed Description:** Rich text container explaining the background, ownership history, and condition of the unit.
* **"Honest Notes" Section:** Highlighted in soft red with warning icons, listing any wear-and-tear, scratches, or minor issues transparently to build trust and avoid customer surprises.
* **Call to Action (CTA):** A direct "Inquire Now" path forwarding users to the direct contact channels.

### 2.5. Curated Hall of Fame (`/showcase/:slug`)
* Curated showcase pages for legendary models (e.g., *Honda Africa Twin*, *Yamaha Tracer 900*, *Kawasaki Versys 650*).
* **Live Inventory Cross-Referencing:** On load, the page queries the live inventory database. It automatically identifies if an active listing matches the showcase bike’s brand, model, and engine configuration.
* **Dynamic Badges:**
  * **In Stock:** Displays a green badge and activates a direct link button button saying "VIEW LIVE INVENTORY UNIT" pointing straight to the unit details.
  * **Sold Out:** Displays a red "SOLD OUT" badge with a fallback link button to browse the general inventory.

### 2.6. Optimized Device-Aware Contact Channels (`/contact`)
* **Viber Deep Linking:** 
  * **Mobile:** Deep-links natively to open the Viber mobile app directly into a chat with the dealership (`viber://chat/?number=...`).
  * **Desktop:** Falls back to the desktop application protocol.
  * **App Detection Fallback:** Uses a custom Javascript timeout check. If the deep-link fails to resolve (i.e. Viber is not installed on the system), it automatically redirects the user to the official Viber download page after 2 seconds.
* **Gmail Redirects:**
  * **Mobile:** Fires standard `mailto:` deep-linking.
  * **Desktop:** Opens a new tab pointing directly to the web-based Google Mail Compose screen with the recipient field pre-filled, bypassing generic desktop email program prompts.
* **Facebook Messenger Link:** Launches a direct messenger chat link to the Katingin Bikes Facebook Page.

---

## 3. Administrative Console Features (`/admin`)

The Administrative Dashboard is designed for non-technical administrators to manage the store's inventory, upload new units, and track high-level sales data.

### 3.1. Authentication & Security Gate
* **Login Shield:** All administrative controls are hidden behind a dedicated login layout.
* **Token-Based Security:** Employs JSON Web Token (JWT) verification on the server-side (`/api/auth/login`).
* **Session Persistence:** Login states are tracked in `sessionStorage`. If the administrator closes the browser tab, they are automatically logged out.
* **Automatic Unauthorized Handler:** If a session token expires or is rejected (returns a 401 HTTP response), the application warns the user and automatically redirects them to the login screen, clearing stale tokens.

### 3.2. Real-Time Operations Analytics
The dashboard features three prominent key performance indicators (KPIs) calculated dynamically from the live database:
1. **Units In Stock:** Displays the total count of active, unsold motorcycles.
2. **Total Asset Value:** Sums up the cash value of all active inventory, indicating total tied-up capital.
3. **Revenue Collected:** Sums up the prices of all units marked as **Sold**, providing historical sales tracking.

### 3.3. Inventory Views & Tables
* **Status Filter:** Dropdown to switch the main table between **Active Inventory** and **Sold Units**.
* **Clean Data Table:** Lists items sequentially with Brand, Model, Type, Year, and Price.
* **Quick Action Controls:**
  * **Mark as Sold (Checkmark Icon):** Clicking this prompts a quick confirmation. If accepted, it updates the status of the bike to "Sold", removing it from the public catalog, shifting it to the sold table, and instantly updating the analytics counters.
  * **Delete Unit (Trash Icon):** Prompts a dedicated security modal warning the user that deletion is permanent.

### 3.4. "Add New Unit" Modal Form
The Add Unit modal features advanced form logic to simplify entry and prevent mistakes:

* **Smart Identity Parsing (Combined Input):**
  * Rather than filling out Brand, Model, and Engine Size separately, administrators enter a single line (e.g., `KAWASAKI Z 1000 1000cc`).
  * The system automatically parses this text on submission, extracting the first word as the Brand, finding numerical words for Engine Size (converting to CC format), and joining the remaining terms to form the Model name.
* **Form Validations:**
  * **Negative Value Blocker:** Instantly prevents entering negative values on numerical fields (Year, Mileage, Price, Power, Fuel Capacity).
  * **Short Field Limit:** Caps character length of all standard fields to 50 characters to prevent database bloating or UI distortion. Textareas (Description and Issues) bypass this limit.
* **Advanced Multi-Image Manager:**
  * Accepts multiple uploads simultaneously.
  * **Interactive Thumbnail Selector:** Displays image preview squares. Clicking any preview square immediately moves it to the front of the queue, designating it as the **Primary Thumbnail** (the main image shown in search grids).
* **Submission Status Loader:** Displays a "SAVING..." loading state. If the connection is slow (e.g., uploading massive image files), it warns the user of the delay instead of failing silently.

---

## 4. Technical Architecture (Backend Support)
* **Response Compression:** The Express backend implements gzip/Brotli compression middleware, significantly shrinking payload transfer sizes for JSON data.
* **Dynamic Media Serving:** Features absolute path resolution for uploaded assets, ensuring images load correctly across all client-side pages and search engines.
* **Search Engine Optimization (SEO):** Auto-injected JSON-LD schemas (`LocalBusiness` on Homepage, `Product` on details page) ensure search engine crawlers can index inventory prices and stock statuses directly into Google Rich Snippets.

---

## 5. Administrator Operational Guide (How-To Instructions)

This step-by-step section outlines how to perform common tasks in the administrative dashboard.

### 5.1. Accessing the Dashboard & Logging In
1. Open your browser and navigate to the Admin path: `https://www.katinginbikes.com/admin` (or `http://localhost:5173/admin` when running locally).
2. Enter the administrator password in the password field.
3. Click the **LOGIN** button.
   * *Note: The login session is kept in temporary memory (`sessionStorage`). Closing the tab will automatically lock the dashboard.*

### 5.2. Adding a New Motorcycle Listing
1. Click the golden **ADD NEW UNIT** button in the top right of the dashboard.
2. In the **Motorcycle Identity** field, enter the Brand, Model, and Engine Size together (e.g., `BMW R 1250 GS 1250cc`). The server will automatically parse this into separate database fields.
3. Complete the specification fields (Type, Year, Mileage, Cash Price, and technical parameters).
4. Enter the **Description** (overview of the bike's history/condition) and **Honest Notes / Issues** (details of any minor cosmetic wear-and-tear or defects).
   * *Pro-Tip: Press `Shift` + `Enter` inside these boxes to automatically split your text into bullet points on the details page.*
5. Select the files in the **Unit Images** uploader.
6. Once uploaded, you will see image preview thumbnails. Click on any preview image to designate it as the **Primary Thumbnail** (it will be highlighted with a gold border). This is the image visitors see first in the search directory.
7. Click the **SAVE UNIT** button.

### 5.3. Marking a Motorcycle as Sold
When a motorcycle has been successfully sold:
1. Locate the unit under the **Active Inventory** view.
2. Click the **Checkmark Icon** (`✓`) under the **ACTIONS** column.
3. Confirm the pop-up warning.
4. The unit will immediately shift from the public catalog to the **Sold Units** database view, and your dashboard's *Revenue Collected* stat will automatically update.

### 5.5. Deleting a Motorcycle Listing
To permanently remove a listing (e.g., entered in error):
1. Find the bike in either the **Active Inventory** or **Sold Units** view.
2. Click the red **Trash Icon** under the **ACTIONS** column.
3. A modal will pop up warning: **DELETE UNIT? This action cannot be undone.**
4. Click the red **DELETE** button to confirm.
5. The bike, its database records, and all its uploaded images will be permanently erased.

### 5.6. Changing/Resetting the Administrator Password
To change the password to access `/admin`:
1. Open a terminal in the project's `/backend` directory.
2. Run the hash generator script with your new password:
   ```bash
   npm run generate-hash <your-new-password>
   ```
3. Copy the output line: `ADMIN_PASSWORD_HASH=...`
4. Open the `backend/.env` file and replace the existing `ADMIN_PASSWORD_HASH` configuration on line 8 with your new hash.
5. Restart your backend server (`node server.js` or deployment container) to apply the change.


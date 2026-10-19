# Simple Portfolio (React + Plain PHP + MySQL)

A beginner-friendly, minimal full-stack portfolio built for video editors, photographers, and creatives.

---

## 📁 Project Structure

```
Simple portfolio/
├── backend/
│   ├── db.php               # MySQL connection using PDO (XAMPP root/"")
│   ├── get_projects.php     # GET: Returns projects as JSON
│   └── submit_contact.php   # POST: Saves inquiries to MySQL leads table
├── database.sql             # SQL script to create DB and seed projects
├── frontend/                # Single React page app
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx          # The ONLY React component (useState, useEffect, fetch)
│       └── App.css          # Clean modern styling
└── README.md
```

---

## 🛠️ Step 1: Database Setup (XAMPP)

1. Open **XAMPP Control Panel** and click **Start** for:
   - **Apache**
   - **MySQL**
2. In your browser, open **phpMyAdmin**: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Click on the **SQL** tab at the top.
4. Open the file `database.sql` from this folder, copy its contents, paste them into the SQL tab, and click **Go**.
5. You will now have a database called `portfolio_db` with two tables:
   - `projects` (pre-filled with 4 sample projects)
   - `leads` (where incoming contact messages will be stored)

---

## 🚀 Step 2: Running the PHP Backend

You have two easy ways to serve the PHP files:

### Option A: Using Built-in PHP Server (Easiest, No Copying Needed)
Open a terminal in the `Simple portfolio` folder and run:
```bash
php -S localhost:8000 -t backend
```
> The React app in `frontend/src/App.jsx` is pre-configured to point to `http://localhost:8000`.

---

### Option B: Using XAMPP Apache
1. Copy the `backend` folder to your XAMPP htdocs directory:
   `C:\xampp\htdocs\backend`
2. In `frontend/src/App.jsx`, update line 8:
   ```javascript
   const API_BASE_URL = 'http://localhost/backend';
   ```

---

## 💻 Step 3: Running the React Frontend

1. Open a terminal and navigate to the `frontend` folder:
   ```bash
   cd "C:\Users\lalit\.gemini\antigravity\scratch\Simple portfolio\frontend"
   ```
2. Install dependencies (runs only once):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 How React Connects to PHP

All interaction happens inside the single component **`frontend/src/App.jsx`**:

### 1. Fetching Projects (`GET`)
```javascript
useEffect(() => {
  fetch(`${API_BASE_URL}/get_projects.php`)
    .then(res => res.json())
    .then(data => setProjects(data.data));
}, []);
```
- When the page loads, `useEffect` triggers a `fetch()` call to `get_projects.php`.
- The PHP script queries MySQL and returns JSON.
- `setProjects()` updates the state, and the grid re-renders automatically.

### 2. Submitting Inquiries (`POST`)
```javascript
fetch(`${API_BASE_URL}/submit_contact.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
  .then(res => res.json())
  .then(result => {
    // Show success message and reset input fields
  });
```
- When the user submits the form, `fetch()` sends the name, email, service, and message as JSON.
- PHP receives `php://input`, validates the input, and executes a prepared SQL statement to prevent SQL injection.
- The new row is stored in the `leads` table.

---

## 🧪 Testing the End-to-End Flow

1. Filter projects using the **All Work**, **Photography**, **Videography**, or **Reels / Edit** buttons.
2. Click any card to launch the **Video Lightbox Modal**.
3. Scroll to the **Start a Project** form, enter test details, and click **Send Message**.
4. Check [http://localhost/phpmyadmin](http://localhost/phpmyadmin) -> `portfolio_db` -> `leads` table to see your newly submitted inquiry!

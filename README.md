# ShopList - Market Grocery Planner Categorized by Shop Type

A full-stack grocery shopping application designed to help you organize items by the **exact shop where you buy them** (Vegetable Stall, Dairy, Grocery / Kirana, Fruit Stall, Bakery, Meat Market, Pharmacy), with a specialized **Shopping Mode** for checking off items as you walk through the market.

---

## 📁 Project Structure

```
shoplist/
├── backend/
│   ├── pom.xml                               # Spring Boot 3.3 Maven project definition
│   ├── src/main/java/com/shoplist/
│   │   ├── ShopListApplication.java          # Spring Boot main entrypoint
│   │   ├── config/CorsConfig.java            # CORS configuration for frontend
│   │   ├── model/
│   │   │   ├── ShopCategory.java             # Shop types (Vegetables, Dairy, Kirana, etc.)
│   │   │   ├── Item.java                     # Item master
│   │   │   ├── ShoppingList.java             # Shopping list entity
│   │   │   └── ShoppingListItem.java         # Items on the list with quantities & prices
│   │   ├── repository/                       # Spring Data JPA repositories
│   │   ├── service/                          # Business logic services
│   │   └── controller/                       # REST APIs (/api/categories, /api/shopping-lists)
│   ├── src/main/resources/
│   │   ├── application.properties            # MySQL and JPA config
│   │   ├── schema.sql                        # MySQL DDL table creation script
│   │   └── data.sql                          # Default shop categories & starter grocery data
│   └── mock-server.js                        # Zero-dependency local Node API server (Port 8080)
│
├── frontend/
│   ├── index.html                            # 🚀 Standalone, ready-to-run interactive web app
│   ├── package.json                          # React + Vite dependencies
│   ├── vite.config.js                        # Vite dev server + proxy to :8080
│   ├── tailwind.config.js                    # Tailwind green-and-white theme
│   └── src/
│       ├── App.jsx                           # Core React component
│       ├── components/
│       │   ├── Navbar.jsx                    # Header with progress bar & shopping mode toggle
│       │   ├── CategoryFilter.jsx            # Shop category chips
│       │   ├── ShoppingGroup.jsx             # Grouped list per shop stall
│       │   └── AddItemModal.jsx              # Add item modal with shop selector & units
│       └── services/api.js                   # REST API client
└── README.md
```

---

## ⚡ How to Run

### Option 1: Instant Browser Launch (Zero Installation)
Double-click or open `frontend/index.html` directly in Google Chrome, Edge, or Firefox.
* Works immediately with built-in LocalStorage.
* Supports filtering by shop, marking items bought, calculating total estimated budget, and adding new items.
* Automatically syncs with the backend API as soon as the backend is started!

### Option 2: Running the Backend

#### A. Spring Boot + MySQL
1. Ensure your MySQL server is running on `localhost:3306`.
2. Ensure database user `root` has password `root` (or update in `backend/src/main/resources/application.properties`).
3. Run the Spring Boot application:
   ```powershell
   cd backend
   mvn spring-boot:run
   ```
   *The application will automatically create the tables and seed default categories & items on startup.*

#### B. Zero-Config Node API Server (Alternative)
If MySQL is not currently configured or running, you can run the instant built-in mock server:
```powershell
node backend/mock-server.js
```
It implements the exact same REST endpoints on `http://localhost:8080/api`.

### Option 3: Running the React + Vite Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏪 Pre-Configured Shop Categories

1. 🥦 **Vegetable Shop**: Tomatoes, Onions, Potatoes, Spinach, Coriander, Garlic, Ginger.
2. 🥛 **Dairy & Milk Booth**: Milk pouches, Curd, Paneer, Butter, Cheese, Eggs.
3. 🛒 **Grocery Store / Kirana**: Rice, Atta, Dals, Spices, Cooking Oil, Sugar, Tea.
4. 🍎 **Fruit Stall**: Bananas, Apples, Oranges, Seasonal fruits.
5. 🍞 **Bakery**: Whole wheat bread, Buns, Rusks, Cookies.
6. 🐟 **Meat & Fish Market**: Chicken, Mutton, Fish, Seafood.
7. 💊 **Chemist & Personal Care**: Toothpaste, Soap, Shampoo, OTC essentials.

---

## 📱 Features Included

- **Shop-First Organization**: Items are grouped by stall so you don't jump back and forth in the market.
- **Shopping Mode**: Enlarged high-contrast touch targets for one-tap purchase marking on mobile.
- **Live Progress & Budget**: Tracks total items bought, completion percentage, and estimated grocery spend.
- **Quantity & Base Units**: Pick from kg, g, litre, ml, piece, packet, dozen, and bunch.
- **REST API + Offline Resiliency**: Seamlessly saves to LocalStorage if backend is offline, and syncs with Spring Boot endpoints when available.

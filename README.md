# 🛍️ Product Listing Application

A simple **E-commerce Product Listing Application** built using **React + Vite** that consumes the public API from:

https://dummyjson.com/docs/products

The application demonstrates API integration, reusable component design, filtering logic, routing, and clean frontend architecture.

---

# 📌 Objective

This project was built to demonstrate the ability to:

- Work with external APIs
- Build reusable UI components
- Manage application state with React Hooks
- Implement combined filtering logic
- Handle routing between pages
- Structure clean and maintainable frontend code
- Implement loading and error handling states

---

# 🖥️ Application Features

The application consists of **two main screens**:

1. Product Listing Page  
2. Product Detail Page

---

# 🖼️ 1️⃣ Product Listing Page

## Layout

The page is divided into two main sections:

- **Left Side** → Filters  
- **Right Side** → Product Grid  
- **Bottom** → Pagination

## Product Card Displays

Each product card contains:

- Product Image
- Product Name (Title)
- Price
- Rating

Clicking on a product navigates to the **Product Detail Page**.

---

# 🔎 Filters

### 1. Category Filter
- Dynamically fetched from `/products/categories`
- Selecting a category updates the product list.

### 2. Price Range Filter
- Minimum price input
- Maximum price input
- Products filtered within selected range.

### 3. Brand Filter
- Unique brands extracted from fetched products
- Supports multi-select filtering

---

## Filter Behavior Rules

- Filters work **together (combined filtering)**
- Changing a filter **updates products immediately**
- **Pagination resets** when filters change
- Proper **loading states** are displayed
- Proper **error handling** is implemented

---

# 🖼️ 2️⃣ Product Detail Page

The product detail page displays:

- Product Image
- Product Name
- Price
- Rating
- Description
- Brand
- Category

---

# 🔙 Navigation

- Clicking a product card navigates to `/product/:id`
- A **Back button** returns to the Product Listing page
- Previously selected filters remain applied when navigating back

This is implemented by preserving **URL search parameters**.

---

# ⚙️ Tech Stack

- React (Functional Components)
- Vite
- React Router
- TailwindCSS
- shadcn / Radix UI components

---

# 📊 API Endpoints Used

Products are fetched from the DummyJSON API:

- `/products`
- `/products/categories`
- `/products/category/{category}`
- `/products/{id}`

Pagination uses `limit` and `skip`.

---

# 🧠 Architecture Decisions

The project follows a modular architecture to maintain separation of concerns.

```
src
 ├── components
 │    ├── Filters
 │    ├── ProductCard
 │    ├── ProductInfo
 │    ├── Pagination
 │    ├── Loader
 │    ├── ErrorState
 │    └── NavLint
 │
 ├── hooks
 │    ├── useProduct
 │    ├── useProducts
 │    ├── use-toast
 │    ├── useFetchWithRetry
 │    └──usePagination
 │
 ├── services
 │    └── productService
 │
 ├── lib
 │    └── utils (fetchWithRetry)
 │
 ├── pages
 │    ├── ProductList
 │    └── ProductDetail
```

### Key Architectural Choices

- **Service Layer** for API calls
- **Custom Hooks** for data fetching logic
- **Reusable Components**
- **Retry logic** with exponential backoff for handling API rate limits (429)
- **Clear loading and error state handling**

---

# 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sreenivasyadav374/product_listing_application
```

### 2. Navigate to the project

```bash
cd project-folder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

The app will run at:

```
http://localhost:8080
```

---

### 5. Build for production

```bash
npm run build
```

---

### 6. Preview production build

```bash
npm run preview
```

---

# ⚠️ Assumptions Made

- DummyJSON API may occasionally return **rate limit (429)** responses
- Retry logic with **exponential backoff** was implemented
- Some filtering such as **price range and brand filtering is handled client-side**

---

# 🛠️ Improvements With More Time

Possible improvements :

- Implement API caching
- Add skeleton loaders
- Improve accessibility
- Add unit and integration tests
- Add sorting options (price, rating)
- Improve mobile responsiveness
- Introduce global state management if the app scales

---

# 📌 Summary

This project demonstrates:

- Clean React component architecture
- API integration
- Reusable hooks
- Combined filtering logic
- Robust error and loading state handling
- Efficient routing and filter persistence
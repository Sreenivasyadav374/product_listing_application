import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ProductDetail />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;

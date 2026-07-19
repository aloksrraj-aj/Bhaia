import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/compare/:id"
          element={
            <ProtectedRoute>
              <Compare />
            </ProtectedRoute>
          }
        />
<Route
  path="/payment"
  element={
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  }
/>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

          <Route
            path="/change-password"
            element={
                <ProtectedRoute>
                <ChangePassword />
                </ProtectedRoute>
              }
        />
        <Route
    path="/product/:id"
    element={
        <ProtectedRoute>
            <ProductDetails/>
        </ProtectedRoute>
    }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
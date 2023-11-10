import React, { lazy, Suspense } from "react";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/common/Loader";
import AccountPage from "./pages/AccountPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
import { ProductProvider } from "./ProductContext";

function App() {
  const authToken = sessionStorage.getItem("auth_token");
  return (
    <div className="App">
      <ProductProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="loader"><Loader /></div>}>
        <Routes>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          {authToken ? <Route path="/login" element={<Navigate to="/dashboard" />} /> : <Route path="/login" element={<LoginPage />} />}
          {authToken ? <Route path="/dashboard" element={<DashboardPage />} /> : <Route path="/dashboard" element={<Navigate to="/login" />} />}
          {authToken ? <Route path="/account" element={<AccountPage />} /> : <Route path="/account" element={<Navigate to="/login" />} />}
        </Routes>
        </Suspense>
      </BrowserRouter>
      </ProductProvider>
    </div>
  );
}

export default App;

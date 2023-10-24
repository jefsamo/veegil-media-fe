import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Withdraw from "./pages/Withdraw/Withdraw";
import Transfer from "./pages/Transfer/Transfer";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
      <Toaster />
      <Routes>
        {/* <Route index element={<Navigate replace to="/" />} /> */}
        <Route path="/" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

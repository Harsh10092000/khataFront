import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MainPage from "./pages/mainpage/MainPage";
import NotFound from "./pages/notfound/NotFound";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Contact from "./pages/contactUs/Contact";
import Supplier from "./pages/supplier/Supplier";
import Services from "./pages/services/Services";
import Products from "./pages/products/Products";
import Cashbook from "./pages/cashbook/Cashbook";
import Expenses from "./pages/expenses/Expenses";
import Sales from "./pages/sales/sales";
import SalesForm from "./pages/salesForm/SalesForm";
import CustomerReport from "./pages/customerReport/CustomerReport";
import SupplierReport from "./pages/supplierReport/SupplierReport";
import CashReport from "./pages/cashReport/CashReport";
import SalesReport from "./pages/salesReport/SalesReport";
import Purchase from "./pages/purchase/Purchase";
import PurchaseForm from "./pages/purchaseForm/PurchaseForm";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/supplier",
      element: <Supplier />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/cashbook",
      element: <Cashbook />,
    },
    {
      path: "/expenses",
      element: <Expenses />,
    },
    {
      path: "/sales",
      element: <Sales />,
    },
    {
      path: "/salesform",
      element: <SalesForm />,
    },
    {
      path: "/custReport",
      element: <CustomerReport />,
    },
    {
      path: "/supReport",
      element: <SupplierReport />,
    },
    {
      path: "/cashReport",
      element: <CashReport />,
    },
    {
      path: "/salesReport",
      element: <SalesReport />,
    },
    {
      path: "/purchase",
      element: <Purchase />,
    },
    {
      path: "/purchaseForm",
      element: <PurchaseForm />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

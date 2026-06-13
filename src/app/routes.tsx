import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/dashboard/Dashboard";
import { TenVariants } from "./components/ten/TenVariants";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TenVariants,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  }
]);

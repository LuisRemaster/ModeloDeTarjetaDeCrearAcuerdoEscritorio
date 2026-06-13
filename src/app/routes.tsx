import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ForgeVariants } from "./components/ten/ForgeVariants";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ForgeVariants,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  }
]);

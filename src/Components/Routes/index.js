
import SignIn from '../SignIn/Sign'
import Dashboard from '../Admin/Dashboard'
import SiteManagerAdmin from '../Admin/Components/Sitemangers.Admin'
import SuppliersAdmin from '../Admin/Components/Suplier.Admin'
import OrderManagement from '../Admin/Components/Order.Admin'
import SingleOrder from '../Admin/Components/Single.Order'





let indexRoutes = [

  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    exact: true,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/sitemanagers",
    name: "SiteManagerAdmin",
    component: SiteManagerAdmin,
    exact: true,
  },
  {
    path: "/admin/suppliers",
    name: "SuppliersAdmin",
    component: SuppliersAdmin,
    exact: true,
  },
  {
    path: "/admin/orders",
    name: "OrderManagement",
    component: OrderManagement,
    exact: true,
  },
  {
    path: "/admin/orders/1",
    name: "SingleOrder",
    component: SingleOrder,
    exact: true,
  },
  {
    path: "/*",
    name: "SignIn",
    component: SignIn,
  },
];

export default indexRoutes;

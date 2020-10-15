
import SignIn from '../SignIn/Sign'
import Dashboard from '../Admin/Dashboard'
import SiteManagerAdmin from '../Admin/Components/Sitemangers.Admin'
import createUser from '../Admin/Components/createUser.Admin'
import SuppliersAdmin from '../Admin/Components/Suplier.Admin'
import OrderManagement from '../Admin/Components/Order.Admin'
import SingleOrder from '../Admin/Components/Single.Order'
import SitesManagment from '../Admin/Components/Sites.Admin'
import ItemsManagement from '../Admin/Components/Items.Admin'
import AddItem from '../Admin/Components/addItems.Admin';
import ApprovedOrders from '../Orders/approved.order';
import RejectedOrders from '../Orders/reject.order';
import PendingOrders from '../Orders/pending.order';






let indexRoutes = [

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
    path: "/admin/createUser",
    name: "createUser",
    component: createUser,
    exact:true,
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
    path: "/admin/sites",
    name: "SitesManagment",
    component: SitesManagment,
    exact: true,
  },
  {
    path: "/admin/items",
    name: "ItemsManagement",
    component: ItemsManagement,
    exact:true,
  },  
  {
    path: "/admin/AddItem",
    name: "AddItem",
    component: AddItem,
    exact:true,
  },
  {
    path: "/admin/pending",
    name: "PendingOrders",
    component: PendingOrders,
    exact:true,
  },
  {
    path: "/admin/approved",
    name: "ApprovedOrders",
    component: ApprovedOrders,
    exact:true,
  },
  {
    path: "/admin/rejected",
    name: "RejectedOrders",
    component: RejectedOrders,
    exact:true,
  },
  {
    path: "/admin/orders/1",
    name: "SingleOrder",
    component: SingleOrder,
    exact: true,
  },
];

export default indexRoutes;

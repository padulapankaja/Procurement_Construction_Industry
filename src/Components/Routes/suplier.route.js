
import SignIn from '../SignIn/Sign'
import Dashboard from '../Admin/Dashboard'
import SingleOrder from '../Admin/Components/Single.Order'
import ApprovedOrders from '../Orders/supplier_completed';
import RejectedOrders from '../Orders/reject.order';
import PendingOrders from '../Orders/supplier_pending';


let indexRoutes = [

  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/pending",
    name: "PendingOrders",
    component: PendingOrders,
    exact:true,
  },
  {
    path: "/admin/completed",
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
    path: "/admin/orders/:id",
    name: "SingleOrder",
    component: SingleOrder,
    exact: true,
  },
];

export default indexRoutes;

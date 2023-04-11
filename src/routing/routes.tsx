import { BsListNested } from "react-icons/bs";
import { CreateCompany } from "views/company/CreateCompany";
import { CreateInventory } from "views/inventory/CreateInventory";
import { FiList } from "react-icons/fi";
import { IoBusiness } from "react-icons/io5";
import ListCompany from "views/company/ListCompany";
import ListInventory from "views/inventory/ListInventory";
import { Logout } from "auth/Logout";
// Icon Imports
import {
  MdOutlineInventory2,
} from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

// Admin Imports



// Auth Imports


const routes: RoutesType[] = [
  {
    name: "Crear empresa",
    layout: "/",
    path: "create-company",
    icon: <IoBusiness className="h-6 w-6" />,
    component: <CreateCompany />,
    secondary: true,
    roles:["Admin"]
  },
  {
    name: "Listar empresas",
    layout: "/",
    icon: <BsListNested className="h-6 w-6" />,
    path: "list-company",
    component: <ListCompany />,
    roles:["Admin", "User"]
  },
  {
    name: "Crear inventario",
    layout: "/",
    path: "create-inventory",
    icon: <MdOutlineInventory2 className="h-6 w-6" />,
    component: <CreateInventory />,
    roles:["Admin"]
  },
  {
    name: "Listar inventario",
    layout: "/",
    path: "list-inventory",
    icon: <FiList className="h-6 w-6" />,
    component: <ListInventory />,
    roles:["Admin", "User"]
  },
  {
    name: "Cerrar sesión",
    layout: "/",
    path: "auth/logout",
    icon: <RiLogoutBoxRLine className="h-6 w-6" />,
    component: <Logout />,
     roles:["Admin", "User"]
  },
];
export default routes;

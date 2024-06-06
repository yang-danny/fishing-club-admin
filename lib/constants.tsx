import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    Tag,
    UsersRound,
    Newspaper,
    CalendarClock,
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon: <LayoutDashboard />,
      label: "Dashboard",
    },
    {
      url: "/events",
      icon: <CalendarClock />,
      label: "Events",
    },
    {
      url: "/publishNews",
      icon: <Newspaper />,
      label: "Publish News",
    },
    {
      url: "/collections",
      icon: <Shapes />,
      label: "Collections",
    },
    {
      url: "/products",
      icon: <Tag />,
      label: "Products",
    },
    {
      url: "/orders",
      icon: <ShoppingBag />,
      label: "Orders",
    },
    {
      url: "/customers",
      icon: <UsersRound />,
      label: "Customers",
    },
  ];
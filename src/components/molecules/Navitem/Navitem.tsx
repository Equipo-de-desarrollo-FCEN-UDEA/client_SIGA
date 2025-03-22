import { usePathname } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { IoEarthOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { NavButton } from "@/components/atoms/buttons/NavButton";
import React from "react";


const useNavItems = (items: { title: string; href: string; icon: React.ReactNode }[]) => {
  const pathname = usePathname();

  return items.map((item) => ({
    ...item,
    active: item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  }));
};
export const NavApplications = () =>
  useNavItems([
    {
      title: "Movilidad",
      href: "/solicitudes/movilidad/create",
      icon: <IoEarthOutline size={25} />
    },
    {
      title: "Compras",
      href: "/solicitudes/compra/crear",
      icon: <LuShoppingCart size={25} />
    },
  ]);

export const NavLinks = () =>
  useNavItems([
    {
      title: "Inicio",
      href: "/",
      icon: <AiOutlineHome size={25} />
    },
    // { title: "Perfil", 
    //   href: "/", 
    //   icon: null },
  ]);

export const SideNavItem: React.FC<{
  label: string;
  path: string;
  icon: React.ReactNode;
  active: boolean;
  isExpanded: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ label, path, icon, active, isExpanded, className, onClick}) => (
  <NavButton
    label={label}
    href={path}
    icon={icon}
    iconPosition="left"
    isActive={active}
    isExpanded={isExpanded}
    className={className}
    onClick={onClick}
  />
);


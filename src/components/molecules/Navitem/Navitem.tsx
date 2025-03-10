import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { IoEarthOutline } from "react-icons/io5";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";


export const NavItems = () => {
    const pathname = usePathname();

    function inNavItemActive(pathname: string, nav: string) {
        return pathname.includes(nav);
    }
    return [
        // {
        //     title: "Home",
        //     href: "/",
        //     icon: "",
        //     position: "top",
        //     active: inNavItemActive(pathname, "/"),
        // },
        // {
        //     title: "Perfil",
        //     href: "/",
        //     icon: "",
        //     position: "top",
        //     active: inNavItemActive(pathname, "/"),
        // },
        {
            title: "Movilidad",
            href: "/solicitudes/movilidad/create",
            icon: <IoEarthOutline size ={30}/>,
            position: "top",
            active: inNavItemActive(pathname, "/movilidad/create"),
        },
        {
            title: "Compras",
            href: "/solicitudes/compra/crear",
            icon: <LuShoppingCart size ={30}/>,
            position: "top",
            active: inNavItemActive(pathname, "/compra/crear"),
        }
    ]
}

export const SideNavItem: React.FC<{
    label: string;
    path: string;
    icon: React.ReactNode;
    active: boolean;
    isSidebarExpanded: boolean;
}> = ({ label, path, icon, active, isSidebarExpanded }) => (
    <>
        {isSidebarExpanded ? (
            <Link 
            href={path}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition 
                ${active ? "text-green-700 font-semibold hover:bg-gray-200" : "hover:bg-gray-200 text-gray-800"}
            `}
            >
            <div className="flex items-center gap-3 w-full">
                {icon} 
                <span className={active ? "font-semibold" : "font-medium"}>{label}</span>
            </div>
            </Link>
        ) : (
            <Tooltip.Provider delayDuration={70}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link
                      href={path}
                      className={`flex items-center justify-center w-12 h-12 rounded-lg transition ${
                        active ? "text-green-700 hover:bg-gray-200" : "hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      {icon}
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="left"
                      sideOffset={10}
                      className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md"
                    >
                      {label}
                      <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        )}
    </>
);

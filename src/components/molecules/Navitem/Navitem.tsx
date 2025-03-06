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
            icon: <IoEarthOutline size ={30} color="green"/>,
            position: "top",
            active: inNavItemActive(pathname, "/movilidad/create"),
        },
        {
            title: "Compras",
            href: "/solicitudes/compra/crear",
            icon: <LuShoppingCart size ={30} color="green"/>,
            position: "top",
            active: inNavItemActive(pathname, "/compras/crear"),
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
                    className={`flex items-center gap-2 p-2 rounded-lg`}
                >
                    <div className="flex items-center justify-center w-8 h-8">
                        <span className="flex gap-3 items-end font-medium hover:text-green-800 ">
                            {icon} {label}
                        </span>
                    </div>
                </Link>
            ) : (
                <Tooltip.Provider delayDuration={70}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Link
                          href={path}
                          className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                            active ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-center w-8 h-8">
                            {icon}
                          </div>
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
    )
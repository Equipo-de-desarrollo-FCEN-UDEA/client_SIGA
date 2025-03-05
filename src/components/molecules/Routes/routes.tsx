import { usePathname } from "next/navigation";

export const NavItems = () => {
    const pathname = usePathname();

    function inNavItemActive(pathname: string, nav: string) {
        return pathname.includes(nav);
    }
    return [
        {
            title: "Home",
            href: "/",
            icon: "",
            // position: "top",
            active: inNavItemActive(pathname, "/"),
        },
        {
            title: "Perfil",
            href: "/",
            icon: "",
            // position: "top",
            active: inNavItemActive(pathname, "/"),
        },
        {
            title: "Movilidad",
            href: "/movilidad/create",
            icon: "",
            // position: "top",
            active: inNavItemActive(pathname, "/movilidad/create"),
        },
        {
            title: "Compras",
            href: "/compras/crear",
            icon: "",
            // position: "top",
            active: inNavItemActive(pathname, "/compras/crear"),
        }
    ]
}
import { useSidebar } from '@/Components/Sidebar/SidebarContext';
import {
    BerandaIcon,
    ChevronDownIcon,
    FAQIcon,
    ModulDiklatIcon,
    ProsedurKerjaIcon,
    VideoTutorialIcon
} from "@icons";
import { Link, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from "react";
import logo from '../../../images/bea-cukai.png';


const othersItems = [];

const AppSidebar = () => {
    const [daftarAlat, setDaftarAlat] = useState([]);
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const { url } = usePage();
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    const isActive = useCallback(
        (path) => location.pathname === path,
        [location.pathname]
    );

    // Fetch daftar alat untuk Video Tutorial
    useEffect(() => {
        fetch('/user/daftar-alat')
            .then(res => res.json())
            .then(data => setDaftarAlat(data.alats || []))
            .catch(err => console.error('Fetch error:', err));
    }, []);

    const navItems = [
        { icon: <BerandaIcon />, name: "Beranda", path: "/" },
        { icon: <ProsedurKerjaIcon />, name: "Prosedur Kerja", path: "/user/prosedur-kerja" },
        { icon: <ModulDiklatIcon />, name: "Modul Diklat", path: "/user/modul-diklat" },
        {
            icon: <VideoTutorialIcon />,
            name: "Video Tutorial",
            path: "/user/video-tutorial",
            subItems: daftarAlat.map((alat) => ({
                name: alat.nama_alat,
                path: `/user/video-tutorial/${alat.id}`,
            })),
        },
        { icon: <FAQIcon />, name: "FAQ", path: "/user/faq" },
    ];

    // Otomatis buka submenu kalau URL cocok
    useEffect(() => {
        let found = false;
        ["main", "others"].forEach((menuType) => {
            const items = menuType === "main" ? navItems : othersItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({ type: menuType, index });
                            found = true;
                        }
                    });
                }
            });
        });
        if (!found && openSubmenu === null) setOpenSubmenu(null);
    }, [location.pathname, navItems]);

    // Hitung tinggi submenu otomatis
    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu, daftarAlat]);

    const handleSubmenuToggle = (index, menuType, navName) => {
        setOpenSubmenu((prev) => {
            if (prev && prev.type === menuType && prev.index === index) return null;
            return { type: menuType, index };
        });

        // Kalau ini Video Tutorial → langsung ke halaman utama
        if (navName === "Video Tutorial") {
            router.visit("/user/video-tutorial");
        }
    };

    const renderMenuItems = (items, menuType) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType, nav.name)}
                            className={`menu-item group flex items-center w-full gap-2 ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    isActive(nav.path)
                                    ? "menu-item-icon-active"
                                    : "menu-item-icon-inactive"
                                }`}
                                >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType && openSubmenu?.index === index
                                            ? "rotate-180 text-main-blue"
                                            : ""
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                href={nav.path}
                                className={`menu-item group flex items-center gap-2 ${
                                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                    }`}
                                    >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => (subMenuRefs.current[`${menuType}-${index}`] = el)}
                            className="overflow-hidden transition-all duration-300 mt-2"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            href={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? "menu-dropdown-item-active"
                                                    : "menu-dropdown-item-inactive"
                                            }`}
                                        >
                                            {subItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
                ${isMobileOpen ? "w-full" : "w-0"}
                ${isExpanded || isHovered ? "lg:w-[290px]" : "lg:w-[90px]"}
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="py-6 flex justify-center">
                <Link href="/user/dashboard">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img className="dark:hidden" src={logo} alt="Logo" width={80} height={40} />
                            <img className="hidden dark:block" src={logo} alt="Logo" width={80} height={40} />
                        </>
                    ) : (
                        <img src={logo} alt="Logo" width={32} height={32} />
                    )}
                </Link>
            </div>
            {/* Desktop */}
            {(isExpanded || isHovered) && (
                <h1 className="text-2xl font-extrabold text-main-blue text-center mb-6 lg:block hidden">
                    SIMIPANAR
                </h1>
            )}
            {/* md & mobile */}
            {isMobileOpen && (
                <h1 className="text-2xl font-extrabold text-main-blue text-center mb-6 lg:hidden">
                    SIMIPANAR
                </h1>
            )}

            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">{renderMenuItems(navItems, "main")}</nav>
            </div>
        </aside>
    );
};

export default AppSidebar;

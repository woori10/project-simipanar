import { useSidebar } from '@/Components/Sidebar/SidebarContext';
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import {
    BerandaIcon,
    ChevronDownIcon,
    FAQIcon,
    ModulDiklatIcon,
    ProsedurKerjaIcon,
    UserCircleIcon,
    VideoTutorialIcon
} from "@icons";
import { Link, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from "react";
import logo from '../../../images/bea-cukai.png';


const navItems = [
  {
    icon: <BerandaIcon />,
    name: "Beranda",
    path: "/admin/dashboard",
  },
  {
    icon: <ProsedurKerjaIcon />,
    name: "Prosedur Kerja",
    path: "/admin/kelola-prosedur-kerja",
  },
  {
    icon: <Squares2X2Icon className="text-main-blue" />,
    name: "Daftar Alat",
    path: "/admin/kelola-daftar-alat",
  },
  {
    icon: <ModulDiklatIcon />,
    name: "Modul Diklat",
    path: "/admin/kelola-modul-diklat",
  },
    {
    icon: <FAQIcon />,
    name: "FAQ",
    path: "/admin/kelola-faq",
  },
  {
    icon: <VideoTutorialIcon />,
    name: "Video Tutorial",
    path: "/admin/kelola-video-tutorial",
  },
  {
    icon: <UserCircleIcon className="text-main-blue" />,
    name: "User",
    path: "/admin/kelola-user",
  },
];


const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { url } = usePage();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
//   const [subMenuRefs = subMenuRefs] = useState({});
  const subMenuRefs = useRef({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );



  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
        if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
            setOpenSubmenu({ type: "main", index });
            submenuMatched = true;
            }
        });
        }
    });

    if (!submenuMatched) {
        setOpenSubmenu(null);
    }
    }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
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
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
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
             ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
              className="overflow-hidden transition-all duration-300"
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
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
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
        ${isMobileOpen ? "w-full" : "w-0"}   // full screen di mobile
        ${isExpanded || isHovered ? "lg:w-[290px]" : "lg:w-[90px]"}  // desktop
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 flex justify-center`}
      >
        {/* Logo */}
        <Link href="/user/dashboard">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src={logo}
                alt="Logo"
                width={80}
                height={40}
              />
              <img
                className="hidden dark:block"
                src={logo}
                alt="Logo"
                width={80}
                height={40}
              />
            </>
          ) : (
            <img
              src={logo}
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      {(isExpanded || isHovered || isMobileOpen) && (
        <h1 className="text-2xl font-extrabold text-main-blue text-center mb-6">
            ADMIN
        </h1>
        )}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {/* <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-red-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontalIcon className="size-6" />
                )}
              </h2> */}
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;

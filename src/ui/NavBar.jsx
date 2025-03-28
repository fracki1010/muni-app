import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth/thunks";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Recursos", path: "/resources" },
  { name: "Entradas", path: "/stockIn" },
  { name: "Salidas", path: "/stockOut" },
];

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const logout = () => {
     dispatch(startLogout()); 
  }

  return (
    <main className="h-screen">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <img
              src="./../../../assets/muni-app.png"
              alt="logo"
              height={100}
              width={100}
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <img
              src="./../../../assets/muni-app.png"
              alt="logo"
              height={100}
              width={100}
            />
          </NavbarBrand>
          {menuItems.map((item, index) => {
            return (
              <NavbarMenuItem
                cursor="pointer"
                key={`${item}-${index}`}
                isActive={item.path === location.pathname}
                >
                <Link
                className={ item.path === location.pathname ? 'cursor-pointer transition duration-250 text-primary' : 'cursor-pointer' }
                  color="foreground"
                  onPress={() => navigate(item.path)}
                  // href={item.path}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          <Button color="warning" onPress={logout} variant="flat">
            Logout
          </Button>
        </NavbarContent>
        {/* <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="warning" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent> */}

        <NavbarMenu className="bg-[var(--heroui-theme-colors-background)]">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.name}-${index}`}
              isActive={item.path === location.pathname}
            >
              <Link
                className={`${item.path === location.pathname && 'font-bold text-2xl'} w-full`}
                size="lg"
                onPress={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </main>
  );
};

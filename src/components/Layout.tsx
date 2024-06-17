import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/logo.svg?react";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-40 flex justify-center p-4">
        <nav className="flex gap-2 border-neutral-400 p-2 rounded-xl bg-neutral-950/60 backdrop-blur-lg text-white">
          <Logo className="translate-x-[3%] w-12 h-fit" />
          <ul className="flex justify-center">
            <li className="flex justify-center items-center rounded-full px-4 py-2 transition-colors duration-300 hover:bg-neutral-900/40">
              {/* @ts-expect-error passing unknown prop to a html element */}
              <Link to="/" className="" name="test" >Accueil</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/logo.svg?react";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-40 flex justify-center p-4">
        <nav className="flex gap-2 border-neutral-400 p-2 rounded-xl bg-neutral-950/60 backdrop-blur-lg text-white">
          <Logo className="translate-x-[3%] w-12 h-fit max-h-12" />
          <ul className="flex justify-center">
            <li className="flex justify-center items-center rounded-full px-4 py-2 transition-colors duration-300 hover:bg-neutral-900/40">
              <Link to="/" className="" title="Accueil" >Accueil</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />

      <footer className="flex flex-col items-center justify-center p-4">
        <p className="text-center text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} - <strong className="font-semibold">OnMangeOù ?</strong> - Tous droits réservés
        </p>
        <p className="text-center text-neutral-500 text-sm">
          Réalisé avec ❤️ par Maxime, Pierre, Raphael et <a href="https://www.sygix.fr/">Simon</a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
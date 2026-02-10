import Link from "next/link";
import MainMenuSub from "./main-menu-sub";
import EditIcon from "./main-edit";
import AuthButtons from "./main-signin";

export default function MainMenu() {
  return (
    <nav className="fixed flex flex-row-reverse w-full top-0 z-100 bg-linear-to-b from-black/50 to-black/0">
      <ul className="flex text-light">
        <li className="menu-item group">
          <Link
            className="flex items-center px-8 py-2 text-center uppercase"
            href="/svet"
          >
            Svět
            <span className="text-[6px] ml-1 group-hover:rotate-180 transition-all duration-200">
              &#9650;
            </span>
          </Link>
          <MainMenuSub />
        </li>
        <li className="menu-item">
          <Link
            className="flex items-center px-8 py-2 text-center uppercase"
            href="/postavy"
          >
            Postavy
          </Link>
        </li>
        <li className="menu-item">
          <Link
            className="flex items-center px-8 py-2 text-center uppercase"
            href="/tazeni"
          >
            Tažení
          </Link>
        </li>
        <li className="menu-item">
          <Link
            className="px-8 py-2 block w-full text-center uppercase"
            href="/bestiar"
          >
            Bestiář
          </Link>
        </li>
        <li>
          <EditIcon />
        </li>
        <li>
          <AuthButtons />
        </li>
      </ul>
    </nav>
  );
}

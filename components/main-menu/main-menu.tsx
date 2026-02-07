import Link from "next/link";
import MainMenuSub from "./main-menu-sub";
import EditIcon from "./main-edit";
import AuthButtons from "./main-signin";

export default function MainMenu() {
  return (
    <nav className="sticky top-0 z-100">
      <div className="bg-black h-2"></div>
      <ul className="grid grid-cols-4 bg-black max-w-3xl mx-auto px-4 pb-2 rounded-b-xl">
        <li className="relative group bg-background">
          <Link className="px-8 py-2 border block text-center" href="/svet">
            Svět <span className="text-xs">&#9650;</span>
          </Link>
          <MainMenuSub />
        </li>
        <li className="bg-background">
          <Link
            className="px-8 py-2 border block w-full text-center"
            href="/postavy"
          >
            Postavy
          </Link>
        </li>
        <li className="bg-background">
          <Link
            className="px-8 py-2 border block w-full text-center"
            href="/tazeni"
          >
            Tažení
          </Link>
        </li>
        <li className="bg-background">
          <Link
            className="px-8 py-2 border block w-full text-center"
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

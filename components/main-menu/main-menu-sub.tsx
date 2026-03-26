import NavLinkSub from './nav-link-sub';

export default function MainMenuSub() {
  return (
    <ul className="absolute opacity-0 invisible -left-5 -right-5 border bg-background border-stone-500 py-2 px-4 group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <li className="text-center">
        <NavLinkSub href="/svet/kraje-a-mista">Kraje a místa</NavLinkSub>
      </li>
      <li className="text-center">
        <NavLinkSub href="/svet/mapy">Mapy</NavLinkSub>
      </li>
      <li className="text-center">
        <NavLinkSub href="/svet/nabozenstvi">Náboženství</NavLinkSub>
      </li>
      <li className="text-center">
        <NavLinkSub href="/svet/spojenci">Spojenci</NavLinkSub>
      </li>
      <li className="text-center">
        <NavLinkSub href="/svet/nepratele">Nepřátelé</NavLinkSub>
      </li>
    </ul>
  );
}

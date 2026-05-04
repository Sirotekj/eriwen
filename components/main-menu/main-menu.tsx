import MainMenuSub from './main-menu-sub';
import EditIcon from './main-edit';
import AuthButtons from './main-signin';
import MainMenuMobile from './main-menu-mobile';
import NavLink from './nav-link';

export default function MainMenu() {
  const svetSubMenu = [
    {
      url: '/svet/kraje-a-mista',
      label: 'Kraje a místa',
    },
    {
      url: '/svet/mapy',
      label: 'Mapy',
    },
    {
      url: '/svet/nabozenstvi',
      label: 'Náboženství',
    },
    {
      url: '/svet/spojenci',
      label: 'Spojenci',
    },
    {
      url: '/svet/nepratele',
      label: 'Nepřátelé',
    },
  ];
  const pravidlaSubMenu = [
    {
      url: '/pravidla/bestiar',
      label: 'Bestiář',
    },
  ];
  return (
    <>
      <nav className="fixed flex flex-row-reverse w-full top-0 z-100 bg-linear-to-b from-black/75 to-black/0">
        <ul className="text-light font-headlines flex">
          <li className="menu-item">
            <NavLink href="/">Úvod</NavLink>
          </li>
          <li className="menu-item -mr-1 group">
            <NavLink href="/svet">
              <span className="mr-1">Svět</span>
              <span className="text-[6px] group-hover:rotate-180 transition-all duration-200">
                &#9650;
              </span>
            </NavLink>
            <MainMenuSub options={svetSubMenu} />
          </li>
          <li className="menu-item">
            <NavLink href="/postavy">Postavy</NavLink>
          </li>
          <li className="menu-item">
            <NavLink href="/tazeni">Tažení</NavLink>
          </li>
          <li className="menu-item">
            <NavLink href="/pravidla">Pravidla</NavLink>
          </li>
          <li>
            <EditIcon />
          </li>
          <li>
            <AuthButtons />
          </li>
          <li className="menu-item block md:hidden">
            <MainMenuMobile />
          </li>
        </ul>
      </nav>
    </>
  );
}

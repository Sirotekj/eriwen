import NavLinkSub from './nav-link-sub';

type Props = { options: { url: string; label: string }[] };

export default function MainMenuSub({ options }: Props) {
  return (
    <ul className="absolute opacity-0 invisible -left-5 -right-5 border bg-background border-stone-500 py-2 px-4 group-hover:opacity-100 group-hover:visible transition-all duration-200">
      {options.map((link) => (
        <li key={link.url} className="text-center">
          <NavLinkSub href={link.url}>{link.label}</NavLinkSub>
        </li>
      ))}
    </ul>
  );
}

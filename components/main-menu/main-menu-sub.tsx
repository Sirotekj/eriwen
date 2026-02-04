import Link from "next/link";
export default function MainMenuSub() {
  return (
    <ul className="absolute opacity-0 invisible w-full border bg-background border-stone-500 py-2 px-4 group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <li className="text-center">
        <Link href="/svet/kraje-a-mista">Kraje a místa</Link>
      </li>
      <li className="text-center">
        <Link href="/svet/nabozenstvi">Náboženství</Link>
      </li>
      <li className="text-center">
        <Link href="/svet/spojenci">Spojenci</Link>
      </li>
      <li className="text-center">
        <Link href="/svet/nepratele">Nepřátelé</Link>
      </li>
    </ul>
  );
}

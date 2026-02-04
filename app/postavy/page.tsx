import { getPostavy } from "@/lib/postavy";

export default async function PostavyPage() {
  const postavy = await getPostavy();
  return (
    <div>
      <h1>Postavy</h1>
      <ul>
        {postavy.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.race} ({p.profession})
          </li>
        ))}
      </ul>
    </div>
  );
}

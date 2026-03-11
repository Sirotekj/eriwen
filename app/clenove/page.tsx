export const dynamic = 'force-dynamic';
import { getUsers } from '@/lib/users';
export default async function Clenove() {
  const clenove = await getUsers();
  return (
    <div>
      <h2>Členové</h2>
      <ul>
        {clenove.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

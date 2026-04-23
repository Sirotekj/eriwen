export default function BestiarPage() {
  return (
    <div>
      <h1>Bestiář</h1>
      <p>
        Tady můžete najít vymyšlené stvůry a nepřátele, kteří jsou důležití,
        nebo se můžou hodit do budoucna.
      </p>
      <h3>Řasnatec - malý</h3>
      <table className="text-left">
        <tbody>
          <tr>
            <td className="p-1 w-1/2 border">Životy: 21</td>
            <td className="p-1 border">Úroveň: 4</td>
          </tr>
          <tr>
            <td className="p-1 border">
              Atributy: SIL 14 (+2), OBR 14 (+2), ODO 14 (+2), INT 1 (-5), CHAR
              9 (-1)
            </td>

            <td className="p-1 border">Velikost: B</td>
          </tr>
          <tr>
            <td className="p-1 border">
              Útočné číslo: (2+4/+1) = 6/+1 (zuby, drápy)
            </td>
            <td className="p-1 border"></td>
          </tr>

          <tr>
            <td className="p-1 border">
              Základní obrana: (2+1) = 3 (řasy) Zvl. schopnost: termovize, 2 ú/o
              za kolo, pasti* Obranné číslo: (2+1+3) = 6 (řasy)
            </td>
            <td className="p-1 border"></td>
          </tr>
          <tr>
            <td className="p-1 border">Pohyblivost: 40</td>
            <td className="p-1 border"></td>
          </tr>

          <tr>
            <td className="p-1 border">Zkušenost: 100</td>
            <td className="p-1 border">Poklad: kyselina</td>
          </tr>
        </tbody>
      </table>
      <p>
        *v doupěti mívá pasti ze svých slin, louže kolem 30 coulů. Past Postřeh
        - 6, poté má přilepeno na botách - do 3 kol prožere boty a pak 1.kolo -
        Past ODO 10 (2 životy dolů), 2.kolo - Past ODO 8 (2 životy dolů), 3.kolo
        - Past ODO 6 (1 život dolů), 4.kolo - Past ODO 4 (1 život dolů)
      </p>
    </div>
  );
}

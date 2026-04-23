import Image from 'next/image';
export default function MapyPage() {
  return (
    <>
      <h2>Mapy</h2>
      <p>Stránka je v přípravě!</p>
      <h3>Struktura</h3>
      <ul className="ml-4">
        <li>
          Království (Země)
          <ul className="ml-4 list-disc">
            <li>
              Dainovy hory (Kraj)
              <ul className="ml-4 list-disc">
                <li>Krompach (Místo)</li>
                <li>Kámen</li>
                <li>Vlkov</li>
              </ul>
            </li>
            <li>
              Rovaldsko
              <ul className="ml-4 list-disc">
                <li>Byrka</li>
                <li>Krčma „U netopýra“</li>
                <li>Hrad Oštěp</li>
                <li>Donharm</li>
              </ul>
            </li>

            <li>Kraj: </li>
          </ul>
        </li>

        <li>Země: Zavora</li>
      </ul>

      <h3>Království</h3>
      <div className="border">
        <Image
          className="w-full mix-blend-multiply"
          alt="Království"
          width="3504"
          height="2544"
          src="/images/mapy/kralovstvi.jpg"
        />
      </div>
    </>
  );
}

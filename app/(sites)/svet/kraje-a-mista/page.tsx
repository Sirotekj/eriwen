export const dynamic = 'force-dynamic';

import { getAllLokalita } from '@/lib/kraje-prisma';
import KrajeList from '@/components/kraje/kraje-list';

import Divider from '@/components/decorations/divider';

import { buildTree } from '@/components/kraje/kraje-helper';

export default async function KrajeMistaPage() {
  const lokality = await getAllLokalita();
  const tree = buildTree(lokality);
  return (
    <>
      <h1 className="headline">Kraje a místa</h1>

      {lokality.length > 0 ? (
        <KrajeList lokality={tree} />
      ) : (
        <>
          <p>
            <i>Ještě zde nejsou žádné popisy míst!</i>
          </p>

          <Divider />

          <div>
            <h2>Příklad</h2>
            <h2>Nainův kraj</h2>
            <h3>Krompach</h3>
            <p>
              Město je opevněné, vystavěný na skále na okraji hlubokého údolí.
              Na severu se nad ním zvedají příkré skály stovky metrů a za městem
              je vidět vysoký vodopád, před kterým kdysi vystavěli most, pro
              cestu do severozápadních krajů. Na jih se svažuje útes dolů do
              dlouhého údolí, do kterého vede cesta, která uhýbá pár set metrů
              na východ od města.
            </p>
            <p>
              Když se vejde hlavní bránou do města, vede jedna veliká ulice
              klikatě kolem všech domů do kopce až k hlavnímu paláci, kde sídlí
              starosta + úředníci, poslové atd., stráže. V horní části je ještě
              brána a samostatná opevněná čtvrť, která vede do dolů a bydlí a
              pracují zde převážně trpaslíci. Doly jsou staré a současně fungují
              jen částečně a nikdo neví až kam mohou vést.
            </p>

            <h3>Kámen</h3>
            <p>
              Vesnice na východním kraji Nainových hor. Začíná zde nainova cesta
              skrz hory. Živí se především zemědělstvím a pastevectvím. Kolem
              vsi jsou políčka, několik sadů a především vinice Je na jižním
              svahu. Kámen dostala podle kamene na severu vesnice, který vypadá
              jako nějaká stavba, jen je přírodní. Jsou v ní vyryty různé rýhy,
              možná i symboly. Je z časů, než přišli lidé do tohoto kraje.
            </p>

            <h2>Rovaldsko</h2>
            <p>
              <strong>Minulost kraje:</strong>
            </p>
            <p>
              Před 8 lety (při příchodu družiny) zde došlo k válce mezi
              trpaslíky a barbary. Důvodem byla naleziště stříbra v Oberonu.
              Původní obyvatelé - barbarské kmeny - nebyli vůči tamním lidem
              nepřátelští, většinou šlo o divoké lovce, ale najednou všem
              překáželi. Trpaslíci se domluvili s lidským rodem Argantů a
              společně barbary vyhnali pryč.
            </p>
            <p>
              Většina divokých kmenů odešla pryč, ale některé rodiny barbarů
              zůstaly a bylo jim dovoleno založit si osadu v kraji - Donharm. Je
              to odříznuté místo, kam většinou místní vůbec nechodí. Jedná se o
              starou křivdu, kterou barbaři nikdy neodpustili, proto jsou s nimi
              dodnes v kraji potíže. Zejména trpaslíci a barbaři jsou v kraji
              stále na nože a není neobvyklé, že v nějaké krčmě po povzbuzení
              alkoholem dojde k bitce, která končí i smrtí.
            </p>
            <p>
              Díky spojenectví s trpaslíky rod Argantů výrazně zbohatl, protože
              mu plynou ze stříbrných dolů nemalé zisky.
            </p>
            <h3>Krčma „U netopýra“</h3>
            <p>
              Významný zájezdní hostinec nacházející se na rušné cestovní
              křižovatce. Jedná se o velký hostinec s kamennou podsadou,
              dřevěnými nosníky a mohutnou doškovou střechou. Z velkého komína
              se zvedá kouř. Vedle krčmy stojí pár domků, stáje a velká stodola.
              V hostinci je vždy hodně hostů - primárně cestovatelé a
              obchodníci, díky čemuž je osazenstvo tvořena veškerou rasovou
              škálou od lidí, přes trpaslíky a hobity až po gnómy, elfy a
              barbary.
            </p>
            <p>
              <strong>Juraj</strong> - člověk, 50 let - majitel hostince
            </p>
            <h3>Byrka</h3>
            <p>
              <i>
                Už z dálky si všimnete mnoha střech a komínů, z nichž se táhnou
                k nebi sloupy dýmu. Pak se vám odkryje pohled na město v údolí.
                Nemá žádnou vnější ochranu, ani hradby ani palisádu, rozkládá se
                podél řeky. Není moc velké (*asi jako Krompach). Celému městu
                dominuje vysoká ostrovní skála připomínající pěst. Je na ní
                zbudovaný hrad s trojicí věží. Další vysoké stavby napovídají,
                že zde stojí různé chrámy.
              </i>
            </p>
            <p>
              Byrka je největší městečko v regionu. Jedná se o obchodní bod mezi
              severem a jihem. Leží na řece Lunaře poblíž Šeptajícího hvozdu,
              kde se zpracovává dřevo, z něhož městu plynou slušné zisky. Dřevo
              je známé svou kvalitou a posílá se po řece do dalších oblastí
              země. Úroveň města je spíš průměrná. Město nechrání žádná vnější
              hradba, pouze vnitřní cesntrum je chráněno palisádou. Přes řeku
              vedou dva dřevěné mosty. Stojí zde chrám Isila a také chrám bohyně
              Venat. Je zde veliký mlýn a také pila, kde se zpracovává dřevo,
              které se po vorech spouští dál na západ. Ve městě je řada
              řezbářských dílen, několik hostinců, proslulý nevěstinec “U Rúth”,
              kováři, řemeslníci, řezbáři, lovci a kožešníci atd.
            </p>
            <p>
              Město je proslulé dřevorubectvím (nábytek) a také uměleckými
              sochami, které se vyváží převážně na hrady lordů, klášterů a
              chrámů.
            </p>
            <p>
              <i>
                Velké množství nízkých dřevěných domků se tu na sebe agresivně
                tiskne na malých prostorách. Kamenné domy vidíte jen v centru,
                kde stojí náměstí. Ulice jsou plné lidí, občas zahlédnete stráž,
                která chodí po dvojicích, ozbrojení muži s kopími.
              </i>
            </p>
          </div>
        </>
      )}
    </>
  );
}

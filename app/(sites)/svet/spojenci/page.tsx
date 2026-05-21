export const dynamic = 'force-dynamic';

import Image from 'next/image';

import { getSpojenci } from '@/lib/clanek-prisma';
import ClanekList from '@/components/clanek/clanek-list';

import Divider from '@/components/decorations/divider';

export default async function SpojenciPage() {
  const spojenci = await getSpojenci();
  return (
    <div>
      <h1 className="headline">Spojenci</h1>
      <p>
        Výčet spojenců a přátel družiny, na které narazila v průběhu svých
        dobrodružství.
      </p>

      {spojenci.length > 0 ? (
        <ClanekList clanek={spojenci} />
      ) : (
        <p>
          <i>Ještě zde nejsou žádní spojenci!</i>
        </p>
      )}

      <Divider />

      <div>
        <h2>Příklad</h2>
        <h3>Společnost „Oris a synové“</h3>
        <p>
          Největší doručovací společnost v Krompachu. Zařizuje přepravu zboží
          všeho druhu a jeho ochranu pro západní kraje. Vlivná rodina, politicky
          i jměním. Společnost má pobočky v každém městečku i větším městě kolem
          Krompachu, jako jsou například Byrka, Uhelné město nebo Velkobrod.
          Družina si zajistila přátelství rodiny záchranou Stefana Orise, díky
          čemuž její pověst v Krompachu vzrostla.
        </p>
        <h4>Alexandr Oris</h4>
        <p>
          Hlava společnosti. Významný obchodník a dobrý přítel starosty
          Krompachu. Má dva syny, staršího <strong>Stefana</strong> a mladšího{' '}
          <strong>Tyrose</strong>.
        </p>
        <h4>Stefan Oris</h4>
        <div className="relative float-left max-w-xs w-1/3 aspect-216/241 mr-4 mb-4">
          <Image
            src="/images/spojenci/stefan-oris.jpg"
            alt="Stefan Oris"
            fill
            objectFit="contain"
          />
        </div>
        <p>
          Stefan měl dobrodružnou duši a malý zájem na chod otcovi společnosti.
          Za mlada procestoval velký kus říše se svým věrným bílým vlkem po
          boku. Družina mu zachránila život v Rovaldsku, kde se ztratil. Družina
          svobodila Stefana ze zajetí šíleného alchymisty Isidora dřív, než byl
          přeměněn na sešívanou obludu.
        </p>
        <h4 className="clear-both">Corwin</h4>
        <p>
          Statný válečník středních let. Věrný služebník rodiny Orisů, který se
          stará o ochranu firmy v Krompachu. Organizuje zakázky a má na starost
          nábor žoldáků. Roku 742 najal družinu, aby našla ztraceného Stefana.
        </p>
      </div>
    </div>
  );
}

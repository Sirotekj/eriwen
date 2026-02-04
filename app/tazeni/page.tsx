import FormTazeni from "@/components/forms/form-tazeni";
export default async function TazeniPage() {
  return (
    <div>
      <h2>Tažení</h2>

      <div>
        <h3>Kniha Ezargoth</h3>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
          <dt>PJ:</dt>
          <dd>Kuba</dd>
          <dt>Postavy:</dt>
          <dd>Cilka, Kirin, Afpág</dd>
          <dt>Časové období:</dt>
          <dd>podzim 742</dd>
        </dl>
        <p>
          Postavy byly najmuty jako doprovod karavany ze vsi Kámen do města
          Krompach. Nesli s sebou dopis starostovi, kde upozorňoval na mizející
          mrtvé z hrobů. Po cestě je přepadli nemrtvé zombie, ale družina je
          pobila. V Krompachu se se starostou dohodli, že vše prošetří, zatímco
          starosta Krompachu poslal pro posili. Stopy družinu dovedly do staré
          zříceniny Reliktark, kde se strhl boj s nekromantem a jeho nemrtvými.
          Nekromant byl odpadlíkem z kláštera boha Isila a chtěl se pomstít.
          Družina po vítězství byla odměněna a nekromant na náměstí v Krompachu
          upálen. V klášteře od té doby hlídají stráže.
        </p>
      </div>
      <FormTazeni />
    </div>
  );
}

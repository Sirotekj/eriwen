import { Tazeni } from '@prisma/client';

type Props = {
  tazeni: Tazeni;
};

export default function TazeniItem({ tazeni }: Props) {
  return (
    <>
      <h3>{tazeni.name}</h3>

      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
        <dt>PJ:</dt>
        <dd>{tazeni.pj}</dd>

        <dt>Postavy:</dt>
        <dd>{tazeni.postavy}</dd>

        <dt>Časové období:</dt>
        <dd>{tazeni.obdobi}</dd>
      </dl>

      <p>{tazeni.content}</p>
    </>
  );
}

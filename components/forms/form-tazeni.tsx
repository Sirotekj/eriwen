import FormSubmit from "./form-submit";
import { createTazeni } from "@/lib/actions";
export default function FormTazeni() {
  return (
    <>
      <h4>Přidat tažení</h4>
      <main>
        <form
          action={createTazeni}
          className="border grid grid-cols-[120px_auto_120px_auto] gap-x-2 gap-y-4 p-4 mb-8 rounded-sm"
        >
          <label htmlFor="name">Název:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-sm border"
            required
          />
          <label htmlFor="pj">PJ:</label>
          <input
            type="text"
            id="pj"
            name="pj"
            className="rounded-sm border"
            required
          />
          <label htmlFor="postavy">Postavy:</label>
          <input
            type="text"
            id="postavy"
            name="postavy"
            className="rounded-sm border"
            required
          />
          <label htmlFor="obdobi">Časové období:</label>
          <input
            type="text"
            id="obdobi"
            name="obdobi"
            className="rounded-sm border"
            required
          />
          <label htmlFor="order">Pořadí:</label>
          <input
            type="text"
            id="order"
            name="order"
            className="rounded-sm border"
            required
          />
          <label htmlFor="pribeh" className="col-start-1">
            Příběh:
          </label>
          <textarea
            id="pribeh"
            name="pribeh"
            className="rounded-sm border col-start-2 col-end-5"
            required
          />
          <FormSubmit />
        </form>
      </main>
    </>
  );
}

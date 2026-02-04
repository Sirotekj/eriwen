import ImagePicker from "@/components/forms/image-picker";
import FormSubmit from "@/components/forms/form-submit";

export default function FormTazeni() {
  return (
    <>
      <header>Přidat tažení</header>
      <main>
        <form>
          <label htmlFor="jmeno">Jméno:</label>
          <input type="text" id="jmeno" name="jmeno" required />
          <label htmlFor="rasa">Rasa:</label>
          <input type="text" id="rasa" name="rasa" required />
          <label htmlFor="povolani">Povolání:</label>
          <input type="text" id="povolani" name="povolani" required />
          <label htmlFor="pribeh">Popis:</label>
          <textarea id="pribeh" name="pribeh" required />
          <ImagePicker label="Your image" name="image" />
          <FormSubmit />
        </form>
      </main>
    </>
  );
}

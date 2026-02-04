import FormSubmit from "./form-submit";
export default function FormTazeni() {
  return (
    <>
      <header>Přidat tažení</header>
      <main>
        <form>
          <label htmlFor="jmeno">PJ:</label>
          <input type="text" id="jmeno" name="jmeno" required />
          {/*Later add 
          <select id="cars" name="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>*/}
          <label htmlFor="postava">Postavy:</label>
          <input type="text" id="postava" name="postava" required />
          <label htmlFor="pribeh">Příběh:</label>
          <textarea id="pribeh" name="pribeh" required />
          {/*Later add 
          <select id="cars" name="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>*/}
          <FormSubmit />
        </form>
      </main>
    </>
  );
}

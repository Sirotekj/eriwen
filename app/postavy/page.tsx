import Image from "next/image";
import { getPostavy } from "@/lib/postavy";

export default async function PostavyPage() {
  const postavy = await getPostavy();
  console.log(postavy);
  return (
    <div>
      <h1>Postavy</h1>
      {/*<ul>
        {postavy.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.race} ({p.profession})
          </li>
        ))}
      </ul>*/}
      <ul>
        <li>
          <strong>Bered</strong> - trpaslík (válečník)
          <div className="relative float-left max-w-xs w-1/3 aspect-3/4 mr-4 mb-4">
            <Image
              className="object-cover"
              src="/images/bered.jpg"
              alt="bered"
              fill
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent
            id justo in neque elementum ultrices. Integer rutrum, orci
            vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae
            placerat pede sem sit amet enim. Praesent dapibus. Maecenas
            fermentum, sem in pharetra pellentesque, velit turpis volutpat ante,
            in pharetra metus odio a lectus. Integer pellentesque quam vel
            velit. Donec iaculis gravida nulla. Vivamus luctus egestas leo.
            Aenean placerat. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos hymenaeos. Fusce tellus odio, dapibus
            id fermentum quis, suscipit id erat. Maecenas lorem. Vestibulum
            fermentum tortor id mi. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Mauris metus. Phasellus
            enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nulla non
            lectus sed nisl molestie malesuada. Sed vel lectus. Donec odio
            tempus molestie, porttitor ut, iaculis quis, sem.
          </p>
        </li>
      </ul>
    </div>
  );
}

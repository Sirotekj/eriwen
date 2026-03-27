export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getEditMode } from '@/lib/edit-mode';
import { permissions } from '@/lib/permissions';

import { PageProps } from '@/types/types';
import { getPostavy } from '@/lib/postavy-prisma';
import PostavyList from '@/components/postavy/postavy-list';
import PostavyCreateToggle from '@/components/postavy/postavy-create-toggle';

export default async function PostavyPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const params = await searchParams;
  const editParamOn = params.edit === '1';

  const { isEditing } = getEditMode(role, editParamOn);

  const canCreate = permissions.canCreate({ role });

  const postavy = await getPostavy();

  return (
    <div>
      <h2>Postavy</h2>
      <blockquote></blockquote>
      <p>
        Zde můžete najít stručný popis postav a jakých tažení se zúčastnili.
      </p>
      {isEditing && canCreate && <PostavyCreateToggle />}
      <PostavyList
        postavy={postavy}
        role={role}
        userId={userId}
        isEditing={isEditing}
      />

      {/*<ul>
        <li>
          <strong>Bered</strong> - trpaslík (válečník)
          <ImageWrapper>
            <Image
              className="object-cover"
              src="/images/bered.jpg"
              alt="bered"
              fill
            />
          </ImageWrapper>
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
      </ul>*/}
    </div>
  );
}

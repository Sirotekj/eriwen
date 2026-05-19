'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import HoverWrapper from '@/components/utils/hover-wrapper';
import { IconKey } from '@/components/utils/svgs/icons';

export default function AuthButtons() {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isReader = session?.user?.role === 'READER';
  const isEditor = session?.user?.role === 'EDITOR';
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className="relative" ref={popupRef}>
      {/* BUTTON */}

      <HoverWrapper tooltip={session?.user?.image ? 'Odhlásit' : 'Přihlásit'}>
        <button
          type="button"
          title={session ? 'Účet' : 'Přihlášení'}
          className="w-10 h-10 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {session?.user?.image ? (
            <div className="rounded-full border w-9">
              <Image
                src={session.user.image}
                alt={session.user.name ?? 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
            <IconKey className="w-full h-full p-2" />
          )}
        </button>
      </HoverWrapper>

      {/* POPUP */}
      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 border bg-background p-4 shadow-xl">
          {session && session.user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <div className="rounded-full border color-light">
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? 'User'}
                      width={48}
                      height={48}
                      className="rounded-full border color-light"
                    />
                  </div>
                )}

                <div>
                  <p>{session.user.name}</p>

                  <p className="text-sm text-light">{session.user.email}</p>
                </div>
              </div>

              <div className="text-sm leading-relaxed text-light">
                {isReader && (
                  <p>Zatím nemůžeš editovat stránky, čekej na potvrzení.</p>
                )}
                {isEditor && (
                  <p>Můžeš přidávat nové příspěvky a editovat vlastní.</p>
                )}
                {isAdmin && <p>Můžeš editovat jakékoli příspěvky.</p>}

                <p className="mt-3 text-xs leading-relaxed text-light font-metamorphous">
                  Přihlášením souhlasíte se zpracováním základních údajů z
                  vašeho Google účtu (jméno, e-mail a profilová fotografie) za
                  účelem správy účtu a přístupu k editaci obsahu webu. Údaje
                  nejsou poskytovány třetím stranám a slouží pouze pro fungování
                  této aplikace.
                </p>
              </div>

              <button
                onClick={() => signOut()}
                className="flex w-full items-center justify-center gap-2 border px-4 py-2 text-sm transition cursor-pointer hover:bg-light hover:text-background"
              >
                {/*<IconLogout size={18} />*/}
                Odhlásit se
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Přihlášení</h3>

                <p className="mt-2 text-sm leading-relaxed text-light">
                  Pokud neznáte tvůrce webu, nepřihlašujte se. Editace se
                  povolují až po domluvě.
                </p>

                <p className="mt-3 text-xs leading-relaxed text-light font-metamorphous">
                  Přihlášením souhlasíte se zpracováním základních údajů z
                  vašeho Google účtu (jméno, e-mail a profilová fotografie) za
                  účelem správy účtu a přístupu k editaci obsahu webu. Údaje
                  nejsou poskytovány třetím stranám a slouží pouze pro fungování
                  této aplikace.
                </p>
              </div>

              <button
                onClick={() => signIn('google')}
                className="w-full rounded-xl border px-4 py-2 text-sm transition cursor-pointer hover:bg-light hover:text-background"
              >
                Přihlásit přes Google
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

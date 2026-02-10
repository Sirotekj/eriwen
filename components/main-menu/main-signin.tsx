"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import HoverWrapper from "@/components/utils/hover-wrapper";
import { IconKey } from "@/components/utils/svgs/icons";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <HoverWrapper tooltip="Odhlásit">
        <button
          title="Sign Out"
          className="m-1 ml-2 w-8 h-8 text-xs rounded-full border cursor-pointer"
          onClick={() => signOut()}
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : null}
        </button>
      </HoverWrapper>
    );
  }

  return (
    <HoverWrapper tooltip="Přihlásit">
      <button
        type="button"
        title="Sign in"
        className="w-10 h-10 text-xs cursor-pointer"
        onClick={() => signIn("google")}
      >
        <IconKey className="w-full h-full p-2" />
      </button>
    </HoverWrapper>
  );
}

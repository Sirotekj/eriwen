"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className="w-12 h-12 border text-xs" onClick={() => signOut()}>
        Odhlásit
      </button>
    );
  }

  return (
    <button
      className="w-12 h-12 border text-xs"
      onClick={() => signIn("google")}
    >
      Přihlásit
    </button>
  );
}

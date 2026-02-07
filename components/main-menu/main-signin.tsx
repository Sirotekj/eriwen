"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Odhlásit</button>;
  }

  return <button onClick={() => signIn("google")}>Přihlásit</button>;
}

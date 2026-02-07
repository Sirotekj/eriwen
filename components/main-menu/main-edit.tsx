"use client";
import { useSession } from "next-auth/react";

export default function EditIcon() {
  const { data: session } = useSession();

  if (!session) return null;

  return <button title="Upravit">Edit!</button>;
}

"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      className="cursor-pointer border rounded-sm p-1 col-start-4"
      disabled={pending}
    >
      <strong>{pending ? "Zpracovávám..." : "Potvrdit"}</strong>
    </button>
  );
}

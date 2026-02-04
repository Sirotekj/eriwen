export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <button type="button">
      {label}
      {name}
    </button>
  );
}

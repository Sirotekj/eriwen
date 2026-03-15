'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ButtonPage from '@/components/utils/button-page';

const MAX_SIZE = 1024 * 1024; // 1MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  function validateFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Povolené formáty jsou PNG, JPG nebo WEBP.';
    }

    if (file.size > MAX_SIZE) {
      return 'Obrázek musí mít méně než 1 MB.';
    }

    return null;
  }

  function loadPreview(file: File) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setPickedImage(null);
      event.target.value = '';
      return;
    }

    setError(null);
    loadPreview(file);
  }

  function handlePickClick() {
    imageInputRef.current?.click();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setPickedImage(null);
      return;
    }

    setError(null);
    loadPreview(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function resetImage() {
    setPickedImage(null);
    setError(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={name}>{label}</label>

      <div className="controls space-y-3">
        <div
          className="preview border p-4 text-center rounded cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!pickedImage && <p>Přetáhni obrázek sem nebo klikni na tlačítko.</p>}

          {pickedImage && (
            <Image
              src={pickedImage}
              alt="Vybraný obrázek"
              width={0}
              height={0}
              className="w-[250px] h-auto mx-auto rounded"
            />
          )}
        </div>

        <input
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg, image/webp"
          ref={imageInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <div className="flex gap-3">
          <ButtonPage type="button" onClick={handlePickClick}>
            Vybrat obrázek
          </ButtonPage>

          {pickedImage && (
            <ButtonPage type="button" onClick={resetImage}>
              Odebrat
            </ButtonPage>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

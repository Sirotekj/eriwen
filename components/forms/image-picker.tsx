'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ButtonPage from '@/components/utils/button-page';

const MAX_SIZE = 1024 * 1024; // 1MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export default function ImagePicker({
  label,
  name,
  width,
  defaultImage,
  defaultMultiply = false,
}: {
  label: string;
  name: string;
  width: 'full' | 'small';
  defaultImage?: string | null;
  defaultMultiply?: boolean;
}) {
  const [pickedImage, setPickedImage] = useState<string | null>(
    defaultImage ?? null,
  );
  const [multiply, setMultiply] = useState(defaultMultiply);
  const [error, setError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handlePickClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setPickedImage(null);
      return;
    }

    function validateFile(file: File) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setPickedImage(null);
        return 'Povolené formáty jsou PNG, JPG nebo WEBP.';
      }
      if (file.size > MAX_SIZE) {
        setPickedImage(null);
        return 'Soubor je příliš velký. Maximální velikost je 1 MB.';
      }
    }
    const file = files[0];
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setPickedImage(null);
      return;
    }

    setError(null);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className="controls">
        <div className="mb-4">
          {!pickedImage && (
            <p
              className={`${width === 'small' ? 'w-full aspect-3/4 sm:w-1/2 md:w-1/3' : 'w-full aspect-video'} p-2 border`}
            >
              Obrázek nevybrán.
            </p>
          )}
          {pickedImage && (
            <div
              className={`relative border ${width === 'small' ? 'w-full sm:w-1/2 md:w-1/3 aspect-3/4' : 'w-full aspect-video'}`}
            >
              <Image
                src={pickedImage}
                width={0}
                height={0}
                sizes="30vw"
                alt="Vybraný obrázek."
                className={`w-full h-auto ${multiply ? 'mix-blend-multiply' : ''}`}
              />
            </div>
          )}
        </div>
        <label htmlFor="imageMultiply" className="mb-3 flex items-center gap-2">
          <input
            id="imageMultiply"
            type="checkbox"
            checked={multiply}
            onChange={(event) => setMultiply(event.target.checked)}
            className="accent-current"
          />
          Prolnout s pozadím
        </label>
        <input
          type="hidden"
          name="imageMultiply"
          value={multiply ? 'true' : 'false'}
        />
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/webp"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        {defaultImage && (
          <input type="hidden" name="existingImage" value={defaultImage} />
        )}
        <ButtonPage type="button" onClick={handlePickClick}>
          Vyber obrázek
        </ButtonPage>
        {error && <p className="text-red">{error}</p>}
      </div>
    </div>
  );
}

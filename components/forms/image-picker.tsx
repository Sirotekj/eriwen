'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ButtonPage from '@/components/utils/button-page';
export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [pickedImage, setPickedImage] = useState<string | null>();
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
    const file = files[0];
    const MAX_SIZE = 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert('Soubor je příliš velký. Maximální velikost je 1 MB.');
      setPickedImage(null);
      return;
    }

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
        <div className="preview">
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              width={0}
              height={0}
              className="w-[30%] h-auto border"
            />
          )}
        </div>
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/webp"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
          className="hidden"
        />
        <ButtonPage type="button" onClick={handlePickClick}>
          Vyber obrázek
        </ButtonPage>
      </div>
    </div>
  );
}

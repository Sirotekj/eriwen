import Image from "next/image";
export default function Background() {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-[-1]">
      <Image
        width="1536"
        height="1024"
        src="/images/mountains.png"
        alt="background"
        className="object-cover max-w-none w-full h-full object-center"
      />
    </div>
  );
}

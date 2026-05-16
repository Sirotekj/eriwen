export default function PaperBackground() {
  return (
    <>
      <div className="absolute top-0 left-[-8%] w-[120%] h-full flex flex-col z-[-1]">
        <div className="aspect-1024/152 w-full bg-cover bg-center bg-no-repeat bg-[url('/images/burnt-paper-top_2.webp')]"></div>
        <div className="relative flex-1 w-full -top-px bg-size-[100%] bg-[url('/images/burnt-paper_2.webp')]"></div>
        <div className="absolute -bottom-8 aspect-1024/98 w-full bg-cover bg-center bg-no-repeat bg-[url('/images/burnt-paper-bottom_2.webp')]"></div>
      </div>
    </>
  );
}

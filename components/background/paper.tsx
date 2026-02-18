export default function PaperBackground() {
  return (
    <>
      <div className="absolute top-0 left-[-8%] w-[120%] h-full z-[-1]">
        <div className="aspect-1024/152 w-full bg-cover bg-center bg-no-repeat bg-[url('/images/burnt-paper-top.webp')]"></div>
        <div className="w-full h-full bg-size-[100%] bg-[url('/images/burnt-paper.webp')]"></div>
      </div>
    </>
  );
}

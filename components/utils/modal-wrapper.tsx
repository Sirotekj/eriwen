type ModalWrapperProps = {
  children: React.ReactNode;
};

export default function ModalWrapper({ children }: ModalWrapperProps) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen  mr-4 mb-4 border">
      <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
      {children}
    </div>
  );
}

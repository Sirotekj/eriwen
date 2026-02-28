type ModalWrapperProps = {
  children: React.ReactNode;
};

export default function ModalWrapper({ children }: ModalWrapperProps) {
  return (
    <div className="fixed w-screen h-screen max-w-xs aspect-3/4 mr-4 mb-4 border">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {children}
    </div>
  );
}

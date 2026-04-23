type ImageWrapperProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
};

export default function ImageWrapper({ children }: ImageWrapperProps) {
  return (
    <div className="relative float-left max-w-xs w-full xs:w-1/2 sm:w-1/3 aspect-3/4 mr-4 mb-4 border">
      {children}
    </div>
  );
}

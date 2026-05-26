type ImageWrapperProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
};

export default function ImageWrapper({ children, size }: ImageWrapperProps) {
  return (
    <div
      className={`
        relative border
        ${
          size === 'large'
            ? 'float-none w-full max-w-full aspect-auto'
            : 'w-full mb-4 xs:max-w-xs xs:w-1/2 xs:float-left xs:mr-4 xs: sm:w-1/3 aspect-3/4'
        }
      `}
    >
      {children}
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};
export default function ButtonPage({
  children,
  onClick,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 flex items-center border border-radius-10 rounded hover:shadow-lg hover:bg-black/5 text-nowrap cursor-pointer [&>svg]:w-10 [&>svg]:h-10 [&>svg]:p-2 ${className ?? ''}`}
    >
      {children}
    </button>
  );
}

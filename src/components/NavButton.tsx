import Link from 'next/link';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}

export default function NavButton({ href, children, variant = 'default' }: NavButtonProps) {
  const baseStyles = "font-medium transition-all duration-200 px-4 py-2 rounded-lg";
  
  const variants = {
    default: "text-gray-600 hover:text-primary hover:bg-primary-lighter",
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={`flex flex-col min-h-screen w-full p-6 bg-white ${className}`}
    >
      {children}
    </div>
  );
}

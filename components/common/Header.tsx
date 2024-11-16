// components/common/Header.tsx
import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <>
      <div className="flex items-center mb-8">
        <Link href="/">
          <button className="text-4xl hover:text-black/80 transition-colors text-gray-400 hover:rotate-90 duration-200">
            ×
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
      {subtitle && <p className="text-gray-600 text-base mb-10">{subtitle}</p>}
    </>
  );
}

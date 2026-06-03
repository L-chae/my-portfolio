import { portfolioData } from '../content/data';

export default function Footer() {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
import { portfolioData } from '../content/data';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 text-center text-slate-400 font-medium text-sm bg-slate-50">
      <p>© {new Date().getFullYear()} {portfolioData.name}. {portfolioData.role}</p>
    </footer>
  );
}
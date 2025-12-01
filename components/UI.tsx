import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  subtext?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon: Icon, className, subtext, ...props }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans tracking-tight">{label}</label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold-600 transition-colors">
          <Icon size={18} />
        </div>
      )}
      <input
        className={`w-full bg-white border border-slate-200 rounded-lg py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all shadow-sm hover:border-slate-300 ${className}`}
        {...props}
      />
    </div>
    {subtext && <p className="mt-1.5 text-xs text-slate-500">{subtext}</p>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: LucideIcon;
  subtext?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, icon: Icon, className, subtext, ...props }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans tracking-tight">{label}</label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-gold-600 transition-colors">
          <Icon size={18} />
        </div>
      )}
      <textarea
        className={`w-full bg-white border border-slate-200 rounded-lg py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all min-h-[120px] shadow-sm hover:border-slate-300 resize-y ${className}`}
        {...props}
      />
    </div>
    {subtext && <p className="mt-1.5 text-xs text-slate-500">{subtext}</p>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: LucideIcon;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, icon: Icon, options, className, ...props }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans tracking-tight">{label}</label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold-600 transition-colors">
          <Icon size={18} />
        </div>
      )}
      <select
        className={`w-full bg-white border border-slate-200 rounded-lg py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-10 text-slate-800 text-sm focus:outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all shadow-sm appearance-none cursor-pointer hover:border-slate-300 ${className}`}
        {...props}
      >
        <option value="" disabled>Pilih {label}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <div className="mb-8 pb-4 border-b border-slate-100">
    <h2 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">{title}</h2>
    <p className="text-slate-500 text-sm">{description}</p>
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ children, variant = 'primary', className, ...props }) => {
  const styles = {
    primary: "bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:border-gold-400 hover:bg-gold-50/50 hover:text-gold-700",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
  };

  return (
    <button
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
"use client";

export default function AuthInput({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  rightIcon: RightIcon,
  onRightClick,
}) {
  return (
    <div className="relative flex items-center">
      {Icon && (
        <Icon
          size={16}
          className="absolute left-3.5 text-slate-400 pointer-events-none"
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full py-3 px-10 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white"
      />
      {RightIcon && (
        <button
          type="button"
          onClick={onRightClick}
          className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RightIcon size={16} />
        </button>
      )}
    </div>
  );
}

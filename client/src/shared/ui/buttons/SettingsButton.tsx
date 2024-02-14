interface SettingsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  subText?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ subText, ...props }) => {
  return (
    <button
      {...props}
      className="relative w-1/2 bg-cyan-50 dark:bg-[#2d3449] opacity-85 h-[100px] rounded-2xl flex items-center text-center px-6 hover:scale-105 hover:opacity-60 hover:text-indigo-700"
    >
      {subText && <p className="absolute opacity-50 right-5">{subText}</p>}
      {props.children}
    </button>
  );
}

export default SettingsButton;

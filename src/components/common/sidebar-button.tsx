type Props = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onclick: () => void;
};

export default function SidebarButton({ text, icon, className }: Props) {
  let active = false;
  return icon ? (
    <button className={`flex flex-row gap-5 text-white ${active && `text-activeblue-100`} ${className}`}>
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  ) : (
    <button className={`flex flex-row gap-5 text-white ${active && `text-activeblue-100`} ${className}`}>
      <div>{text}</div>
    </button>
  );
}

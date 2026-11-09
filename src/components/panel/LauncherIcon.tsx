import type { LauncherItem } from "~/utils/launcher";

interface LauncherIconProps {
  item: LauncherItem;
  size?: string;
}

export default function LauncherIcon({ item, size = "size-6" }: LauncherIconProps) {
  if (item.img)
    return <img className={`${size} shrink-0`} src={item.img} alt="" draggable={false} />;

  return (
    <span className={`${size} shrink-0 flex-center`}>
      <span className={`${item.icon} size-full`} />
    </span>
  );
}

import NavigationSidebarItem from "@/containers/navigation/sidebar/item";

interface NavigationSidebarProps {
  items: {
    href: string;
    label: string;
    className?: string;
  }[];
}

export default function NavigationSidebar({ items }: NavigationSidebarProps) {
  return (
    <ul className="-mt-5 py-5">
      {items.map(({ href, label, className }) => (
        <li key={href}>
          <NavigationSidebarItem className={className} href={href}>
            {label}
          </NavigationSidebarItem>
        </li>
      ))}
    </ul>
  );
}

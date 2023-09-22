import NavigationSidebarItem from "@/containers/navigation/sidebar/item";

export interface NavigationSidebarProps {
  items: {
    href: string;
    label: string;
    children?: React.ReactNode;
  }[];
}

export default function NavigationSidebar({ items }: NavigationSidebarProps) {
  return (
    <ul className="-mt-5 py-5">
      {items.map(({ href, children }) => {
        return (
          <li key={href}>
            <NavigationSidebarItem href={href}>{children}</NavigationSidebarItem>
          </li>
        );
      })}
    </ul>
  );
}

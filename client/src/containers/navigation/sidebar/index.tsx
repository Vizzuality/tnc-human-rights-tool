import NavigationSidebarItem from "@/containers/navigation/sidebar/item";

interface NavigationSidebarProps {
  items: {
    href: string;
    label: string;
    className?: string;
    children?: React.ReactNode;
  }[];
}

export default function NavigationSidebar({ items }: NavigationSidebarProps) {
  return (
    <ul className="-mt-5 py-5">
      {items.map(({ href, className, children }) => {
        return (
          <li key={href}>
            <NavigationSidebarItem className={className} href={href}>
              {children}
            </NavigationSidebarItem>
          </li>
        );
      })}
    </ul>
  );
}

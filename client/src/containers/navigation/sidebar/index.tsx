import NavigationSidebarItem from "@/containers/navigation/sidebar/item";

interface NavigationSidebarProps {
  items: {
    href: string;
    label: string;
  }[];
}

export default function NavigationSidebar({ items }: NavigationSidebarProps) {
  return (
    <ul className="sticky top-0 -mt-5 space-y-2.5 py-5">
      {items.map(({ href, label }) => (
        <li key={href}>
          <NavigationSidebarItem href={href}>{label}</NavigationSidebarItem>
        </li>
      ))}
    </ul>
  );
}

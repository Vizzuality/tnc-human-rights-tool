import SidebarNavigationItem from "@/containers/sidebar/navigation/item";

interface SidebarNavigationProps {
  items: {
    href: string;
    label: string;
  }[];
}

export default function SidebarNavigation({ items }: SidebarNavigationProps) {
  return (
    <ul>
      {items.map(({ href, label }) => (
        <li key={href}>
          <SidebarNavigationItem href={href}>{label}</SidebarNavigationItem>
        </li>
      ))}
    </ul>
  );
}

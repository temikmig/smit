import { SidebarMenuItem } from "./SidebarMenuItem";

interface SidebarMenuProps {
  menuItems: {
    title: string;
  }[];
}

export const SidebarMenu = ({ menuItems }: SidebarMenuProps) => {
  return (
    <ul>
      {menuItems.map((item) => (
        <SidebarMenuItem title={item.title} />
      ))}
    </ul>
  );
};

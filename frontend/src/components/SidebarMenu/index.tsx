import { SidebarMenuItem, type SidebarMenuItemProps } from "./SidebarMenuItem";

interface SidebarMenuProps {
  menuItems: SidebarMenuItemProps[];
}

export const SidebarMenu = ({ menuItems }: SidebarMenuProps) => {
  return (
    <ul>
      {menuItems.map((item) => (
        <SidebarMenuItem title={item.title} icon={item.icon} />
      ))}
    </ul>
  );
};

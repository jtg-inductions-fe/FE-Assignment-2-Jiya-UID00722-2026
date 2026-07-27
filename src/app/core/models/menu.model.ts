export enum MenuItemType {
  menuItem = 'menuItem',
  divider = 'divider',
}
export interface MenuItem {
  type: MenuItemType;
  icon?: string;
  label?: string;
  url?: string;
  bubble?: string;
  children?: MenuItem[];
}

export interface MenuConfig {
  primary: MenuItem[];
  footer: MenuItem[];
}

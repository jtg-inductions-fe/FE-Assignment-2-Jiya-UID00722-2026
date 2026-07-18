export interface MenuItem {
  icon: string;
  label?: string;
  url: string;
  bubble?: string;
  children?: MenuItem[];
}

export interface MenuConfig {
  primary: MenuItem[];
  secondary: MenuItem[];
  tertiary: MenuItem[];
}

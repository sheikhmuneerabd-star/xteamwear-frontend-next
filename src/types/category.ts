export interface CategoryItem {
  id: number;
  name: string;
  title: string[];
}

export interface SubMenuItem {
  id: number;
  name: string;
  item?: string[];
}

export interface TopCategory {
  id: number;
  title: string;
  submenus: SubMenuItem[];
}

export interface LeftCategoryItem {
  id: number;
  title: string;
  items: string[];
}
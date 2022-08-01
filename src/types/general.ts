export type ICategory = {
  id: number;
  name: string;
  products_count: number;
  notProduct: boolean;
}

type Image = {
  JPG: string;
  WEBP: string;
} 

export type GalleryImage = {
  id: number;
  name: string;
  label: string;
  dimensions: string;
  order: number;
  image: Image;
  thumb: Image;
}

export type IProduct = {
  id: number;
  reference: number;
  category_id: number;
  name: string;
  price: string;
  promotion: string | null;
  description: string;
  labels: 'Todos' | 'Opção Todos' | 'Vegano' | 'Opção Vegano' | 'Vegetariano' | 'Opção Vegetariano' | 'Sem Açúcar' | 'Opção Sem Açúcar' | 'Sem Glúten' | 'Opção Sem Glúten' | 'Contém Alcool' | 'Opção Contém Alcool';
  tags: string | null;
  gallery: GalleryImage[];
  notProduct: boolean;
  empty: boolean;
}

export type OffSetPair = {
  value: number;
  name: string;
}

export interface TempOffsetPair extends OffSetPair {
  position: number;
}

export type FinalOffSetPair = {
  [key: number]: OffSetPair;
}

export type CategoryKey = {
  [key: number]: IProduct[];
}

export type IClient = {
  name: string;
  proposal_status: string;
  website: string;
  url: string;
  nif: string;
  book_url: string;
  book_phone: string | null;
  book_whatsapp: string | null;
  zipcode: string;
  address: string;
  city: string;
  district: string;
  maps_url: string;
  owner_name: string;
  cellphone: string | null;
  phone: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  twitter_url: string | null;
  image_logo: string;
  image_cover: string;
  image_colors: string;
  about: string;
  gallery: GalleryImage[];
}

export type DefaultValueProps = {
  label: string;
  value: string;
}

export type ColorTheme = {
  top_one: DefaultValueProps;
  top_two: DefaultValueProps;
  top_icons: DefaultValueProps;
  top_text: DefaultValueProps;
  menu_button_text: DefaultValueProps;
  menu_button_bg: DefaultValueProps;
  menu_button_text_disabled: DefaultValueProps;
  menu_button_bg_disabled: DefaultValueProps;
  menu_bg: DefaultValueProps;
  variations_bg: DefaultValueProps;
  categories: DefaultValueProps;
  app_bg: DefaultValueProps;
}
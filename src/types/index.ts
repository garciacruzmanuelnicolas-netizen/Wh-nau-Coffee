export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'cold' | 'toasts' | 'bakery' | 'savory' | 'drinks';
  categoryLabel: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
  tags?: string[];
  allergens?: string[];
}

export interface SpecialtyItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  price: string;
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'coffees' | 'food' | 'terrace';
  categoryLabel: string;
  image: string;
  caption: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google Reviews';
}

export interface DaySchedule {
  day: string;
  hours: string;
  openTime: number; // e.g. 7.5 for 7:30
  closeTime: number; // e.g. 22 for 22:00
  isClosed?: boolean;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

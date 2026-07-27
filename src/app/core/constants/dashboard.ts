import {
  FooterLink,
  StatsCard,
  StatsCardVariant,
} from '@core/models/dashboard.model';

export const STATS_CARDS: StatsCard[] = [
  {
    title: 'Total Revenue',
    key: 'revenue',
    icon: 'attach_money',
    variant: StatsCardVariant.success,
  },
  {
    title: 'Total Orders',
    key: 'totalOrders',
    icon: 'shopping_cart',
    variant: StatsCardVariant.info,
  },
  {
    title: 'Completed Orders',
    key: 'completedOrders',
    icon: 'check_circle',
    variant: StatsCardVariant.warning,
  },
  {
    title: 'Active Restaurants',
    key: 'activeRestaurants',
    icon: 'restaurant',
    variant: StatsCardVariant.primary,
  },
];

export const ORDER_TABLE_COLUMNS = [
  'orderId',
  'restaurantName',
  'customerName',
  'items',
  'amount',
  'status',
  'actions',
] as const;

export const FOOTER_LINKS: FooterLink[] = [
  {
    href: 'https://www.facebook.com/',
    icon: 'facebook',
  },
  {
    href: 'https://www.twitter.com/',
    icon: 'twitter',
  },
  {
    href: 'https://www.github.com/',
    icon: 'github',
  },
  {
    href: 'https://www.website.com/',
    icon: 'website',
  },
];

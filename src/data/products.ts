
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  seller: {
    name: string;
    avatar: string;
  };
  category: string;
  isFeatured: boolean;
  badge?: string;
  rating: number;
  sales: number;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Elegant Ebook Template',
    slug: 'elegant-ebook-template',
    description:
      'A professionally designed ebook template to make your content shine.',
    price: 4900,
    currency: 'USD',
    image: '/src/assets/products/ebook-template.png',
    seller: { name: 'DesignSource', avatar: '' },
    category: 'Templates',
    isFeatured: true,
    badge: 'Featured',
    rating: 4.8,
    sales: 124,
  },
  {
    id: '2',
    title: 'Minimalist UI Kit',
    slug: 'minimalist-ui-kit',
    description:
      'A comprehensive UI kit for designing clean and modern interfaces.',
    price: 7900,
    currency: 'USD',
    image: '/src/assets/products/ui-kit.png',
    seller: { name: 'PixelPerfect', avatar: '' },
    category: 'UI Kits',
    isFeatured: true,
    badge: 'Bestseller',
    rating: 4.9,
    sales: 245,
  },
  {
    id: '3',
    title: 'Pro Course Bundle',
    slug: 'pro-course-bundle',
    description:
      'Unlock your potential with our complete bundle of professional courses.',
    price: 19900,
    currency: 'USD',
    image: '/src/assets/products/course-bundle.png',
    seller: { name: 'Learnify', avatar: '' },
    category: 'Courses',
    isFeatured: true,
    badge: 'New',
    rating: 4.7,
    sales: 89,
  },
  {
    id: '4',
    title: 'Social Media Pack',
    slug: 'social-media-pack',
    description: 'A huge pack of social media templates for all platforms.',
    price: 3900,
    currency: 'USD',
    image: '/placeholder.svg',
    seller: { name: 'SocialSavvy', avatar: '' },
    category: 'Templates',
    isFeatured: false,
    rating: 4.6,
    sales: 97,
  },
  {
    id: '5',
    title: 'Web Development Bootcamp',
    slug: 'web-development-bootcamp',
    description: 'A complete bootcamp to become a full-stack web developer.',
    price: 29900,
    currency: 'USD',
    image: '/placeholder.svg',
    seller: { name: 'CodeMaster', avatar: '' },
    category: 'Courses',
    isFeatured: false,
    rating: 4.9,
    sales: 412,
  },
  {
    id: '6',
    title: 'Mobile App UI Kit',
    slug: 'mobile-app-ui-kit',
    description: 'A stunning UI kit for designing beautiful mobile apps.',
    price: 6900,
    currency: 'USD',
    image: '/placeholder.svg',
    seller: { name: 'AppDesignCo', avatar: '' },
    category: 'UI Kits',
    isFeatured: false,
    rating: 4.8,
    sales: 156,
  },
  {
    id: '7',
    title: 'Photography Masterclass',
    slug: 'photography-masterclass',
    description: 'Learn the art of photography from industry professionals.',
    price: 14900,
    currency: 'USD',
    image: '/placeholder.svg',
    seller: { name: 'PhotoPro', avatar: '' },
    category: 'Courses',
    isFeatured: false,
    rating: 4.7,
    sales: 72,
  },
  {
    id: '8',
    title: 'Branding Identity Kit',
    slug: 'branding-identity-kit',
    description: 'Everything you need to create a powerful brand identity.',
    price: 9900,
    currency: 'USD',
    image: '/placeholder.svg',
    seller: { name: 'BrandBuilders', avatar: '' },
    category: 'Templates',
    isFeatured: false,
    rating: 4.9,
    sales: 189,
  },
];

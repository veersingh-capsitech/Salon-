
export type Salon = {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;

  hours?: Record<string, string>;

  rating?: number;
  reviews?: number;
  distanceKm?: number;

  priceLevel?: 1 | 2 | 3 | 4;

  tags?: string[];
  image?: string;

  isOpen?: boolean;

  services?: {
    id: number;
    name: string;
    price: number;
    durationMin: number;
  }[];
};

export const salons: Salon[] = [
    {
        id: 1,
        name: "Glamour Studio",
        description: "Stylish haircuts and coloring",
        address: "123 Main Street, New York",
        phone: "+1 (555) 111-0001",
        email: "glamour@example.com",
        hours: { Mon: "09:00 - 18:00", Tue: "09:00 - 18:00", Wed: "09:00 - 18:00", Thu: "09:00 - 16:00", Fri: "09:00 - 18:00", Sat: "10:00 - 18:00", Sun: "Closed" },
        rating: 4.9,
        reviews: 128,
        distanceKm: 1.2,
        priceLevel: 3,
        services: [
            { id: 1, name: "Full Treatment", price: 2500, durationMin: 60 },
            { id: 2, name: "Manicure", price: 1000, durationMin: 30 },
            { id: 3, name: "Pedicure", price: 1500, durationMin: 45 }
        ],
        image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7f7d83f7a9c42f9d5f3a2a3a6f1b1b8e",
    },
    {
        id: 2,
        name: "Urban Cuts",
        description: "Contemporary barbers and styling",
        address: "456 Fashion Ave, Brooklyn",
        phone: "+1 (555) 222-0002",
        email: "urban@example.com",
         hours: { Mon: "08:00 - 17:00", Tue: "08:00 - 17:00", Wed: "08:00 - 17:00", Thu: "08:00 - 17:00", Fri: "08:00 - 22:00", Sat: "10:00 - 16:00", Sun: "Closed" },
        rating: 4.7,
        reviews: 89,
        distanceKm: 2.8,
        priceLevel: 2,
        services: [
            { id: 1, name: "Full Treatment", price: 2500, durationMin: 60 },
            { id: 2, name: "Manicure", price: 1000, durationMin: 30 },
            { id: 3, name: "Pedicure", price: 1500, durationMin: 45 }
        ],
        image:
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b8f4b2d2a3b44c4b5e648b7d6b8a9f3",
    },
    {
        id: 3,
        name: "Beauty Haven",
        description: "Manicure, pedicure and full treatments",
        address: "789 Style Blvd, Manhattan",
        phone: "+1 (555) 333-0003",
        email: "beauty@example.com",
        hours: { Mon: "08:00 - 17:00", Tue: "08:00 - 17:00", Wed: "08:00 - 17:00", Thu: "08:00 - 17:00", Fri: "08:00 - 17:00", Sat: "10:00 - 16:00", Sun: "Closed" },
        rating: 4.8,
        reviews: 234,
        distanceKm: 0.9,
        priceLevel: 3,
        services: [
            { id: 1, name: "Full Treatment", price: 2500, durationMin: 60 },
            { id: 2, name: "Manicure", price: 1000, durationMin: 30 },
            { id: 3, name: "Pedicure", price: 1500, durationMin: 45 }
        ],
        image:
            "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3a1b6f7ef2d4b5e3c1d9a0f3b4c6e7a8",
    },
    {
        id: 4,
        name: "The Barber Shop",
        description: "Traditional barbering with modern touches",
        address: "321 Classic Rd, Queens",
        phone: "+1 (555) 444-0004",
        email: "barber@example.com",
        hours: { Mon: "08:00 - 17:00", Tue: "08:00 - 17:00", Wed: "08:00 - 17:00", Thu: "08:00 - 17:00", Fri: "08:00 - 17:00", Sat: "10:00 - 16:00", Sun: "Closed" },
        rating: 4.6,
        reviews: 67,
        distanceKm: 3.5,
        priceLevel: 2,
        services: [
            { id: 1, name: "Full Treatment", price: 2500, durationMin: 60 },
            { id: 2, name: "Manicure", price: 1000, durationMin: 30 },
            { id: 3, name: "Pedicure", price: 1500, durationMin: 45 }
        ],
        image:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f4b3a8e5c6d7e8f9a0b1c2d3e4f5a6b",
    },
    {
        id: 5,
        name: "Nail Art Studio",
        description: "Creative nail designs and care",
        address: "654 Trendy Lane, Bronx",
        phone: "+1 (555) 555-0005",
        email: "nail@example.com",
         hours: { Mon: "08:00 - 17:00", Tue: "08:00 - 17:00", Wed: "08:00 - 17:00", Thu: "08:00 - 17:00", Fri: "08:00 - 17:00", Sat: "10:00 - 16:00", Sun: "Closed" },
        rating: 4.9,
        reviews: 156,
        distanceKm: 4.1,
        priceLevel: 2,
        services: [
            { id: 1, name: "Full Treatment", price: 2500, durationMin: 60 },
            { id: 2, name: "Manicure", price: 1000, durationMin: 30 },
            { id: 3, name: "Pedicure", price: 1500, durationMin: 45 }
        ],
        image:
            "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4b5a6c7d8e9f0a1b2c3d4e5f6a7b8c9d",
    },
    {
        id: 6,
        name: "Luxe Salon",
        description: "High-end salon with premium stylists",
        address: "987 Premium St, Manhattan",
        phone: "+1 (555) 666-0006",
        email: "luxe@example.com",
         hours: { Mon: "08:00 - 17:00", Tue: "08:00 - 17:00", Wed: "08:00 - 17:00", Thu: "08:00 - 17:00", Fri: "08:00 - 17:00", Sat: "10:00 - 16:00", Sun: "Closed" },
        rating: 5.0,
        reviews: 312,
        distanceKm: 0.6,
        priceLevel: 4,
        services: [
            { id: 1, name: "Full Treatment", price: 2500, durationMin: 60 },
            { id: 2, name: "Manicure", price: 1000, durationMin: 30 },
            { id: 3, name: "Pedicure", price: 1500, durationMin: 45 }
        ],
        image:
            "https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d",
    },
];
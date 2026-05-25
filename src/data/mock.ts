import { Profile, Event, Listing, Order, Dispute, Payout, EmployeeTask } from '@/types/database';

export const mockProfiles: Profile[] = [
  {
    id: 'user-1',
    full_name: 'יוסי כהן',
    email: 'yossi@example.com',
    phone: '050-1234567',
    role: 'seller',
    verification_status: 'verified',
    avatar_url: null,
    created_at: '2025-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    full_name: 'שרה לוי',
    email: 'sara@example.com',
    phone: '052-9876543',
    role: 'buyer',
    verification_status: 'verified',
    avatar_url: null,
    created_at: '2025-02-01T12:00:00Z',
  },
  {
    id: 'user-3',
    full_name: 'דוד אברהם',
    email: 'david@example.com',
    phone: '054-5551234',
    role: 'seller',
    verification_status: 'pending',
    avatar_url: null,
    created_at: '2025-03-10T08:00:00Z',
  },
  {
    id: 'user-4',
    full_name: 'רחל מזרחי',
    email: 'rachel@example.com',
    phone: '053-7778899',
    role: 'buyer',
    verification_status: 'unverified',
    avatar_url: null,
    created_at: '2025-04-05T14:00:00Z',
  },
  {
    id: 'admin-1',
    full_name: 'Admin SafeTicket',
    email: 'admin@safeticket.co.il',
    phone: null,
    role: 'admin',
    verification_status: 'verified',
    avatar_url: null,
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'עידן רייכל - מופע סיום',
    venue: 'היכל מנורה מבטחים',
    city: 'תל אביב',
    event_date: '2026-07-15T20:30:00Z',
    category: 'concert',
    image_url: '/images/concert-1.jpg',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'event-2',
    title: 'מכבי תל אביב vs הפועל ירושלים',
    venue: 'ארנה שלמה',
    city: 'תל אביב',
    event_date: '2026-06-20T21:00:00Z',
    category: 'sports',
    image_url: '/images/sports-1.jpg',
    created_at: '2025-01-05T00:00:00Z',
  },
  {
    id: 'event-3',
    title: 'שלמה ארצי - הופעה חיה',
    venue: 'פארק הירקון',
    city: 'תל אביב',
    event_date: '2026-08-01T20:00:00Z',
    category: 'concert',
    image_url: '/images/concert-2.jpg',
    created_at: '2025-02-01T00:00:00Z',
  },
  {
    id: 'event-4',
    title: 'פסטיבל הג\'אז של אילת',
    venue: 'חוף האלמוגים',
    city: 'אילת',
    event_date: '2026-08-20T18:00:00Z',
    category: 'festival',
    image_url: '/images/festival-1.jpg',
    created_at: '2025-02-15T00:00:00Z',
  },
  {
    id: 'event-5',
    title: 'אביב גפן - אקוסטי',
    venue: 'זאפה הרצליה',
    city: 'הרצליה',
    event_date: '2026-06-10T21:00:00Z',
    category: 'concert',
    image_url: '/images/concert-3.jpg',
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'event-6',
    title: 'הקמרן - הצגת תיאטרון',
    venue: 'תיאטרון הבימה',
    city: 'תל אביב',
    event_date: '2026-07-05T19:30:00Z',
    category: 'theater',
    image_url: '/images/theater-1.jpg',
    created_at: '2025-03-15T00:00:00Z',
  },
  {
    id: 'event-7',
    title: 'סטטיק ובן אל - סיבוב הופעות',
    venue: 'ארנה ירושלים',
    city: 'ירושלים',
    event_date: '2026-09-10T20:00:00Z',
    category: 'concert',
    image_url: '/images/concert-4.jpg',
    created_at: '2025-04-01T00:00:00Z',
  },
  {
    id: 'event-8',
    title: 'מכבי חיפה vs בית"ר ירושלים',
    venue: 'אצטדיון סמי עופר',
    city: 'חיפה',
    event_date: '2026-06-28T20:45:00Z',
    category: 'sports',
    image_url: '/images/sports-2.jpg',
    created_at: '2025-04-15T00:00:00Z',
  },
];

export const mockListings: Listing[] = [
  {
    id: 'listing-1',
    seller_id: 'user-1',
    event_id: 'event-1',
    section: 'A',
    row: '5',
    seat_info: 'מושבים 12-13',
    quantity: 2,
    face_value: 350,
    asking_price: 320,
    currency: 'ILS',
    status: 'active',
    ticket_file_url: null,
    risk_status: 'clear',
    created_at: '2025-05-01T10:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-2',
    seller_id: 'user-1',
    event_id: 'event-2',
    section: 'VIP',
    row: '1',
    seat_info: 'מושב 8',
    quantity: 1,
    face_value: 450,
    asking_price: 400,
    currency: 'ILS',
    status: 'active',
    ticket_file_url: null,
    risk_status: 'clear',
    created_at: '2025-05-02T14:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-3',
    seller_id: 'user-3',
    event_id: 'event-3',
    section: 'דשא',
    row: null,
    seat_info: 'כניסה כללית',
    quantity: 4,
    face_value: 280,
    asking_price: 250,
    currency: 'ILS',
    status: 'active',
    ticket_file_url: null,
    risk_status: 'clear',
    created_at: '2025-05-05T09:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-4',
    seller_id: 'user-3',
    event_id: 'event-4',
    section: null,
    row: null,
    seat_info: 'כרטיס יומי - יום שישי',
    quantity: 2,
    face_value: 200,
    asking_price: 180,
    currency: 'ILS',
    status: 'pending_review',
    ticket_file_url: null,
    risk_status: 'under_review',
    created_at: '2025-05-10T11:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-5',
    seller_id: 'user-1',
    event_id: 'event-5',
    section: 'B',
    row: '3',
    seat_info: 'מושבים 5-6',
    quantity: 2,
    face_value: 180,
    asking_price: 160,
    currency: 'ILS',
    status: 'active',
    ticket_file_url: null,
    risk_status: 'clear',
    created_at: '2025-05-12T16:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-6',
    seller_id: 'user-3',
    event_id: 'event-6',
    section: 'יציע',
    row: '8',
    seat_info: 'מושבים 15-16',
    quantity: 2,
    face_value: 220,
    asking_price: 200,
    currency: 'ILS',
    status: 'sold',
    ticket_file_url: null,
    risk_status: 'clear',
    created_at: '2025-04-20T10:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-7',
    seller_id: 'user-1',
    event_id: 'event-7',
    section: 'C',
    row: '10',
    seat_info: 'מושב 22',
    quantity: 1,
    face_value: 300,
    asking_price: 280,
    currency: 'ILS',
    status: 'active',
    ticket_file_url: null,
    risk_status: 'clear',
    created_at: '2025-05-14T08:00:00Z',
    event: undefined,
    seller: undefined,
  },
  {
    id: 'listing-8',
    seller_id: 'user-3',
    event_id: 'event-8',
    section: 'מזרח',
    row: '15',
    seat_info: 'מושבים 1-2',
    quantity: 2,
    face_value: 150,
    asking_price: 130,
    currency: 'ILS',
    status: 'rejected',
    ticket_file_url: null,
    risk_status: 'flagged',
    created_at: '2025-05-08T13:00:00Z',
    event: undefined,
    seller: undefined,
  },
];

// Hydrate listings with event and seller data
mockListings.forEach((listing) => {
  listing.event = mockEvents.find((e) => e.id === listing.event_id);
  listing.seller = mockProfiles.find((p) => p.id === listing.seller_id);
});

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    buyer_id: 'user-2',
    listing_id: 'listing-6',
    total_amount: 400,
    payment_status: 'released',
    order_status: 'completed',
    payout_status: 'released',
    created_at: '2025-04-25T14:00:00Z',
    listing: mockListings.find((l) => l.id === 'listing-6'),
  },
  {
    id: 'order-2',
    buyer_id: 'user-4',
    listing_id: 'listing-1',
    total_amount: 640,
    payment_status: 'held',
    order_status: 'confirmed',
    payout_status: 'held',
    created_at: '2025-05-13T10:00:00Z',
    listing: mockListings.find((l) => l.id === 'listing-1'),
  },
  {
    id: 'order-3',
    buyer_id: 'user-2',
    listing_id: 'listing-2',
    total_amount: 400,
    payment_status: 'paid',
    order_status: 'pending',
    payout_status: 'pending',
    created_at: '2025-05-14T16:00:00Z',
    listing: mockListings.find((l) => l.id === 'listing-2'),
  },
];

export const mockDisputes: Dispute[] = [
  {
    id: 'dispute-1',
    order_id: 'order-2',
    opened_by: 'user-4',
    reason: 'הכרטיסים שקיבלתי לא תואמים את המושבים שפורסמו',
    status: 'open',
    admin_resolution: null,
    created_at: '2025-05-14T12:00:00Z',
    order: mockOrders.find((o) => o.id === 'order-2'),
  },
  {
    id: 'dispute-2',
    order_id: 'order-1',
    opened_by: 'user-2',
    reason: 'האירוע בוטל ואני רוצה החזר',
    status: 'resolved_buyer',
    admin_resolution: 'האירוע אכן בוטל. בוצע החזר מלא לקונה.',
    created_at: '2025-05-01T09:00:00Z',
    order: mockOrders.find((o) => o.id === 'order-1'),
  },
];

export const mockPayouts: Payout[] = [
  {
    id: 'payout-1',
    order_id: 'order-1',
    seller_id: 'user-3',
    amount: 360,
    status: 'released',
    released_at: '2025-05-05T10:00:00Z',
    created_at: '2025-04-25T14:00:00Z',
  },
  {
    id: 'payout-2',
    order_id: 'order-2',
    seller_id: 'user-1',
    amount: 576,
    status: 'held',
    released_at: null,
    created_at: '2025-05-13T10:00:00Z',
  },
];

export function getActiveListings(): Listing[] {
  return mockListings.filter((l) => l.status === 'active');
}

export function getListingById(id: string): Listing | undefined {
  return mockListings.find((l) => l.id === id);
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function getOrdersByBuyerId(buyerId: string): Order[] {
  return mockOrders.filter((o) => o.buyer_id === buyerId);
}

export function getListingsBySellerId(sellerId: string): Listing[] {
  return mockListings.filter((l) => l.seller_id === sellerId);
}

export function getPayoutsBySellerId(sellerId: string): Payout[] {
  return mockPayouts.filter((p) => p.seller_id === sellerId);
}

export function getEventsWithActiveListings(): (Event & { listingCount: number; lowestPrice: number })[] {
  return mockEvents
    .map((event) => {
      const activeListings = mockListings.filter((l) => l.event_id === event.id && l.status === 'active');
      return {
        ...event,
        listingCount: activeListings.length,
        lowestPrice: activeListings.length > 0 ? Math.min(...activeListings.map((l) => l.asking_price)) : 0,
      };
    })
    .filter((e) => e.listingCount > 0);
}

export function getListingsByEventId(eventId: string): Listing[] {
  return mockListings
    .filter((l) => l.event_id === eventId && l.status === 'active')
    .sort((a, b) => a.asking_price - b.asking_price);
}

export const mockTasks: EmployeeTask[] = [];

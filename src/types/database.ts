export type UserRole = 'buyer' | 'seller' | 'admin';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type ListingStatus = 'draft' | 'pending_review' | 'active' | 'sold' | 'rejected' | 'expired';
export type RiskStatus = 'clear' | 'flagged' | 'under_review' | 'blocked';
export type PaymentStatus = 'pending' | 'paid' | 'held' | 'released' | 'refunded' | 'failed';
export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'disputed';
export type PayoutStatus = 'pending' | 'held' | 'pending_release' | 'released' | 'cancelled';
export type DisputeStatus = 'open' | 'under_review' | 'resolved_buyer' | 'resolved_seller' | 'closed';
export type EventCategory = 'concert' | 'sports' | 'theater' | 'festival' | 'conference' | 'other';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  verification_status: VerificationStatus;
  avatar_url: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  city: string;
  event_date: string;
  category: EventCategory;
  image_url: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  seller_id: string;
  event_id: string;
  section: string | null;
  row: string | null;
  seat_info: string | null;
  quantity: number;
  face_value: number;
  asking_price: number;
  currency: string;
  status: ListingStatus;
  ticket_file_url: string | null;
  risk_status: RiskStatus;
  created_at: string;
  event?: Event;
  seller?: Profile;
}

export interface Order {
  id: string;
  buyer_id: string;
  listing_id: string;
  total_amount: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  payout_status: PayoutStatus;
  created_at: string;
  listing?: Listing;
  buyer?: Profile;
}

export interface Dispute {
  id: string;
  order_id: string;
  opened_by: string;
  reason: string;
  status: DisputeStatus;
  admin_resolution: string | null;
  created_at: string;
  order?: Order;
}

export interface Payout {
  id: string;
  order_id: string;
  seller_id: string;
  amount: number;
  status: PayoutStatus;
  released_at: string | null;
  created_at: string;
}

export interface Verification {
  id: string;
  user_id: string;
  document_type: string;
  document_url: string | null;
  status: VerificationStatus;
  reviewed_at: string | null;
  created_at: string;
}

export interface AdminNote {
  id: string;
  target_type: 'user' | 'listing' | 'order' | 'dispute';
  target_id: string;
  author_id: string;
  note: string;
  created_at: string;
}

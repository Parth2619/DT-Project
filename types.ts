

export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Fix: Defined enums for PostType and PostStatus to resolve circular dependency.
export enum PostType {
  Lost = 'lost',
  Found = 'found',
}

export enum PostStatus {
  Pending = 'pending',
  Claimed = 'claimed',
  Returned = 'returned',
}

export interface LostFoundPost {
  id: string;
  type: PostType;
  title: string;
  imageUrl: string;
  location: string;
  date: string; // ISO string
  details: string;
  status: PostStatus;
  posterUid: string;
  posterEmail?: string;
  posterName?: string;
  createdAt: string; // ISO string
  claims?: Claim[];
}

export type ToastMessage = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
};

export interface Claim {
  id: string;
  postId: string;
  claimerUid: string;
  claimerEmail: string;
  claimerName: string;
  claimerDescription: string;
  adminDecision: 'pending' | 'accepted' | 'rejected';
  adminReason?: string;
  createdAt: string; // ISO string
}

// --- Notes Module Types ---

// Fix: Added Rating interface for note ratings.
export interface Rating {
    uid: string;
    rating: number; // 1-5
}

export enum NoteType {
    PDF = 'pdf',
    DOCX = 'docx',
    IMAGE = 'image',
}

export interface Comment {
    id: string;
    noteId: string;
    user: Pick<User, 'uid' | 'name'>;
    text: string;
    createdAt: string; // ISO string
}

export interface Note {
  id: string;
  title: string;
  description: string;
  semester: number;
  subject: string;
  type: NoteType;
  tags: string[];
  fileUrl: string; // Direct download URL from storage
  uploader: Pick<User, 'uid' | 'name'>;
  approved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  downloads: number;
  comments: Comment[];
  // Fix: Added optional ratings property to support note ratings.
  ratings?: Rating[];
  createdAt: string; // ISO string
}
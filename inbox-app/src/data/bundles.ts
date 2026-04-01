import { EMAIL_AVATAR } from '../constants/emailAvatars';

export type BundleId = 'social' | 'receipts' | 'notifications' | 'newsletters';

export interface EmailData {
  id: string;
  avatar?: string;
  avatarLetter?: string;
  avatarBg?: 'dark' | 'white';
  sender: string;
  subject: string;
  time: string;
  isRead?: boolean;
  hasAttachment?: boolean;
}

export interface BundleDef {
  id: BundleId;
  icon: string;
  title: string;
  emails: EmailData[];
}

// ── Social ──────────────────────────────────────────────
const socialEmails: EmailData[] = [
  { id: 's1', avatar: EMAIL_AVATAR.facebook, sender: 'Facebook',  subject: 'You have new friend requests and messages!',    time: '1:50 PM',  isRead: false, hasAttachment: false },
  { id: 's2', avatar: EMAIL_AVATAR.linkedin, sender: 'LinkedIn',  subject: 'Someone wants to connect with you!',             time: '12:05 PM', isRead: false, hasAttachment: true  },
  { id: 's3', avatar: EMAIL_AVATAR.strava, sender: 'Strava',    subject: 'You met your goals this week! Keep it up!',      time: '7:55 AM',  isRead: true,  hasAttachment: false },
];

// ── Receipts ────────────────────────────────────────────
const receiptEmails: EmailData[] = [
  { id: 'r1', avatar: EMAIL_AVATAR.amazon, avatarBg: 'white', sender: 'Amazon', subject: 'Your order has been shipped! Track it here.',      time: '2:11 PM',  isRead: false, hasAttachment: true  },
  { id: 'r2', avatar: EMAIL_AVATAR.lloyds, sender: 'Lloyds',  subject: 'Your monthly bank statement is ready to view.',          time: '11:30 AM', isRead: false, hasAttachment: true  },
  { id: 'r3', avatar: EMAIL_AVATAR.tesco, sender: 'Tesco',   subject: 'Special discounts on your favorite items this week!',    time: '9:02 AM',  isRead: true,  hasAttachment: false },
];

// ── Notifications ────────────────────────────────────────
const notificationEmails: EmailData[] = [
  { id: 'n1', avatar: EMAIL_AVATAR.weather, sender: 'Weather Update',    subject: 'Severe weather alert for your area this weekend!', time: '10:35 AM', isRead: false, hasAttachment: true  },
  { id: 'n2', avatar: EMAIL_AVATAR.govPortal, sender: 'Government Portal', subject: 'Please review the updated account policies.',       time: '8:22 AM',  isRead: true,  hasAttachment: false },
  { id: 'n3', avatar: EMAIL_AVATAR.jet2, sender: 'Jet2',              subject: 'Your travel itinerary is confirmed!',               time: '8:51 AM',  isRead: false, hasAttachment: true  },
];

// ── Newsletters ──────────────────────────────────────────
const newsletterEmails: EmailData[] = [];

export const BUNDLES: BundleDef[] = [
  { id: 'social',        icon: 'ic-users',          title: 'Social',        emails: socialEmails },
  { id: 'receipts',      icon: 'ic-pass-cheque',    title: 'Receipts',      emails: receiptEmails },
  { id: 'notifications', icon: 'ic-bell-2',         title: 'Notifications', emails: notificationEmails },
  { id: 'newsletters',   icon: 'ic-envelope-check', title: 'Newsletters',   emails: newsletterEmails },
];

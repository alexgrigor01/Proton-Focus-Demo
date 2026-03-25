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
  { id: 's1', avatar: 'https://www.figma.com/api/mcp/asset/0668bcc6-3ac9-489a-ab2d-4ce28c9ebc3a', sender: 'Facebook',  subject: 'You have new friend requests and messages!',    time: '1:50 PM',  isRead: false, hasAttachment: false },
  { id: 's2', avatar: 'https://www.figma.com/api/mcp/asset/1b9f6345-6f81-4806-aa48-8ac1a0452038', sender: 'LinkedIn',  subject: 'Someone wants to connect with you!',             time: '12:05 PM', isRead: false, hasAttachment: true  },
  { id: 's3', avatar: 'https://www.figma.com/api/mcp/asset/54e54512-2598-4ccf-aae3-d04530ee5526', sender: 'Strava',    subject: 'You met your goals this week! Keep it up!',      time: '7:55 AM',  isRead: true,  hasAttachment: false },
];

// ── Receipts ────────────────────────────────────────────
const receiptEmails: EmailData[] = [
  { id: 'r1', avatar: 'https://www.figma.com/api/mcp/asset/8d66fc2c-a3a3-4f02-9c22-56931b7fef67', avatarBg: 'white', sender: 'Amazon', subject: 'Your order has been shipped! Track it here.',      time: '2:11 PM',  isRead: false, hasAttachment: true  },
  { id: 'r2', avatar: 'https://www.figma.com/api/mcp/asset/a4ee4923-c69b-429a-b41c-87c7131a3753', sender: 'Lloyds',  subject: 'Your monthly bank statement is ready to view.',          time: '11:30 AM', isRead: false, hasAttachment: true  },
  { id: 'r3', avatar: 'https://www.figma.com/api/mcp/asset/f3254800-5a50-4e36-9018-8e602f91fb15', sender: 'Tesco',   subject: 'Special discounts on your favorite items this week!',    time: '9:02 AM',  isRead: true,  hasAttachment: false },
];

// ── Notifications ────────────────────────────────────────
const notificationEmails: EmailData[] = [
  { id: 'n1', avatar: 'https://www.figma.com/api/mcp/asset/a6e92f1a-2679-4cd7-a846-2e4bc2b9d811', sender: 'Weather Update',    subject: 'Severe weather alert for your area this weekend!', time: '10:35 AM', isRead: false, hasAttachment: true  },
  { id: 'n2', avatar: 'https://www.figma.com/api/mcp/asset/195558f0-6ed1-4e3a-b93d-2a2713ca120b', sender: 'Government Portal', subject: 'Please review the updated account policies.',       time: '8:22 AM',  isRead: true,  hasAttachment: false },
  { id: 'n3', avatar: 'https://www.figma.com/api/mcp/asset/6998ce38-514c-41f4-b68a-685136685ad2', sender: 'Jet2',              subject: 'Your travel itinerary is confirmed!',               time: '8:51 AM',  isRead: false, hasAttachment: true  },
];

// ── Newsletters ──────────────────────────────────────────
const newsletterEmails: EmailData[] = [];

export const BUNDLES: BundleDef[] = [
  { id: 'social',        icon: 'ic-users',          title: 'Social',        emails: socialEmails },
  { id: 'receipts',      icon: 'ic-pass-cheque',    title: 'Receipts',      emails: receiptEmails },
  { id: 'notifications', icon: 'ic-bell-2',         title: 'Notifications', emails: notificationEmails },
  { id: 'newsletters',   icon: 'ic-envelope-check', title: 'Newsletters',   emails: newsletterEmails },
];

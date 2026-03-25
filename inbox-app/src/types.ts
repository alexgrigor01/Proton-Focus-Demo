import type { BundleId } from './data/bundles';

export interface SelectedEmail {
  avatar?: string;
  avatarLetter?: string;
  avatarBg?: 'dark' | 'white';
  sender: string;
  subject: string;
  time: string;
  isRead?: boolean;
  /** Which section the email was opened from */
  context: 'now' | BundleId;
  /** Why this email is in Now / in its bundle */
  reason?: string;
  /** True when opened from the flat Regular inbox (hides Focus-specific tag) */
  fromRegularView?: boolean;
}

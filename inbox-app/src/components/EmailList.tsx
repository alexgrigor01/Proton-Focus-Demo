import { useState } from 'react';
import { Icon } from './Icon';
import type { IconColor } from './Icon';
import type { BundleId } from '../data/bundles';
import type { SelectedEmail } from '../types';

type FilterTab = 'All' | 'Read' | 'Unread' | 'Has attachments';

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 right-0 z-50 pointer-events-none">
          <div className="bg-white text-[#1a1a24] text-[14px] font-normal whitespace-nowrap px-3 py-1.5 rounded-lg shadow-lg">
            {label}
          </div>
          <div className="flex justify-end pr-[10px]">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid white',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Avatar URLs from Figma (node 20-8444) ───────────────
const imgBarclays    = 'https://www.figma.com/api/mcp/asset/ad3ed310-80c6-41da-b799-31ca90442ebe';
const imgThamesWater = 'https://www.figma.com/api/mcp/asset/269ee063-a492-4895-b53e-4ca7702ded99';
const imgNotion      = 'https://www.figma.com/api/mcp/asset/434eaae1-f46a-4695-8204-fa7ad0c6d7a9';
const imgCalendar    = 'https://www.figma.com/api/mcp/asset/dd657b41-8410-475d-a149-1391a056c63c';
const imgSlack       = 'https://www.figma.com/api/mcp/asset/85f105d9-4593-4c71-9b71-74c583a7ba09';
const imgFacebook    = 'https://www.figma.com/api/mcp/asset/0668bcc6-3ac9-489a-ab2d-4ce28c9ebc3a';
const imgLinkedIn    = 'https://www.figma.com/api/mcp/asset/1b9f6345-6f81-4806-aa48-8ac1a0452038';
const imgStrava      = 'https://www.figma.com/api/mcp/asset/54e54512-2598-4ccf-aae3-d04530ee5526';
const imgAmazon      = 'https://www.figma.com/api/mcp/asset/8d66fc2c-a3a3-4f02-9c22-56931b7fef67';
const imgLloyds      = 'https://www.figma.com/api/mcp/asset/a4ee4923-c69b-429a-b41c-87c7131a3753';
const imgTesco       = 'https://www.figma.com/api/mcp/asset/f3254800-5a50-4e36-9018-8e602f91fb15';
const imgWeather     = 'https://www.figma.com/api/mcp/asset/a6e92f1a-2679-4cd7-a846-2e4bc2b9d811';
const imgGovPortal   = 'https://www.figma.com/api/mcp/asset/195558f0-6ed1-4e3a-b93d-2a2713ca120b';
const imgJet2        = 'https://www.figma.com/api/mcp/asset/6998ce38-514c-41f4-b68a-685136685ad2';

type SectionId = 'now' | 'social' | 'receipts' | 'notifications' | 'newsletters';

const nowActions = [
  { icon: 'ic-checkmark-circle', title: 'Clear from Now', isClear: true },
  { icon: 'ic-envelope-open',    title: 'Mark read',       isClear: false },
  { icon: 'ic-trash',            title: 'Delete',          isClear: false },
  { icon: 'ic-archive-box',      title: 'Archive',         isClear: false },
  { icon: 'ic-clock',            title: 'Snooze',          isClear: false },
] as const;

const bundleActions = nowActions.filter((a) => !a.isClear);

interface NowEmail {
  id: string;
  avatar?: string;
  avatarLetter?: string;
  avatarBg?: 'dark' | 'white';
  sender: string;
  subject: string;
  time: string;
  isRead?: boolean;
  hasAttachment?: boolean;
  label?: string;
  labelVisible?: boolean;
  reason?: string;
}

interface EmailRowProps {
  avatar?: string;
  avatarLetter?: string;
  avatarBg?: 'dark' | 'white';
  sender: string;
  subject: string;
  time: string;
  isRead?: boolean;
  hasAttachment?: boolean;
  label?: string;
  labelVisible?: boolean;
  compact?: boolean;
  onClearFromNow?: () => void;
  onClick?: () => void;
}

function EmailRow({
  avatar,
  avatarLetter,
  avatarBg = 'dark',
  sender,
  subject,
  time,
  isRead = false,
  hasAttachment = false,
  label,
  labelVisible = false,
  compact = false,
  onClearFromNow,
  onClick,
}: EmailRowProps) {
  const starColor: IconColor = isRead ? 'dim' : 'muted';
  const actions = onClearFromNow ? nowActions : bundleActions;

  return (
    <div
      onClick={onClick}
      className={`border-b border-pm-border flex items-center justify-between px-4 w-full cursor-pointer transition-colors group ${
        compact ? 'py-2.5' : 'py-3'
      } ${
        isRead ? 'bg-pm-bg-dark hover:bg-pm-bg-elevated/60' : 'bg-pm-bg-elevated hover:bg-pm-bg-elevated/80'
      }`}
    >
      <div className="flex items-center">
        <div className="flex gap-4 items-center w-[400px]">
          <div
            className={`rounded-md overflow-hidden shrink-0 size-7 flex items-center justify-center ${
              avatarBg === 'white' ? 'bg-white' : 'bg-pm-pill'
            }`}
          >
            {avatarLetter ? (
              <span className="text-white text-[12px] font-normal">{avatarLetter}</span>
            ) : avatar ? (
              <img src={avatar} alt={sender} className="w-full h-full object-cover" />
            ) : null}
          </div>

          <Icon
            name="ic-star"
            size={16}
            color={starColor}
            className="cursor-pointer hover:brightness-150 transition-all"
          />

          <span
            className={`text-[14px] whitespace-nowrap ${
              isRead ? 'text-pm-text-muted font-normal' : 'text-white font-semibold'
            }`}
          >
            {sender}
          </span>

          {label && (
            <div
              className={`bg-pm-input flex items-center justify-center px-1.5 py-1 rounded transition-opacity ${
                labelVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span className="text-pm-purple text-[11px] font-semibold">{label}</span>
            </div>
          )}
        </div>

        <span
          className={`text-[14px] whitespace-nowrap ${
            isRead ? 'text-pm-text-muted font-normal' : 'text-white font-semibold'
          }`}
        >
          {subject}
        </span>
      </div>

      {/* Default: time + attachment  |  On hover: action icons */}
      <div className="flex items-center">
        <div className="flex gap-3 items-center group-hover:hidden">
          {hasAttachment && (
            <Icon name="ic-paper-clip" size={16} color={isRead ? 'muted' : 'white'} />
          )}
          <span className={`text-[14px] whitespace-nowrap ${isRead ? 'text-pm-text-muted' : 'text-white'}`}>
            {time}
          </span>
        </div>

        <div className="hidden group-hover:flex gap-1 items-center">
          {actions.map((action) => (
            <Tooltip key={action.icon} label={action.title}>
              <button
                className={`flex items-center justify-center size-7 rounded-md transition-colors ${
                  isRead ? 'hover:bg-white/10' : 'hover:bg-white/[0.08]'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (action.isClear && onClearFromNow) onClearFromNow();
                }}
              >
                <Icon name={action.icon} size={16} color={isRead ? 'muted' : 'white'} />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  icon: string;
  title: string;
  count?: number;
  isOpen: boolean;
  onToggle: () => void;
  onViewAll?: () => void;
  showViewAll?: boolean;
  isNow?: boolean;
  pill?: string;
}

function SectionHeader({ icon, title, count, isOpen, onToggle, onViewAll, showViewAll = false, isNow = false, pill }: SectionHeaderProps) {
  return (
    <div
      className="border-b border-pm-border flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors bg-pm-bg hover:bg-pm-bg-hover/40"
      onClick={onToggle}
    >
      <div className="flex gap-3 items-center">
        <Icon name={icon} size={16} color={isNow ? 'white' : 'muted'} />
        <span className={`whitespace-nowrap font-medium ${isNow ? 'text-white text-[16px]' : 'text-white text-[14px]'}`}>
          {title}
        </span>
        {count !== undefined && (
          <span className="text-pm-text-muted text-[11px] font-medium">{count}</span>
        )}
        {pill && (
          <span
            className="text-[11px] font-normal px-3 py-0.5"
            style={{
              borderRadius: 8,
              background: 'rgba(115, 73, 255, 0.40)',
              color: '#DFD6FF',
            }}
          >
            {pill}
          </span>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {showViewAll && isOpen && (
          <span
            className="text-pm-purple text-[14px] hover:underline"
            onClick={(e) => { e.stopPropagation(); onViewAll?.(); }}
          >
            View all
          </span>
        )}
        <div
          className="transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <Icon name="ic-chevron-down-filled" size={16} color={isNow ? 'white' : 'muted'} />
        </div>
      </div>
    </div>
  );
}

const INITIAL_NOW_EMAILS: NowEmail[] = [
  { id: 'barclays',  avatar: imgBarclays,    avatarBg: 'dark',  sender: 'Barclays',     subject: 'Your account is overdrawn. Immediate action required!',          time: '3:00 PM',  isRead: false, hasAttachment: false, reason: 'time-sensitive' },
  { id: 'johndoe',   avatarLetter: 'J',                         sender: 'John Doe',     subject: 'Hey! Just checking in. How have you been?',                      time: '2:58 PM',  isRead: false, hasAttachment: false, reason: 'recent reply thread' },
  { id: 'thames',    avatar: imgThamesWater, avatarBg: 'dark',  sender: 'Thames Water', subject: 'Your utility bill is due in 5 days. Pay now to avoid late fees.', time: '2:41 PM',  isRead: false, hasAttachment: true,  reason: 'time-sensitive' },
  { id: 'calendar',  avatar: imgCalendar,    avatarBg: 'dark',  sender: 'Calendar',     subject: "Don't forget about the meeting tomorrow at 10 AM!",               time: '12:11 PM', isRead: false, hasAttachment: true,  reason: 'time-sensitive', label: 'Official', labelVisible: true },
  { id: 'slack',     avatar: imgSlack,       avatarBg: 'white', sender: 'Slack',        subject: "Don't forget the deadline for the project is next Friday!",       time: '11:19 AM', isRead: false, hasAttachment: false, reason: 'recent reply thread' },
  { id: 'notion',    avatar: imgNotion,      avatarBg: 'white', sender: 'Notion',       subject: 'New comments added to your project!',                            time: '2:32 PM',  isRead: false, hasAttachment: true,  reason: 'VIP sender' },
];

// Bundle preview rows (shown in focused accordion)
const BUNDLE_PREVIEWS = {
  social: [
    { id: 's1', avatar: imgFacebook, avatarBg: 'dark'  as const, sender: 'Facebook', subject: 'You have new friend requests and messages!',   time: '1:50 PM',  isRead: false, hasAttachment: false },
    { id: 's2', avatar: imgLinkedIn, avatarBg: 'dark'  as const, sender: 'LinkedIn', subject: 'Someone wants to connect with you!',            time: '12:05 PM', isRead: false, hasAttachment: true  },
    { id: 's3', avatar: imgStrava,   avatarBg: 'dark'  as const, sender: 'Strava',   subject: 'You met your goals this week! Keep it up!',     time: '7:55 AM',  isRead: true,  hasAttachment: false },
  ],
  receipts: [
    { id: 'r1', avatar: imgAmazon,  avatarBg: 'white' as const, sender: 'Amazon',  subject: 'Your order has been shipped! Track it here.',     time: '2:11 PM',  isRead: false, hasAttachment: true  },
    { id: 'r2', avatar: imgLloyds,  avatarBg: 'dark'  as const, sender: 'Lloyds',  subject: 'Your monthly bank statement is ready to view.',   time: '11:30 AM', isRead: false, hasAttachment: true  },
    { id: 'r3', avatar: imgTesco,   avatarBg: 'dark'  as const, sender: 'Tesco',   subject: 'Special discounts on your favorite items this week!', time: '9:02 AM', isRead: true, hasAttachment: false },
  ],
  notifications: [
    { id: 'n1', avatar: imgWeather,   avatarBg: 'dark' as const, sender: 'Weather Update',    subject: 'Severe weather alert for your area this weekend!', time: '10:35 AM', isRead: false, hasAttachment: true  },
    { id: 'n2', avatar: imgGovPortal, avatarBg: 'dark' as const, sender: 'Government Portal', subject: 'Please review the updated account policies.',       time: '8:22 AM',  isRead: true,  hasAttachment: false },
    { id: 'n3', avatar: imgJet2,      avatarBg: 'dark' as const, sender: 'Jet2',              subject: 'Your travel itinerary is confirmed!',               time: '8:51 AM',  isRead: false, hasAttachment: true  },
  ],
  newsletters: [] as { id: string; avatar?: string; avatarLetter?: string; avatarBg: 'dark' | 'white'; sender: string; subject: string; time: string; isRead?: boolean; hasAttachment?: boolean }[],
};

function applyFilter<T extends { isRead?: boolean; hasAttachment?: boolean }>(emails: T[], filter: FilterTab): T[] {
  if (filter === 'Read')            return emails.filter((e) => e.isRead);
  if (filter === 'Unread')          return emails.filter((e) => !e.isRead);
  if (filter === 'Has attachments') return emails.filter((e) => e.hasAttachment);
  return emails;
}

interface EmailListProps {
  onViewBundle: (id: BundleId) => void;
  onEmailClick?: (email: SelectedEmail) => void;
  activeFilter?: FilterTab;
}

export function EmailList({ onViewBundle, onEmailClick, activeFilter = 'All' }: EmailListProps) {
  const [openSection, setOpenSection] = useState<SectionId | null>('now');
  const [nowEmails, setNowEmails] = useState<NowEmail[]>(INITIAL_NOW_EMAILS);

  function toggle(id: SectionId) {
    setOpenSection((prev) => (prev === id ? null : id));
  }

  function clearFromNow(id: string) {
    setNowEmails((prev) => prev.filter((e) => e.id !== id));
  }

  const is = (id: SectionId) => openSection === id;

  const filteredNow = applyFilter(nowEmails, activeFilter);
  const nowEmpty = nowEmails.length === 0;
  const nowCollapsedCaughtUp = nowEmpty && !is('now');

  function makeEmailPayload(e: NowEmail, context: SelectedEmail['context']): SelectedEmail {
    return {
      avatar: e.avatar,
      avatarLetter: e.avatarLetter,
      avatarBg: e.avatarBg ?? 'dark',
      sender: e.sender,
      subject: e.subject,
      time: e.time,
      isRead: e.isRead,
      context,
      reason: e.reason,
    };
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto">

      {/* ─── NOW SECTION ─── */}
      <div className={`border-b-2 ${is('now') ? 'border-pm-purple' : 'border-pm-border'}`}>
        <SectionHeader
          icon="ic-bolt"
          title="Now"
          count={nowEmpty ? undefined : nowEmails.length}
          isOpen={is('now')}
          onToggle={() => toggle('now')}
          isNow
          pill={nowCollapsedCaughtUp ? 'All caught up!' : undefined}
        />
        {is('now') && (
          <>
            {nowEmails.length === 0 ? (
              <div className="bg-pm-bg-elevated flex items-center justify-center px-8 py-12">
                <p className="text-pm-text-muted text-base font-normal leading-normal text-center">
                  You're all caught up — nothing needs your attention right now!
                </p>
              </div>
            ) : filteredNow.length === 0 ? (
              <div className="bg-pm-bg-elevated flex items-center justify-center px-8 py-10">
                <p className="text-pm-text-muted text-[14px] font-normal text-center">
                  No messages match this filter.
                </p>
              </div>
            ) : (
              filteredNow.map((email) => (
                <EmailRow
                  key={email.id}
                  avatar={email.avatar}
                  avatarLetter={email.avatarLetter}
                  avatarBg={email.avatarBg ?? 'dark'}
                  sender={email.sender}
                  subject={email.subject}
                  time={email.time}
                  isRead={email.isRead}
                  hasAttachment={email.hasAttachment}
                  label={email.label}
                  labelVisible={email.labelVisible}
                  onClearFromNow={() => clearFromNow(email.id)}
                  onClick={() => onEmailClick?.(makeEmailPayload(email, 'now'))}
                />
              ))
            )}
          </>
        )}
      </div>

      {/* ─── BUNDLES SEPARATOR ─── */}
      <div className="bg-pm-bg-dark flex items-center gap-3 px-4 py-2.5">
        <div className="h-px flex-1 bg-pm-border" />
        <span className="text-pm-text-dim text-[11px] font-medium tracking-wider uppercase">Bundles</span>
        <div className="h-px flex-1 bg-pm-border" />
      </div>

      {/* ─── BUNDLES SECTION ─── */}
      <div className="bg-pm-bg-dark">

        {/* Social */}
        <SectionHeader
          icon="ic-users"
          title="Social"
          count={3}
          isOpen={is('social')}
          onToggle={() => toggle('social')}
          showViewAll
          onViewAll={() => onViewBundle('social')}
        />
        {is('social') && (() => {
          const rows = applyFilter(BUNDLE_PREVIEWS.social, activeFilter);
          return rows.length === 0
            ? <div className="bg-pm-bg-dark flex items-center justify-center px-8 py-4">
                <p className="text-pm-text-muted text-[13px] font-normal text-center">No messages match this filter.</p>
              </div>
            : rows.map((e) => (
                <EmailRow key={e.id} avatar={e.avatar} avatarBg={e.avatarBg} sender={e.sender} subject={e.subject}
                  time={e.time} isRead={e.isRead} hasAttachment={e.hasAttachment} compact
                  onClick={() => onEmailClick?.({ avatar: e.avatar, avatarBg: e.avatarBg, sender: e.sender, subject: e.subject, time: e.time, isRead: e.isRead, context: 'social', reason: 'Sender type' })} />
              ));
        })()}

        {/* Receipts */}
        <SectionHeader
          icon="ic-pass-cheque"
          title="Receipts"
          count={3}
          isOpen={is('receipts')}
          onToggle={() => toggle('receipts')}
          showViewAll
          onViewAll={() => onViewBundle('receipts')}
        />
        {is('receipts') && (() => {
          const rows = applyFilter(BUNDLE_PREVIEWS.receipts, activeFilter);
          return rows.length === 0
            ? <div className="bg-pm-bg-dark flex items-center justify-center px-8 py-4">
                <p className="text-pm-text-muted text-[13px] font-normal text-center">No messages match this filter.</p>
              </div>
            : rows.map((e) => (
                <EmailRow key={e.id} avatar={e.avatar} avatarBg={e.avatarBg} sender={e.sender} subject={e.subject}
                  time={e.time} isRead={e.isRead} hasAttachment={e.hasAttachment} compact
                  onClick={() => onEmailClick?.({ avatar: e.avatar, avatarBg: e.avatarBg, sender: e.sender, subject: e.subject, time: e.time, isRead: e.isRead, context: 'receipts', reason: 'Sender type' })} />
              ));
        })()}

        {/* Notifications */}
        <SectionHeader
          icon="ic-bell-2"
          title="Notifications"
          count={3}
          isOpen={is('notifications')}
          onToggle={() => toggle('notifications')}
          showViewAll
          onViewAll={() => onViewBundle('notifications')}
        />
        {is('notifications') && (() => {
          const rows = applyFilter(BUNDLE_PREVIEWS.notifications, activeFilter);
          return rows.length === 0
            ? <div className="bg-pm-bg-dark flex items-center justify-center px-8 py-4">
                <p className="text-pm-text-muted text-[13px] font-normal text-center">No messages match this filter.</p>
              </div>
            : rows.map((e) => (
                <EmailRow key={e.id} avatar={e.avatar} avatarBg={e.avatarBg} sender={e.sender} subject={e.subject}
                  time={e.time} isRead={e.isRead} hasAttachment={e.hasAttachment} compact
                  onClick={() => onEmailClick?.({ avatar: e.avatar, avatarBg: e.avatarBg, sender: e.sender, subject: e.subject, time: e.time, isRead: e.isRead, context: 'notifications', reason: 'Sender type' })} />
              ));
        })()}

        {/* Newsletters — empty */}
        <SectionHeader
          icon="ic-envelope-check"
          title="Newsletters"
          isOpen={is('newsletters')}
          onToggle={() => toggle('newsletters')}
          pill={!is('newsletters') ? 'All caught up!' : undefined}
        />
        {is('newsletters') && (
          <div className="bg-pm-bg-elevated flex items-center justify-center px-8 py-12">
            <p className="text-pm-text-muted text-base font-normal leading-normal text-center">
              All caught up on newsletters!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

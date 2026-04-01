import { useState } from 'react';
import { Icon } from './Icon';
import type { IconColor } from './Icon';
import type { SelectedEmail } from '../types';
import { EMAIL_AVATAR } from '../constants/emailAvatars';

type FilterTab = 'All' | 'Read' | 'Unread' | 'Has attachments';

const {
  barclays: imgBarclays,
  thamesWater: imgThamesWater,
  notion: imgNotion,
  calendar: imgCalendar,
  slack: imgSlack,
  facebook: imgFacebook,
  linkedin: imgLinkedIn,
  strava: imgStrava,
  amazon: imgAmazon,
  lloyds: imgLloyds,
  tesco: imgTesco,
  weather: imgWeather,
  govPortal: imgGovPortal,
  jet2: imgJet2,
} = EMAIL_AVATAR;

interface RegularEmail {
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
}

const ALL_EMAILS: RegularEmail[] = [
  { id: 'barclays',  avatar: imgBarclays,    avatarBg: 'dark',  sender: 'Barclays',          subject: 'Your account is overdrawn. Immediate action required!',          time: '3:00 PM',  isRead: false, hasAttachment: false },
  { id: 'johndoe',   avatarLetter: 'J',                         sender: 'John Doe',          subject: 'Hey! Just checking in. How have you been?',                      time: '2:58 PM',  isRead: false, hasAttachment: false },
  { id: 'thames',    avatar: imgThamesWater, avatarBg: 'dark',  sender: 'Thames Water',      subject: 'Your utility bill is due in 5 days. Pay now to avoid late fees.', time: '2:41 PM',  isRead: false, hasAttachment: true  },
  { id: 'notion',    avatar: imgNotion,      avatarBg: 'white', sender: 'Notion',            subject: 'New comments added to your project!',                            time: '2:32 PM',  isRead: false, hasAttachment: true  },
  { id: 'amazon',    avatar: imgAmazon,      avatarBg: 'white', sender: 'Amazon',            subject: 'Your order has been shipped! Track it here.',                    time: '2:11 PM',  isRead: false, hasAttachment: true  },
  { id: 'facebook',  avatar: imgFacebook,    avatarBg: 'dark',  sender: 'Facebook',          subject: 'You have new friend requests and messages!',                     time: '1:50 PM',  isRead: false, hasAttachment: false },
  { id: 'calendar',  avatar: imgCalendar,    avatarBg: 'dark',  sender: 'Calendar',          subject: "Don't forget about the meeting tomorrow at 10 AM!",               time: '12:11 PM', isRead: false, hasAttachment: true,  label: 'Official', labelVisible: true },
  { id: 'linkedin',  avatar: imgLinkedIn,    avatarBg: 'dark',  sender: 'LinkedIn',          subject: 'Someone wants to connect with you!',                             time: '12:05 PM', isRead: false, hasAttachment: true  },
  { id: 'lloyds',    avatar: imgLloyds,      avatarBg: 'dark',  sender: 'Lloyds',            subject: 'Your monthly bank statement is ready to view.',                  time: '11:30 AM', isRead: true,  hasAttachment: true  },
  { id: 'slack',     avatar: imgSlack,       avatarBg: 'white', sender: 'Slack',             subject: "Don't forget the deadline for the project is next Friday!",       time: '11:19 AM', isRead: false, hasAttachment: false },
  { id: 'weather',   avatar: imgWeather,     avatarBg: 'dark',  sender: 'Weather Update',    subject: 'Severe weather alert for your area this weekend!',                time: '10:35 AM', isRead: false, hasAttachment: true  },

  { id: 'tesco',     avatar: imgTesco,       avatarBg: 'dark',  sender: 'Tesco',             subject: 'Special discounts on your favorite items this week!',            time: '9:02 AM',  isRead: true,  hasAttachment: false },
  { id: 'jet2',      avatar: imgJet2,        avatarBg: 'dark',  sender: 'Jet2',              subject: 'Your travel itinerary is confirmed!',                            time: '8:51 AM',  isRead: false, hasAttachment: true  },
  { id: 'govportal', avatar: imgGovPortal,   avatarBg: 'dark',  sender: 'Government Portal', subject: 'Please review the updated account policies.',                    time: '8:22 AM',  isRead: true,  hasAttachment: false },
  { id: 'strava',    avatar: imgStrava,      avatarBg: 'dark',  sender: 'Strava',            subject: 'You met your goals this week! Keep it up!',                      time: '7:55 AM',  isRead: true,  hasAttachment: false },
];

const rowActions = [
  { icon: 'ic-envelope-open', title: 'Mark read'  },
  { icon: 'ic-trash',         title: 'Delete'     },
  { icon: 'ic-archive-box',   title: 'Archive'    },
  { icon: 'ic-clock',         title: 'Snooze'     },
] as const;

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

function RegularEmailRow({
  email,
  onClick,
}: {
  email: RegularEmail;
  onClick?: () => void;
}) {
  const { avatar, avatarLetter, avatarBg = 'dark', sender, subject, time, isRead = false, hasAttachment = false, label, labelVisible = false } = email;
  const starColor: IconColor = isRead ? 'dim' : 'white';

  return (
    <div
      onClick={onClick}
      className={`border-b border-pm-border flex items-center justify-between px-4 py-3 w-full cursor-pointer transition-colors group ${
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
          {rowActions.map((action) => (
            <Tooltip key={action.icon} label={action.title}>
              <button
                className={`flex items-center justify-center size-7 rounded-md transition-colors ${
                  isRead ? 'hover:bg-white/10' : 'hover:bg-white/[0.08]'
                }`}
                onClick={(e) => e.stopPropagation()}
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

function applyFilter(emails: RegularEmail[], filter: FilterTab): RegularEmail[] {
  if (filter === 'Read')            return emails.filter((e) => e.isRead);
  if (filter === 'Unread')          return emails.filter((e) => !e.isRead);
  if (filter === 'Has attachments') return emails.filter((e) => e.hasAttachment);
  return emails;
}

interface RegularEmailListProps {
  onEmailClick?: (email: SelectedEmail) => void;
  activeFilter?: FilterTab;
}

export function RegularEmailList({ onEmailClick, activeFilter = 'All' }: RegularEmailListProps) {
  const filtered = applyFilter(ALL_EMAILS, activeFilter);

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center px-8 py-16">
        <p className="text-pm-text-muted text-[14px] font-normal text-center">
          No messages match this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {filtered.map((email) => (
        <RegularEmailRow
          key={email.id}
          email={email}
          onClick={() =>
            onEmailClick?.({
              avatar: email.avatar,
              avatarLetter: email.avatarLetter,
              avatarBg: email.avatarBg ?? 'dark',
              sender: email.sender,
              subject: email.subject,
              time: email.time,
              isRead: email.isRead,
              context: 'now',
              reason: 'VIP sender',
              fromRegularView: true,
            })
          }
        />
      ))}
    </div>
  );
}

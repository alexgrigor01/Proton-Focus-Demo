import { useState } from 'react';
import { Icon } from './Icon';
import type { IconColor } from './Icon';
import { BUNDLES } from '../data/bundles';
import type { BundleId, EmailData } from '../data/bundles';
import { InboxToolbar } from './InboxToolbar';
import type { SelectedEmail } from '../types';

type FilterTab = 'All' | 'Read' | 'Unread' | 'Has attachments';
type InboxView = 'Regular' | 'Focus';

// ── Tooltip (same as in EmailList) ──────────────────────
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
            <div className="w-0 h-0" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid white' }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Bundle email row ─────────────────────────────────────
const rowActions = [
  { icon: 'ic-envelope-open', title: 'Mark read' },
  { icon: 'ic-trash',         title: 'Delete' },
  { icon: 'ic-archive-box',   title: 'Archive' },
  { icon: 'ic-clock',         title: 'Snooze' },
] as const;

function EmailRow({ email, onClick }: { email: EmailData; onClick?: () => void }) {
  const {
    avatar,
    avatarLetter,
    avatarBg = 'dark',
    sender,
    subject,
    time,
    isRead = false,
    hasAttachment = false,
  } = email;
  const starColor: IconColor = isRead ? 'dim' : 'muted';

  return (
    <div
      onClick={onClick}
      className={`border-b border-pm-border flex items-center justify-between px-4 py-3 w-full cursor-pointer transition-colors group ${
        isRead ? 'bg-pm-bg-dark hover:bg-pm-bg-elevated/60' : 'bg-pm-bg-elevated hover:bg-pm-bg-elevated/80'
      }`}
    >
      <div className="flex items-center">
        <div className="flex gap-4 items-center w-[400px]">
          <div className={`rounded-md overflow-hidden shrink-0 size-7 flex items-center justify-center ${avatarBg === 'white' ? 'bg-white' : 'bg-pm-pill'}`}>
            {avatarLetter
              ? <span className="text-white text-[12px] font-normal">{avatarLetter}</span>
              : avatar
              ? <img src={avatar} alt={sender} className="w-full h-full object-cover" />
              : null}
          </div>
          <Icon name="ic-star" size={16} color={starColor} className="cursor-pointer hover:brightness-150 transition-all" />
          <span className={`text-[14px] whitespace-nowrap ${isRead ? 'text-pm-text-muted font-normal' : 'text-white font-semibold'}`}>
            {sender}
          </span>
        </div>
        <span className={`text-[14px] whitespace-nowrap ${isRead ? 'text-pm-text-muted font-normal' : 'text-white font-semibold'}`}>
          {subject}
        </span>
      </div>

      <div className="flex items-center">
        <div className="flex gap-3 items-center group-hover:hidden">
          {hasAttachment && (
            <Icon name="ic-paper-clip" size={16} color={isRead ? 'muted' : 'white'} />
          )}
          <span className={`text-[14px] whitespace-nowrap ${isRead ? 'text-pm-text-muted' : 'text-white'}`}>{time}</span>
        </div>
        <div className="hidden group-hover:flex gap-1 items-center">
          {rowActions.map((action) => (
            <Tooltip key={action.icon} label={action.title}>
              <button
                className={`flex items-center justify-center size-7 rounded-md transition-colors ${isRead ? 'hover:bg-white/10' : 'hover:bg-white/[0.08]'}`}
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

interface BundleViewProps {
  bundleId: BundleId;
  onBack: () => void;
  activeView: InboxView;
  activeFilter: FilterTab;
  onViewChange: (view: InboxView) => void;
  onFilterChange: (filter: FilterTab) => void;
  onEmailClick?: (email: SelectedEmail) => void;
}

export function BundleView({
  bundleId,
  onBack,
  activeView,
  activeFilter,
  onViewChange,
  onFilterChange,
  onEmailClick,
}: BundleViewProps) {
  const bundle = BUNDLES.find((b) => b.id === bundleId)!;

  const filteredEmails = bundle.emails.filter((e) => {
    if (activeFilter === 'Read') return e.isRead;
    if (activeFilter === 'Unread') return !e.isRead;
    if (activeFilter === 'Has attachments') return e.hasAttachment;
    return true;
  });

  return (
    <div className="flex flex-col w-full h-full">
      {/* Row 1 — same as Focus inbox toolbar */}
      <InboxToolbar
        activeView={activeView}
        activeFilter={activeFilter}
        onViewChange={onViewChange}
        onFilterChange={onFilterChange}
        hideViewToggle
        overflowMenuVariant="bundle"
        bundleVisibleCount={filteredEmails.length}
      />

      {/* Row 2 — bundle breadcrumb (height / padding match EmailList bundle SectionHeader: py-3, bg-pm-bg) */}
      <div className="bg-pm-bg border-b border-pm-border flex items-center px-4 py-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center size-7 rounded-md hover:bg-pm-bg-hover transition-colors shrink-0"
            aria-label="Back to Focus inbox"
          >
            <Icon name="ic-arrow-left" size={16} color="white" />
          </button>
          <div className="flex items-center gap-2 min-w-0 text-[14px]">
            <span className="text-pm-text-muted font-medium whitespace-nowrap">Focus</span>
            <span className="text-pm-text-muted font-medium" aria-hidden>
              /
            </span>
            <Icon name={bundle.icon} size={16} color="muted" />
            <span className="text-white font-medium whitespace-nowrap truncate">{bundle.title}</span>
            <span className="text-pm-text-muted text-[11px] font-medium shrink-0 tabular-nums">
              {filteredEmails.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-pm-bg-dark">
        {filteredEmails.length === 0 ? (
          <div className="flex items-center justify-center px-8 py-16">
            <span
              className="text-[13px] font-normal px-4 py-1.5"
              style={{
                borderRadius: 8,
                background: 'rgba(115, 73, 255, 0.40)',
                color: '#DFD6FF',
              }}
            >
              All caught up!
            </span>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <EmailRow
              key={email.id}
              email={email}
              onClick={() => onEmailClick?.({
                avatar: email.avatar,
                avatarLetter: email.avatarLetter,
                avatarBg: email.avatarBg,
                sender: email.sender,
                subject: email.subject,
                time: email.time,
                isRead: email.isRead,
                context: bundleId,
                reason: 'Sender type',
              })}
            />
          ))
        )}
      </div>
    </div>
  );
}

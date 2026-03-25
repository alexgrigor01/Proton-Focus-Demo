import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { BUNDLES } from '../data/bundles';
import type { SelectedEmail } from '../types';

// ── Context tag config ────────────────────────────────────────────────────────
function getContextTag(context: SelectedEmail['context']) {
  if (context === 'now') return { icon: 'ic-bolt', label: 'In Now', bundleTitle: 'Now' };
  const bundle = BUNDLES.find((b) => b.id === context);
  return { icon: bundle?.icon ?? 'ic-inbox', label: `In ${bundle?.title ?? 'Bundle'}`, bundleTitle: bundle?.title ?? 'Bundle' };
}

const SENDER_DOMAINS: Record<string, string> = {
  'Facebook':         'facebook.com',
  'LinkedIn':         'linkedin.com',
  'Strava':           'strava.com',
  'Amazon':           'amazon.co.uk',
  'Lloyds':           'lloyds.co.uk',
  'Tesco':            'tesco.com',
  'Weather Update':   'weather.com',
  'Government Portal':'gov.uk',
  'Jet2':             'jet2.com',
  'Barclays':         'barclays.co.uk',
  'John Doe':         'gmail.com',
  'Thames Water':     'thameswater.co.uk',
  'Calendar':         'google.com',
  'Slack':            'slack.com',
  'Notion':           'notion.so',
};

function getSenderDomain(sender: string) {
  return SENDER_DOMAINS[sender] ?? `${sender.toLowerCase().replace(/\s+/g, '')}.com`;
}

// ── Top-bar action groups (left side of the header row) ──────────────────────
const topBarGroups: { icon: string; title: string }[][] = [
  [
    { icon: 'ic-envelope-dot',   title: 'Mark as unread' },
  ],
  [
    { icon: 'ic-trash',          title: 'Delete' },
    { icon: 'ic-archive-box',    title: 'Archive' },
    { icon: 'ic-folder-arrow-in', title: 'Move to folder' },
  ],
  [
    { icon: 'ic-folder-arrow-in', title: 'Move to folder' },
    { icon: 'ic-tag',             title: 'Label' },
  ],
  [
    { icon: 'ic-clock',          title: 'Snooze' },
  ],
];

// ── Email body toolbar actions ────────────────────────────────────────────────
const primaryBodyActions = [
  { icon: 'ic-envelope-dot',      title: 'Mark as unread' },
  { icon: 'ic-trash',             title: 'Delete' },
  { icon: 'ic-folder-arrow-in',   title: 'Move to folder' },
  { icon: 'ic-tag',               title: 'Label' },
  { icon: 'ic-sliders',           title: 'Filter messages like this' },
  { icon: 'ic-three-dots-horizontal', title: 'More actions' },
] as const;

const secondaryBodyActions = [
  { icon: 'ic-arrow-up-and-left-big',   title: 'Reply' },
  { icon: 'ic-arrows-up-and-left-big',  title: 'Reply all' },
  { icon: 'ic-arrow-up-and-right-big',  title: 'Forward' },
] as const;

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// ── Dropdown menu item ────────────────────────────────────────────────────────
function MenuItem({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      className="flex w-full items-center px-4 py-3 text-left text-white text-[14px] font-normal hover:bg-white/[0.06] transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
interface EmailDetailViewProps {
  email: SelectedEmail;
  onClose: () => void;
}

export function EmailDetailView({ email, onClose }: EmailDetailViewProps) {
  const tag = getContextTag(email.context);
  const fromEmail = `${email.sender.toLowerCase().replace(/\s+/g, '.')}@mock-email.com`;
  const domain = getSenderDomain(email.sender);
  const rawReason = email.reason ?? (email.context === 'now' ? 'VIP sender' : 'Sender type');
  const reason = rawReason.charAt(0).toUpperCase() + rawReason.slice(1);
  const isNowContext = email.context === 'now';

  const [tagMenuOpen, setTagMenuOpen] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (tagRef.current && !tagRef.current.contains(e.target as Node)) {
        setTagMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [tagMenuOpen]);

  return (
    <div className="flex flex-col h-full w-full">

      {/* ── Action header row (replaces the normal search header) ── */}
      <div className="bg-pm-bg flex items-center justify-between pl-3 pr-2.5 py-3 shrink-0">

        {/* Left: back + grouped email actions */}
        <div className="flex h-6 items-center">
          {/* Back + mark-unread */}
          <div
            className="flex gap-7 h-full items-center px-[18px] border-r border-pm-border"
          >
            <button
              onClick={onClose}
              className="hover:opacity-70 transition-opacity"
              aria-label="Back to inbox"
            >
              <Icon name="ic-arrow-left" size={16} color="white" />
            </button>
            {topBarGroups[0].map((a) => (
              <button key={a.icon} title={a.title} className="hover:opacity-70 transition-opacity">
                <Icon name={a.icon} size={16} color="white" />
              </button>
            ))}
          </div>

          {/* Trash + archive + move */}
          <div className="flex gap-7 h-full items-center px-[18px] border-r border-pm-border">
            {topBarGroups[1].map((a) => (
              <button key={a.icon + a.title} title={a.title} className="hover:opacity-70 transition-opacity">
                <Icon name={a.icon} size={16} color="white" />
              </button>
            ))}
          </div>

          {/* Folder + label */}
          <div className="flex gap-7 h-full items-center pl-[18px] pr-[24px] border-r border-pm-border">
            {topBarGroups[2].map((a) => (
              <button key={a.icon + a.title} title={a.title} className="hover:opacity-70 transition-opacity">
                <Icon name={a.icon} size={16} color="white" />
              </button>
            ))}
          </div>

          {/* Clock */}
          <div className="flex h-full items-center px-[18px] border-r border-pm-border">
            {topBarGroups[3].map((a) => (
              <button key={a.icon} title={a.title} className="hover:opacity-70 transition-opacity">
                <Icon name={a.icon} size={16} color="white" />
              </button>
            ))}
          </div>

          {/* Prev / next navigation */}
          <div className="flex gap-7 h-full items-center px-[18px]">
            <button title="Previous email" className="hover:opacity-70 transition-opacity">
              <Icon name="ic-arrow-up" size={16} color="white" />
            </button>
            <button title="Next email" className="hover:opacity-70 transition-opacity">
              <Icon name="ic-arrow-down" size={16} color="white" />
            </button>
          </div>
        </div>

        {/* Right: same sale banner + user info as the regular Header */}
        <div className="flex gap-3 items-center">
          <button className="bg-pm-sale flex gap-2 h-[35px] items-center justify-center px-[15px] py-2 rounded-lg">
            <Icon name="ic-percent" size={16} color="white" />
            <span className="text-white text-[14px] font-normal">SPRING SALE 2026</span>
          </button>
          <div className="flex items-center justify-center size-9 cursor-pointer">
            <Icon name="ic-cog-drawer" size={20} color="white" />
          </div>
          <div className="flex flex-col items-end text-[12px] w-[126px]">
            <span className="text-white font-normal">alexgrigor</span>
            <span className="text-pm-text-muted font-normal">alexgrigor@proton.me</span>
          </div>
          <div className="border border-pm-border flex items-center justify-center p-1 rounded-lg size-[27px]">
            <span className="text-white text-[12px] font-normal">A</span>
          </div>
        </div>
      </div>

      {/* ── Email body ── */}
      <div className="flex-1 overflow-y-auto bg-pm-bg border-t border-pm-border rounded-tr-lg">
        <div className="p-8">

          {/* Subject as title */}
          <h1 className="text-white font-bold text-[20px] mb-[26px]">{email.subject}</h1>

          {/* Email card */}
          <div>

            {/* Top card: from/to, tags, actions */}
            <div
              className="rounded-t-[8px] px-[17px] py-[18px]"
              style={{ border: '1px solid #343140' }}
            >
              <div className="flex flex-col gap-4">

                {/* From / To + date */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-5 items-start">
                    <div className="flex flex-col gap-2 text-[14px] font-semibold text-white shrink-0">
                      <span>From</span>
                      <span>To</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        <span
                          className="inline-block shrink-0"
                          style={{
                            width: 16,
                            height: 16,
                            backgroundColor: '#229ECE',
                            WebkitMaskImage: 'url(/icons/ic-lock-open-check-filled.svg)',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            WebkitMaskSize: 'contain',
                            maskImage: 'url(/icons/ic-lock-open-check-filled.svg)',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            maskSize: 'contain',
                          }}
                        />
                        <span className="text-white text-[14px] font-normal">{fromEmail}</span>
                      </div>
                      <span className="text-white text-[14px] font-normal">alexgrigor@proton.me</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-end shrink-0">
                    <div className="flex gap-1.5 items-center">
                      <Icon name="ic-star" size={16} color="white" />
                      <Icon name="ic-inbox" size={16} color="white" />
                      <Icon name="ic-paper-plane" size={16} color="white" />
                      <span className="text-white text-[12px] font-normal ml-1">{email.time}</span>
                    </div>
                    <Icon name="ic-chevron-down" size={16} color="white" className="cursor-pointer" />
                  </div>
                </div>

                {/* Context tag — compound pill with dropdown (Focus view only) */}
                {!email.fromRegularView && (
                <div className="flex items-center gap-2">
                  <div className="relative" ref={tagRef}>
                    {/* Pill button */}
                    <button
                      type="button"
                      onClick={() => setTagMenuOpen((o) => !o)}
                      className="flex gap-1.5 items-center px-2 py-1 rounded-[8px] hover:brightness-110 transition-all"
                      style={{ background: '#3b2a77' }}
                    >
                      <Icon name={tag.icon} size={12} color="white" />
                      <span className="text-white text-[10px] font-semibold">{tag.label}</span>
                      <span className="text-white/50 text-[10px] select-none mx-0.5">·</span>
                      <span className="text-white text-[10px] font-semibold">{reason}</span>
                      <Icon name="ic-chevron-down-filled" size={14} color="white" className="ml-0.5 opacity-60" />
                    </button>

                    {/* Dropdown */}
                    {tagMenuOpen && (
                      <div
                        className="absolute left-0 top-full mt-2 z-50 min-w-[280px] rounded-xl overflow-hidden shadow-2xl"
                        style={{ background: '#16141D', border: '1px solid #4C4659' }}
                      >
                        {/* Header info */}
                        <div className="px-4 pt-3 pb-2">
                          <p className="text-pm-text-muted text-[12px] font-medium">
                            Why this is in {tag.bundleTitle}
                          </p>
                          <p className="text-white text-[14px] font-normal mt-1">
                            {reason}
                            {' '}
                            <span className="text-pm-text-muted">
                              — {isNowContext ? fromEmail : domain}
                            </span>
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px mx-3 my-1" style={{ background: '#4C4659' }} />

                        {/* Actions */}
                        {isNowContext ? (
                          <>
                            <MenuItem label="Move sender to bundle…" onClick={() => setTagMenuOpen(false)} />
                            <MenuItem label="Don't prioritize this sender" onClick={() => setTagMenuOpen(false)} />
                          </>
                        ) : (
                          <>
                            <MenuItem label="Always show in Now" onClick={() => setTagMenuOpen(false)} />
                            <MenuItem label="Move to different bundle…" onClick={() => setTagMenuOpen(false)} />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                )}

                {/* Action toolbars */}
                <div className="flex items-center justify-between">

                  {/* Primary actions */}
                  <div
                    className="flex h-[38px] items-center p-1 rounded-[8px]"
                    style={{ border: '1px solid #5c5969' }}
                  >
                    <div className="flex h-[26px] items-center rounded-[8px]">
                      {primaryBodyActions.map((action, i) => (
                        <button
                          key={action.icon}
                          title={action.title}
                          className={`flex h-full items-center justify-center px-[10px] hover:bg-white/[0.06] transition-colors ${
                            i < primaryBodyActions.length - 1 ? 'border-r' : ''
                          }`}
                          style={{ borderColor: '#5c5969' }}
                        >
                          <Icon name={action.icon} size={16} color="white" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Secondary actions (reply / forward) */}
                  <div
                    className="flex h-[38px] items-center p-1 rounded-[8px]"
                    style={{ border: '1px solid #5c5969' }}
                  >
                    <div className="flex h-[26px] items-center rounded-[8px]">
                      {secondaryBodyActions.map((action, i) => (
                        <button
                          key={action.icon}
                          title={action.title}
                          className={`flex h-full items-center justify-center px-2 hover:bg-white/[0.06] transition-colors ${
                            i < secondaryBodyActions.length - 1 ? 'border-r' : ''
                          }`}
                          style={{ borderColor: '#5c5969' }}
                        >
                          <Icon name={action.icon} size={16} color="white" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom card: white email body */}
            <div
              className="bg-white rounded-b-[8px] px-4 pt-4 pb-7"
              style={{ border: '1px solid #343140', borderTop: 'none' }}
            >
              <p className="text-black text-[14px] leading-relaxed font-normal">
                {LOREM_IPSUM}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { TOOLBAR_LEFT_SEGMENT_CLASS, TOOLBAR_OUTER_CLASS, TOOLBAR_INNER_ROW_CLASS } from '../constants/toolbarLayout';
import { FOCUS_TOOLBAR_CHECKBOX_IMG } from '../constants/focusToolbarAssets';

type FilterTab = 'All' | 'Read' | 'Unread' | 'Has attachments';
type InboxView = 'Regular' | 'Focus';

type OverflowMenuVariant = 'inbox' | 'bundle';

const TIME_RANGE_OPTIONS = ['Last 24 hours', 'Last 3 days', 'Last 7 days'] as const;
type TimeRangeOption = (typeof TIME_RANGE_OPTIONS)[number];

const inboxOverflowItems = [
  { icon: 'ic-trash',       label: 'Move all to trash',   dividerBefore: false },
  { icon: 'ic-archive-box', label: 'Move all to archive', dividerBefore: false },
  { icon: 'ic-bolt',        label: 'Focus settings',      dividerBefore: true  },
] as const;

interface InboxToolbarProps {
  activeView: InboxView;
  activeFilter: FilterTab;
  onViewChange: (view: InboxView) => void;
  onFilterChange: (filter: FilterTab) => void;
  /** Hide Regular / Focus when scoped to a bundle (toolbar still shows Inbox + filters) */
  hideViewToggle?: boolean;
  /** Inbox vs bundle ⋯ menu content */
  overflowMenuVariant?: OverflowMenuVariant;
  /** Messages currently visible in the list (bundle menu counts) */
  bundleVisibleCount?: number;
}

export function InboxToolbar({
  activeView,
  activeFilter,
  onViewChange,
  onFilterChange,
  hideViewToggle = false,
  overflowMenuVariant = 'inbox',
  bundleVisibleCount = 0,
}: InboxToolbarProps) {
  const filterTabs: FilterTab[] = ['All', 'Read', 'Unread', 'Has attachments'];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [timeRange, setTimeRange] = useState<TimeRangeOption>('Last 24 hours');
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const timeMenuRef = useRef<HTMLDivElement>(null);
  const isBundleOverflow = overflowMenuVariant === 'bundle';
  const n = bundleVisibleCount;

  // Close overflow menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close time range menu on outside click
  useEffect(() => {
    if (!timeMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (timeMenuRef.current && !timeMenuRef.current.contains(e.target as Node)) {
        setTimeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [timeMenuOpen]);

  return (
    <div className={TOOLBAR_OUTER_CLASS}>
      {/* Top row */}
      <div className={TOOLBAR_INNER_ROW_CLASS}>
        <div className={TOOLBAR_LEFT_SEGMENT_CLASS}>
          {/* Checkbox */}
          <div className="h-5 relative w-[34px] shrink-0">
            <img src={FOCUS_TOOLBAR_CHECKBOX_IMG} alt="" className="absolute block max-w-none size-full" />
          </div>

          {/* Title */}
          <span className="text-white text-[16px] font-bold">Inbox</span>

          {/* View tabs — hidden in bundle detail (still Focus context) */}
          {!hideViewToggle && (
            <div className="flex gap-1 items-center">
              {(['Regular', 'Focus'] as InboxView[]).map((view) => (
                <button
                  key={view}
                  onClick={() => onViewChange(view)}
                  className={`flex items-center justify-center px-2 py-1.5 rounded-md text-[14px] text-white transition-colors ${
                    activeView === view
                      ? view === 'Focus'
                        ? 'bg-pm-purple-muted'
                        : 'bg-pm-pill'
                      : 'hover:bg-pm-bg-hover'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          )}

          {/* More options + dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className={`flex items-center justify-center size-7 rounded-md transition-colors ${
                menuOpen ? 'bg-pm-bg-hover' : 'hover:bg-pm-bg-hover'
              }`}
            >
              <Icon name="ic-three-dots-horizontal" size={16} color="white" />
            </button>

            {menuOpen && (
              <div
                className="absolute left-0 top-full mt-2 z-50 min-w-[240px] rounded-xl overflow-hidden shadow-2xl"
                style={{ background: '#16141D', border: '1px solid #4C4659' }}
              >
                {isBundleOverflow ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-white text-[14px] font-normal hover:bg-white/[0.06] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon name="ic-envelope-open" size={16} color="white" />
                      Mark all as read ({n})
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-white text-[14px] font-normal hover:bg-white/[0.06] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon name="ic-archive-box" size={16} color="white" />
                      Archive all ({n})
                    </button>
                    <div className="h-px mx-3 my-1 shrink-0" style={{ background: '#4C4659' }} aria-hidden />
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-white text-[14px] font-normal hover:bg-white/[0.06] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon name="ic-sliders" size={16} color="white" />
                      Manage bundle
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-white text-[14px] font-normal hover:bg-white/[0.06] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon name="ic-bolt" size={16} color="white" />
                      Focus settings
                    </button>
                  </>
                ) : (
                  inboxOverflowItems.map(({ icon, label, dividerBefore }) => (
                    <div key={label}>
                      {dividerBefore && (
                        <div className="h-px mx-3 my-1 shrink-0" style={{ background: '#4C4659' }} aria-hidden />
                      )}
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-white text-[14px] font-normal hover:bg-white/[0.06] transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Icon name={icon} size={16} color="white" />
                        {label}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Time filter — Focus only */}
        {activeView === 'Focus' && (
          <div className="relative shrink-0" ref={timeMenuRef}>
            <button
              type="button"
              onClick={() => setTimeMenuOpen((o) => !o)}
              className={`flex gap-2 items-center rounded-md px-1 py-0.5 -mx-1 transition-colors ${
                timeMenuOpen ? 'bg-pm-bg-hover' : 'hover:bg-pm-bg-hover/60'
              }`}
              aria-expanded={timeMenuOpen}
              aria-haspopup="listbox"
            >
              <span className="text-pm-text-muted text-[14px] font-normal whitespace-nowrap">{timeRange}</span>
              <Icon name="ic-chevron-down-filled" size={16} color="muted" />
            </button>

            {timeMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-xl overflow-hidden shadow-2xl py-1"
                role="listbox"
                style={{ background: '#16141D', border: '1px solid #4C4659' }}
              >
                {TIME_RANGE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={timeRange === option}
                    onClick={() => {
                      setTimeRange(option);
                      setTimeMenuOpen(false);
                    }}
                    className={`flex w-full items-center px-4 py-3 text-left text-white text-[14px] font-normal transition-colors ${
                      timeRange === option ? 'bg-white/[0.08]' : 'hover:bg-white/[0.06]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Filter tabs + sort + pagination */}
        <div className="flex gap-5 items-center rounded-lg">
          <div className="flex gap-1 items-center">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onFilterChange(tab)}
                className={`flex items-center justify-center px-2 py-1.5 rounded-md text-[14px] text-white transition-colors ${
                  activeFilter === tab ? 'bg-pm-pill' : 'bg-pm-bg hover:bg-pm-bg-hover'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Icon name="ic-list-arrow-down" size={16} color="white" className="cursor-pointer" />

          <div className="flex gap-4 items-center">
            <Icon name="ic-chevron-left" size={16} color="muted" className="cursor-pointer" />
            <span className="text-pm-text-dim text-[14px]">1/1</span>
            <Icon name="ic-chevron-right" size={16} color="muted" className="cursor-pointer" />
          </div>
        </div>
      </div>

    </div>
  );
}

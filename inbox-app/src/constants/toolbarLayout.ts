/**
 * Shared layout for the Focus inbox toolbar row and the bundle scoped header row.
 */
/** Wide enough for checkbox + back + bundle title + ⋯ to keep "Last 24 hours" aligned with Focus */
export const TOOLBAR_LEFT_SEGMENT_MIN = 'min-w-[22rem]';

/**
 * Min height for the left cluster so it matches Focus (checkbox + Inbox + Regular/Focus pills).
 * Without this, bundle (back + title + ⋯) is ~4–5px shorter because it has no tab buttons.
 */
export const TOOLBAR_LEFT_SEGMENT_CLASS = `flex gap-5 items-center py-2 min-h-[50px] ${TOOLBAR_LEFT_SEGMENT_MIN}`;

/** Outer shell — no right border or rounding here; the parent container handles those */
export const TOOLBAR_OUTER_CLASS =
  'bg-pm-bg border-b border-pm-border flex flex-col shrink-0 w-full';

/** Single toolbar row */
export const TOOLBAR_INNER_ROW_CLASS =
  'bg-pm-bg border-t border-pm-border flex items-center justify-between px-4 py-2 w-full';

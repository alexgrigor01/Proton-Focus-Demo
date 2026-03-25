import { Icon } from './Icon';

const imgProtonLogo = 'https://www.figma.com/api/mcp/asset/f6307ac2-bb25-4827-909c-dddfc1adf078';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  count?: number;
  showCount?: boolean;
  showRefresh?: boolean;
}

function NavItem({ icon, label, active = false, count, showCount = false, showRefresh = true }: NavItemProps) {
  return (
    <div
      className={`flex items-center pl-3 pr-2 rounded-lg w-full cursor-pointer transition-colors ${
        active ? 'bg-pm-bg-hover' : 'hover:bg-pm-bg-hover/50'
      }`}
    >
      <div className="flex h-[34px] items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <Icon name={icon} size={16} color={active ? 'white' : 'muted'} />
          <span
            className={`text-[14px] whitespace-nowrap text-white ${active ? 'font-bold' : 'font-normal'}`}
          >
            {label}
          </span>
        </div>
        {showCount && count !== undefined && (
          <div className="flex gap-2 items-center">
            {showRefresh && (
              <Icon name="ic-arrow-rotate-right" size={16} color={active ? 'white' : 'muted'} />
            )}
            <div
              className={`flex items-center justify-center p-1 rounded ${
                active ? 'bg-pm-purple-light' : ''
              } min-w-[23px]`}
            >
              <span
                className={`text-[11px] font-medium text-center ${
                  active ? 'text-white' : 'text-pm-text-muted'
                }`}
              >
                {count}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  showActions?: boolean;
}

function SectionHeader({ label, collapsible = false, collapsed = false, showActions = false }: SectionHeaderProps) {
  return (
    <div className="flex items-center pl-3 pr-2 rounded-lg w-full cursor-pointer hover:bg-pm-bg-hover/50">
      <div className="flex h-[34px] items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          {collapsible ? (
            <div style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
              <Icon name="ic-chevron-down-filled" size={16} color="muted" />
            </div>
          ) : (
            <Icon name="ic-chevron-down-filled" size={16} color="muted" className="-rotate-90" />
          )}
          <span className="text-[14px] text-pm-text-muted font-normal whitespace-nowrap">{label}</span>
        </div>
        {showActions && (
          <div className="flex gap-3 items-center">
            <Icon name="ic-plus" size={16} color="muted" />
            <Icon name="ic-cog-wheel" size={16} color="muted" />
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="bg-pm-bg border-r border-pm-border flex flex-col h-full justify-between px-3 py-4 shrink-0 w-[249px]">
      <div className="flex flex-col gap-4">
        {/* Logo + grid icon */}
        <div className="flex items-center justify-between w-full px-1">
          <img
            src={imgProtonLogo}
            alt="Proton Mail"
            style={{ width: 134, height: 36, objectFit: 'contain', objectPosition: 'left', flexShrink: 0 }}
          />
          <Icon name="ic-grid-2" size={18} color="muted" />
        </div>

        {/* New message button */}
        <button
          className="flex items-center justify-center py-3 rounded-[6px] w-full transition-colors hover:opacity-90"
          style={{ backgroundColor: '#7349FF' }}
        >
          <span className="text-white text-[16px] font-normal">New message</span>
        </button>

        {/* Primary nav */}
        <div className="flex flex-col gap-1">
          <NavItem icon="ic-inbox" label="Inbox" active count={15} showCount />
          <NavItem icon="ic-file-lines" label="Drafts" />
          <NavItem icon="ic-paper-plane" label="Sent" />
          <NavItem icon="ic-star" label="Starred" />
        </div>

        {/* Views section */}
        <div className="flex flex-col gap-1">
          <SectionHeader label="Views" />
          <NavItem icon="ic-archive-box" label="Archive" />
          <NavItem icon="ic-fire" label="Spam" />
          <NavItem icon="ic-trash" label="Trash" />
          <NavItem icon="ic-envelopes" label="All mail" count={15} showCount showRefresh={false} />
        </div>

        {/* Views (second) */}
        <div className="flex flex-col gap-1">
          <SectionHeader label="Views" />
          <NavItem icon="ic-envelope-check" label="Newsletters" />
        </div>

        {/* Folders + Labels */}
        <div className="flex flex-col gap-6 pb-4">
          <SectionHeader label="Folders" collapsible collapsed showActions />
          <SectionHeader label="Labels" collapsible collapsed showActions />
        </div>
      </div>

      {/* Bottom: collapse + storage */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-end">
          <Icon name="ic-chevrons-left" size={16} color="muted" className="cursor-pointer" />
        </div>
        <div className="relative h-1 rounded w-full">
          <div className="absolute inset-0 bg-pm-border rounded" />
          <div className="absolute inset-y-0 left-0 bg-pm-text-muted rounded" style={{ width: '18%' }} />
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-pm-text-muted">
            <strong>3.46 MB</strong> / 500.00 MB
          </span>
          <span className="text-pm-text-muted">5.0.106.5</span>
        </div>
      </div>
    </div>
  );
}

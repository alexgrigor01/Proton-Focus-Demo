import { Icon } from './Icon';

function AppIcon({ children, badge }: { children: React.ReactNode; badge?: string | number }) {
  return (
    <div className="relative shrink-0 size-9 cursor-pointer">
      {children}
      {badge !== undefined && (
        <div className="absolute -top-1 -right-1 bg-pm-purple text-white text-[9px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
          {badge}
        </div>
      )}
    </div>
  );
}

export function AppSwitcher() {
  return (
    <div className="bg-pm-bg flex flex-col h-full items-center justify-between py-3 shrink-0 w-[46px]">
      <div className="flex flex-col gap-5 items-center w-full">
        {/* Mail (active) */}
        <AppIcon>
          <div className="overflow-clip relative size-9">
            <div className="absolute inset-0">
              <img
                src="/problematic-icons/app-switcher-top.svg"
                alt=""
                className="absolute block max-w-none size-full object-contain"
              />
            </div>
          </div>
        </AppIcon>

        {/* Calendar — same visual scale as mail/drive icons */}
        <AppIcon>
          <div className="overflow-clip relative size-9">
            <div className="absolute inset-[20%]">
              <img src="/calendar-icon.svg" alt="Calendar" className="absolute block max-w-none size-full object-contain" />
            </div>
          </div>
        </AppIcon>

        {/* Drive */}
        <div className="relative shrink-0 size-9 cursor-pointer">
          <div className="overflow-clip relative size-9">
            <div className="absolute inset-0">
              <img
                src="/problematic-icons/app-switcher-pre-last.svg"
                alt=""
                className="absolute block max-w-none size-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* VPN */}
        <AppIcon>
          <div className="overflow-clip relative size-9">
            <div className="absolute inset-0">
              <img
                src="/problematic-icons/app-switcher-last.svg"
                alt=""
                className="absolute block max-w-none size-full object-contain"
              />
            </div>
          </div>
        </AppIcon>
      </div>

      {/* Expand button */}
      <div className="flex items-center justify-center rotate-180 cursor-pointer">
        <div className="size-[46px] flex items-center justify-center">
          <Icon name="ic-chevrons-left" size={16} color="muted" />
        </div>
      </div>
    </div>
  );
}

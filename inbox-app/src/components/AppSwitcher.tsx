const imgGroup3 = 'https://www.figma.com/api/mcp/asset/ff547dcb-8256-4050-93da-15027f7080fb';
const imgGroup = 'https://www.figma.com/api/mcp/asset/cede5a92-5a31-4a11-955a-ea30fa797079';
const imgGroup2 = 'https://www.figma.com/api/mcp/asset/8d6568cc-64f5-441b-b1b8-2fa11f7805b7';
const imgIcChevronsLeft3 = 'https://www.figma.com/api/mcp/asset/2cb14cd6-c407-40b1-8344-1a8edbf2566f';

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
            <div className="absolute inset-y-1/4 left-[22%] right-[22%]">
              <img src={imgGroup3} alt="Mail" className="absolute block max-w-none size-full" />
            </div>
          </div>
        </AppIcon>

        {/* Calendar */}
        <AppIcon badge="21">
          <div className="overflow-clip relative size-9 flex items-center justify-center">
            <img src="/calendar-icon.svg" alt="Calendar" className="block size-9 max-w-none object-contain" />
          </div>
        </AppIcon>

        {/* Drive */}
        <div className="relative shrink-0 size-9 cursor-pointer">
          <div className="absolute" style={{ inset: '22.22% 21.21% 22.22% 23.23%' }}>
            <img src={imgGroup} alt="Drive" className="absolute block max-w-none size-full" />
          </div>
        </div>

        {/* VPN */}
        <AppIcon>
          <div className="overflow-clip relative size-9">
            <div className="absolute" style={{ bottom: '25%', left: '23%', right: '22%', top: '25%' }}>
              <img src={imgGroup2} alt="VPN" className="absolute block max-w-none size-full" />
            </div>
          </div>
        </AppIcon>
      </div>

      {/* Expand button */}
      <div className="flex items-center justify-center rotate-180 cursor-pointer">
        <div className="relative size-[46px]">
          <img src={imgIcChevronsLeft3} alt="Expand" className="absolute block max-w-none size-full" />
        </div>
      </div>
    </div>
  );
}

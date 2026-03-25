import { Icon } from './Icon';

export function Header() {
  return (
    <div className="bg-pm-bg flex items-center justify-between pl-3 pr-2.5 py-3 w-full shrink-0">
      {/* Search */}
      <div className="bg-pm-input flex items-center pl-2 pr-3 py-[7px] rounded-lg">
        <div className="flex gap-2 h-[21px] items-center w-[448px]">
          <Icon name="ic-magnifier" size={16} color="muted" />
          <span className="text-pm-text-muted text-[14px] font-normal">Search messages</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex gap-3 items-center">
        {/* Sale badge */}
        <button className="bg-pm-sale flex gap-2 h-[35px] items-center justify-center px-[15px] py-2 rounded-lg">
          <Icon name="ic-percent" size={16} color="white" />
          <span className="text-white text-[14px] font-normal">SPRING SALE 2026</span>
        </button>

        {/* Settings */}
        <div className="flex items-center justify-center size-9 cursor-pointer">
          <Icon name="ic-cog-drawer" size={20} color="white" />
        </div>

        {/* User info */}
        <div className="flex flex-col items-end text-[12px] w-[126px]">
          <span className="text-white font-normal">alexgrigor</span>
          <span className="text-pm-text-muted font-normal">alexgrigor@proton.me</span>
        </div>

        {/* Avatar */}
        <div className="border border-pm-border flex items-center justify-center p-1 rounded-lg size-[27px]">
          <span className="text-white text-[12px] font-normal">A</span>
        </div>
      </div>
    </div>
  );
}

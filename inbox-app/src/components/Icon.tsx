export type IconColor = 'white' | 'muted' | 'dim';

/** Exact Proton UI grey for icons and secondary chrome */
export const ICON_GREY = '#A7A4B5';

const backgroundForColor: Record<IconColor, string> = {
  white: '#FFFFFF',
  muted: ICON_GREY,
  dim: ICON_GREY,
};

interface IconProps {
  name: string;
  size?: number;
  color?: IconColor;
  className?: string;
  alt?: string;
}

/**
 * Renders proton-icons SVGs as a masked layer so greys match #A7A4B5 exactly
 * (img + filter was visibly off from the design token).
 */
export function Icon({ name, size = 16, color = 'white', className = '', alt = '' }: IconProps) {
  const src = `/icons/${name}.svg`;
  const bg = backgroundForColor[color];

  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      role={alt ? 'img' : 'presentation'}
      aria-label={alt || undefined}
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
      }}
    />
  );
}

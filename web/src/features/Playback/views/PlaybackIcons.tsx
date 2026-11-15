const ICON_SIZE = 16;

export const PlayIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
  </svg>
);

export const PauseIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 16 16" aria-hidden="true">
    <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
    <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
  </svg>
);

const INFO_ICON_SIZE_PX = 18;

export const InfoIcon = () => {
  return (
    <svg
      viewBox="0 0 20 20"
      width={INFO_ICON_SIZE_PX}
      height={INFO_ICON_SIZE_PX}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5" />
      <circle cx="10" cy="6.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
};

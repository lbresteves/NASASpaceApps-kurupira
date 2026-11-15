export interface IFileIconProps {
  extension: string;
  size?: number;
}

export const FileIcon = ({ extension, size = 24 }: IFileIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M12 7.5v5m0 0-2-2m2 2 2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="12" y="19" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="currentColor">
        {extension}
      </text>
    </svg>
  );
};

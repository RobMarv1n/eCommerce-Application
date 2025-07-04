export function CartIcon({ width = '28', height = '28', color = '#1A1A1A' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33333 11.1667H4.08333L1.25 26.75H26.75L23.9167 11.1667H19.6667M8.33333 11.1667V6.91667C8.33333 3.78705 10.8704 1.25 14 1.25V1.25C17.1296 1.25 19.6667 3.78705 19.6667 6.91667V11.1667M8.33333 11.1667H19.6667M8.33333 11.1667V15.4167M19.6667 11.1667V15.4167"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayButtonIcon({ className = "w-6 h-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="30"
      fill="none"
      viewBox="0 0 25 30"
      className={className}
    >
      <path
        fill="#2466f2"
        d="M0 1.667v26.667a1.667 1.667 0 0 0 2.54 1.42L24.207 16.42a1.668 1.668 0 0 0 0-2.84L2.54.247A1.667 1.667 0 0 0 0 1.667"
      />
    </svg>
  );
}

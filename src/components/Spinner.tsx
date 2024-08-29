export function Spinner() {
  return (
    <div className="relative">
      <div className="grid place-items-center w-full h-full">
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="4rem"
          height="4rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 4a8 8 0 017.89 6.7 1.53 1.53 0 001.49 1.3 1.5 1.5 0 001.48-1.75 11 11 0 00-21.72 0A1.5 1.5 0 002.62 12a1.53 1.53 0 001.49-1.3A8 8 0 0112 4z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

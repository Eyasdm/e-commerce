import Link from "next/link";

function Linkedin() {
  return (
    <Link
      href="https://www.linkedin.com/in/eyas-adam/"
      target="_blank"
      rel="noreferrer"
      className="hover:text-white transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM3.25 9h3.5V20.5h-3.5V9Zm7.25 0h3.35v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.22 2.34 4.22 5.39v6.41h-3.5v-5.68c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.19 1.49-2.19 3.01v5.78h-3.5V9Z" />
      </svg>
    </Link>
  );
}

export default Linkedin;

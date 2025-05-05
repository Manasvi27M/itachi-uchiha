import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="px-3 py-2 text-neutral-700 dark:text-neutral-200 font-medium hover:text-black dark:hover:text-white transition"
    >
      {children}
    </a>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:space-x-6">
            <NavLink href="/auth">Sign In</NavLink>
            <NavLink href="/aboutus">About Us</NavLink>
            <NavLink href="#">Random Item</NavLink>
            <NavLink href="#">Experts</NavLink>
          </div>

          {/* Right‑side actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <button
              aria-label="Notifications"
              className="p-1 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 17H20L18.6 15.6C18.2 15.2 18 14.7 18 14.2V11C18 8.4 16.3 6.2 14 5.3V5C14 3.9 13.1 3 12 3S10 3.9 10 5v.3C7.7 6.2 6 8.4 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h11z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => {}}
              aria-label="Profile menu"
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                alt="avatar"
                className="h-8 w-8 rounded-full border-2 border-gray-300"
              />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 8h16M4 16h16"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-3 space-y-1">
              <NavLink href="/auth">Sign In</NavLink>
              <NavLink href="/aboutus">About Us</NavLink>
              <NavLink href="#">Random Item</NavLink>
              <NavLink href="#">Experts</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

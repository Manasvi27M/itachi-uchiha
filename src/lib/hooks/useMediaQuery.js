import { useState, useEffect } from 'react';

/**
 * A hook that returns true if the window matches the given media query
 * @param {string} query - The media query to match against (e.g. '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
const useMediaQuery = (query) => {
  // Initialize with the current match state
  const [matches, setMatches] = useState(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Update the state initially
    setMatches(mediaQuery.matches);

    // Create event listener that updates the state
    const handler = (event) => setMatches(event.matches);

    // Add the event listener
    mediaQuery.addEventListener('change', handler);

    // Clean up
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]); // Re-run effect if query changes

  return matches;
};

export default useMediaQuery; 
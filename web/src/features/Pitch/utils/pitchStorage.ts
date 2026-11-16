const SEEN_KEY = 'kurupira.hasSeenPitch';

/** Storage can be blocked (private mode, disabled site data); then the pitch just shows again next time. */
export const hasSeenPitch = () => {
  try {
    return window.localStorage.getItem(SEEN_KEY) === 'true';
  } catch {
    return false;
  }
};

export const markPitchSeen = () => {
  try {
    window.localStorage.setItem(SEEN_KEY, 'true');
  } catch {
    // Nothing to do: without storage the pitch opens again on the next visit.
  }
};

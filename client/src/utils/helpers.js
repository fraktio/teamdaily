export const alphabeticalSort = (a, b) => a.toLowerCase() !== b.toLowerCase() ? a.toLowerCase() < b.toLowerCase() ? -1 : 1 : 0;
export const getLatestEntry = entry => entry.size > 0 ? entry.get(-1) : null;
export const getEntryColor = entry => entry ? entry.color : "empty";
export const doesFlaggedExist = entry => entry ? entry.flagged : null;
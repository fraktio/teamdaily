export const alphabeticalSort = (a, b) => a.toLowerCase() !== b.toLowerCase() ? a.toLowerCase() < b.toLowerCase() ? -1 : 1 : 0;
export const getLastEntry = entry => entry.size > 0 ? entry.get(-1) : null;

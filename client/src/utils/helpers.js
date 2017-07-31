import moment from 'moment';

export const alphabeticalSort = (a, b) =>
  a.toLowerCase() !== b.toLowerCase() ? (a.toLowerCase() < b.toLowerCase() ? -1 : 1) : 0;
export const getLatestEntry = entry => (entry.size > 0 ? entry.get(-1) : null);
export const getEntryColor = entry => (entry ? entry.color : 'empty');
export const doesFlaggedExist = entry => (entry ? entry.flagged : null);

export const calculateWeekNumbers = amount => {
  let weekNumbers = Array(amount + 1).fill({});

  return weekNumbers
    .map((_, i) => {
      const date = moment().subtract(i, 'weeks');

      return {
        year: date.year(),
        week: date.week(),
      };
    })
    .reverse();
};

export default function extractUserData(weeklyData) {
  return weeklyData.reduce((acc, row) => {
    const normalizedName = row.name;

    if (acc[normalizedName] === undefined) {
      acc[normalizedName] = {
        weeks: {}
      };
    }

    const { year, week } = row;
    const weekAndYear = `${week}_${year}`;

    let weeklyData = acc[normalizedName]['weeks'][weekAndYear];

    if (weeklyData) {
      acc[normalizedName]['weeks'][weekAndYear].push(row);
    } else {
      acc[normalizedName]['weeks'][weekAndYear] = [row];
    }

    return acc;
  }, {});
}

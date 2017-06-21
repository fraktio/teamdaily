import React from 'react';
import userDataExtractor from 'services/userDataExtractor';
import WeeklyGraph from './WeeklyGraph';

export default ({ data, weeklyData }) => (
  <section>
    <WeeklyGraph
      userData={userDataExtractor(weeklyData)}
      week={data.week}
      year={data.year}
    />
  </section>
);

import React from 'react';
import StatusCounts from './StatusCounts';

export default ({ entries }) =>
  <section>
    <StatusCounts messages={entries} />
  </section>;

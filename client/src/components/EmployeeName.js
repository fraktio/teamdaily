import React from 'react';
import { name as formatName } from 'services/employee.js';

export default ({ name, className }) =>
  <span className={className}>
    {formatName(name)}
  </span>;

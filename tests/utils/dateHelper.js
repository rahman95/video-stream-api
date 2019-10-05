const dayjs = require('dayjs');

const isTodaysDate = date => {
  const today = dayjs();

  return today.diff(date, 'day') === 0;
};

module.exports = { isTodaysDate };

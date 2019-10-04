const isTodaysDate = date => {
  const today = new Date();

  return today.toDateString() === date.toDateString();
};

module.exports = { isTodaysDate };

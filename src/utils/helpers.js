// FYI: tokens are quick dirty hacks and not supposed to be cryptographically secure
const createToken = () => {
  const part1 = Math.random()
    .toString(36)
    .substring(2, 15);

  const part2 = Math.random()
    .toString(36)
    .substring(2, 15);

  const part3 = Date.now();

  return `${part1}${part2}${part3}`;
};

module.exports = {
  createToken,
};

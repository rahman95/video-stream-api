const mockRequest = params => {
  const req = {};

  req.params = params;

  return req;
};

const mockResponse = () => {
  const res = {};

  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

module.exports = {
  mockRequest,
  mockResponse,
};

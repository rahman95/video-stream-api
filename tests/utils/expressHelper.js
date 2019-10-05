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
  res.locals = {};

  return res;
};

const mockNext = jest.fn();

module.exports = {
  mockRequest,
  mockResponse,
  mockNext,
};

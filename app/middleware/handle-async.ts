const handleAsync = (middleware: (arg0: any, arg1: any, arg2: any) => any): any => (
  req: any,
  res: any,
  next: (reason: any) => any,
): any => {
  const result = middleware(req, res, next);
  return Promise.resolve(result).catch(next);
};

export default handleAsync;

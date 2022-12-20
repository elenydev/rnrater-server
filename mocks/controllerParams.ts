import { Request, Response, NextFunction } from "express";

export const mockRequest = () => {
  const req = {} as Request;
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req) as any;
  req.query = jest.fn().mockReturnValue(req) as any;
  return req;
};

export const mockResponse = () => {
  const res = {} as Response;
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.pipe = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => void null as unknown as NextFunction;

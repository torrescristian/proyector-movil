import { LoginService } from '../services/login.service';
import { Request, Response, NextFunction } from 'express';

const loginService = new LoginService();

export function verify(req: Request, res: Response, next: NextFunction) {
  const { authorization = '' } = req.headers;
  const bearerToken = authorization.replace('Bearer ', '');
  const queryToken = req.query.token;
  if (
    (bearerToken || queryToken)
    && !loginService.tokenIsValid(bearerToken || queryToken)
  ) {
    return res.status(403).json('Auth required');
  }
  next();
};

import { Response, NextFunction} from 'express'
import Users from '../models/userModel'
import jwt from 'jsonwebtoken'
import { IDecodedToken, IReqAuth } from '../config/interface'
import winston from 'winston'
import { log } from 'console'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'auth-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")
    
    if(!token) {
      logger.error('Invalid Authentication.');
      return res.status(400).json({msg: "Invalid Authentication."})
    }

    const decoded = <IDecodedToken>jwt.verify(token, `datletrong`)

    if(!decoded) {
      logger.error('Invalid Authentication.');
      return res.status(400).json({msg: "Invalid Authentication."})
    }

    const user = await Users.findOne({_id: decoded.id}).select("-password")
    if(!user) {
      logger.error('User does not exist.');
      return res.status(400).json({msg: "User does not exist."})
    }

    req.user = user;

    next()
  } catch (err: any) {
    logger.error(req.header("Authorization"));
    logger.error("gen token", `${process.env.ACCESS_TOKEN_SECRET}`);
    logger.error(err.message);
    return res.status(500).json({msg: err.message})
  }
}

export default auth;
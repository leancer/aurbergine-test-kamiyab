import {Request} from 'express';
import { TUser } from '../api/user/types';

export interface IRequest extends Request
{
    user?: TUser;
}
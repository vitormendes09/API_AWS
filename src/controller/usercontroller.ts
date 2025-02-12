import { Request, Response } from 'express';
import {User} from '../models/user.js'

export class UserController {

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ error: 'Erro Interno Controller' })
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not fonud' });
            }

            return res.json(user)
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email} = req.body;
            const newUser = await User.create({name,email});
            return res.status(201).json(newUser)
        }catch(error){
            return res.status(500).json({error: 'Faild to create '})
        }
    }

    async delete(req: Request, res: Response): Promise <Response>{
        try{
            const{id} = req.params;
            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json({error: 'User not found'})
            }
            await user.destroy();
            return res.status(204).send();
            } catch (error) {
                return res.status(500).json({error: 'failed to delete user'});
            }
    }
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/user.js';
export class UserController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.findAll();
                return res.json(users);
            }
            catch (error) {
                return res.status(500).json({ error: 'Erro Interno Controller' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByPk(req.params.id);
                if (!user) {
                    return res.status(404).json({ error: 'User not fonud' });
                }
                return res.json(user);
            }
            catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                const newUser = yield User.create({ name, email });
                return res.status(201).json(newUser);
            }
            catch (error) {
                return res.status(500).json({ error: 'Faild to create ' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User.findByPk(id);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                yield user.destroy();
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ error: 'failed to delete user' });
            }
        });
    }
}

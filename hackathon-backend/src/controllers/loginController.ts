import { Request, Response } from 'express';
import LoginService from "../services/loginService";

class LoginController {
    async login(req: Request, res: Response): Promise<Response> {
        const { login, senha } = req.body;

        // Verificação de campos obrigatórios
        if (!login || !senha) {
            return res.status(400).json({ error: 'Login e senha são obrigatórios' });
        }

        try {
            const token = await LoginService.login({ login, senha });
            return res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro contate o Supervisor!' });
        }
    }
}

export default new LoginController();
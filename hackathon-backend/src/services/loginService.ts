import pool from '../database/dbConfig';

class LoginService {
    async login(data: any) {
        const { login, senha } = data;
        const result = await pool.query('SELECT * FROM avaliadores WHERE login = $1 AND senha = $2', [login, senha]);
        if (result.rows.length === 0) {
            throw new Error('Login ou senha inválidos');
        }
        return result.rows[0];
    }
}

export default new LoginService();
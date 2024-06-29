import pool from "../database/dbConfig";

interface LoginUser {
    login: string;
    senha: string;
}

class LoginModel {
    async login(loginUser: LoginUser): Promise<LoginUser> {
        const { login, senha } = loginUser ;

        const { rows } = await pool.query(
            "SELECT * FROM avaliadores WHERE login = $1 AND senha = $2",
            [login, senha]
        );
        return rows[0];
    }
}

export { LoginUser, LoginModel };


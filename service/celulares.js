import  pool  from '../data/index.js';

export const consultar = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM celulares WHERE celulares.nome LIKE ?`;
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM celulares WHERE celulares.id = ?';
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};
export const cadastrar = async (nome, marca) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'INSERT INTO celulares(nome, marca) VALUES (?, ?)';
        await cx.query(cmdSql, [nome, marca]);

        // Recuperar o último ID inserido
        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        // Consultar a empresa recém-cadastrada pelo último ID
        const [dados, meta_dados] = await cx.query('SELECT * FROM celuares WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

/*
Cadastrar usuario
*/

export const cadastrarUser = async (nome, gmail, senha) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'INSERT INTO user(nome, gmail, senha) VALUES (?, ?, ?)';
        await cx.query(cmdSql, [nome, gmail, senha]);

        // Recuperar o último ID inserido
        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        // Consultar a empresa recém-cadastrada pelo último ID
        const [dados, meta_dados] = await cx.query('SELECT * FROM user WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};
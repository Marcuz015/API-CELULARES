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

export const consultarUser = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM user WHERE user.nome LIKE ?`;
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const cadastrarUser = async (nome, senha, gmail) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'INSERT INTO user(nome, senha, gmail) VALUES (?, ?, ?)';
        await cx.query(cmdSql, [nome, senha, gmail]);

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

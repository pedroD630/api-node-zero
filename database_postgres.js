import {
    randomUUID
} from 'node:crypto';

import {
    sql
} from './db.js';

export class DatabasePostgres {

    async create(dado) {
        const dadoId = randomUUID();
        const {
            nome,
            idade,
            saldo
        } = dado;

        await sql ` INSERT INTO usuarios (id, nome, idade, saldo) VALUES (${dadoId}, ${nome}, ${idade}, ${saldo})`;
    }

    async list(search = '') {

        if (search) {
            const result = await sql `SELECT * FROM usuarios WHERE nome ILIKE ${'%' + search + '%'};`;
            return result;
        } else {
            const result = await sql `SELECT * FROM usuarios;`;
            return result;
        }
       
    }

    async delete(id) {
        await sql `DELETE FROM usuarios WHERE id = ${id}`
    }

    async update(id, dado) {

        const {nome, idade, saldo} = dado;

        await sql `UPDATE usuarios SET nome = ${nome}, idade = ${idade}, saldo = ${saldo} WHERE id = ${id}`
    }
}
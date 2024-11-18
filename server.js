//import { createServer } from 'node:http'
import {} from 'node:fs'
import { DatabaseMemory } from './database_memory.js';
import {DatabasePostgres} from './database_postgres.js'

/*const server = createServer(() => {
    console.log("Hello, World!");
});

server.listen(3333);*/

import { fastify } from 'fastify';

const server = fastify();
const database = new DatabasePostgres();

server.get('/teste', (request) => {

    const { search } = request.query;
    const lista = database.list(search);

    return lista;
});

server.post('/teste', (request, reply) => {

    const {nome, idade, saldo} = request.body;

    database.create({
        nome: nome,
        idade: idade,
        saldo: saldo,
    });

    return reply.status(201).send();
});

server.put('/teste/:id', (request, reply) => {
    const id = request.params.id;

    const {nome, idade, saldo} = request.body;

    database.update(id, {
        nome: nome,
        idade: idade,
        saldo: saldo,
    });

    return reply.status(204).send();
});

server.delete('/teste/:id', (request, reply) => {
    const id = request.params.id;

    database.delete(id);

    return reply.status(204).send;
});

server.listen({
    port: 3333
});
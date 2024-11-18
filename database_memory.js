import {
    randomUUID
} from 'node:crypto';

export class DatabaseMemory {
    #itens = new Map;

    create(dado) {
        const dadoId = randomUUID();

        this.#itens.set(dadoId, dado);
    }

    list(search) {
        return Array.from(this.#itens.entries().map(
            (itens) => {
                const id = itens[0];
                const item_data = itens[1];

                return {
                    id,
                    ...item_data,
                }
            }
        ).filter(item => {
            if(search) {
                return item.nome.includes(search);
            }
            return true;
        }));
    }

    delete(id) {
        this.#itens.delete(id);
    }

    update(id, dado) {

        this.#itens.set(id, dado);
    }
}
import 'dotenv/config'
import postgres from "postgres";

import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL);

async function getPostgresVersion() {
    try {
        const result = await sql`SELECT version()`;
        return result[0].version;
    } catch (error) {
        console.error("Erro ao acessar o banco:", error);
        throw new Error("Erro ao consultar o banco de dados");
    }
}
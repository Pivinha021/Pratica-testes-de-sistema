//Para rodar o codigo necessita estar "cd /backend" !!!

const request = require("supertest");
const app = require("../app");

// test("Primeiro Teste", () => {
//     expect(1+1+1).toBe(3);
// })

//GET http://localhost:3000/api/games
// Teste código de retorno API para lista de jogos
test("listar jogos mostrando apenas o codigo 200", async () => {
    const response = await request(app).get("/api/games");
    expect(response.statusCode).toBe(200);
});

// Testando conteudo da resposta for um array e se é maior que o
test("retornando se é uma lista de jogos", async () => {
    const response = await request(app).get("/api/games");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    
});
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

// POST http://localhost:3000/api/games
test("criar um novo jogo", async () => {
    const response = await request(app).post("/api/games")
        .send({
            //id: 6,
            title: "Game Post",
            genre: "Diversão",
            release_year: 2026
        });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Game Post");
    // expect(response.body.id).toBe(6);
    expect(response.body.genre).toBe("Diversão");
});

//POST com retorno de erros

test("post com retorno de erro", async () => {
    const response = await request(app).post("/api/games").send({});
    expect(response.statusCode).toBe(500);
});

test("verificar estrutura do objeto retornado", async () => {
    const response = await request(app).post("/api/games")
        .send({
            id: 1,
            title: "Game Post",
            genre: "Diversão",
            release_year: 2026
        });
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("title", "Game Post");
    expect(response.body).toHaveProperty("genre");
    expect(response.body).toHaveProperty("release_year");
    expect(response.body).toHaveProperty("id");
});

test("Buscar um jogo por id", async () => {
    const response = await request(app).post("/api/games")
        .send({
            id: 6,
            title: "Game Post",
            genre: "Diversão",
            realise_year: 2026
        });
    const respone2 = await request(app)
        .get(`/api/games/${response.body.id}`);

    expect(respone2.statusCode).toBe(200);
});

test("exemplo", async() => {
    
    const Criarresponse = await request(app).post("/api/games")
    .send({
        title: "Altos pode crê",
        genre: "Ação",
        release_year: 2026
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Altos pode crê");
    expect(response.body.genre).toBe("Ação");
    expect(response.body.release_year).toBe(2026);

    const getresponse = await request(app).get("/api/games/1");
    expect(response.statusCode).toBe(200);

    const Deleteresponse = await request(app).delete(`api/games/1`)

    const UltimoGetresponse = await request(app).get("/api/games/1");
    expect(response.statusCode).toBe(200);
});

// Fluxo completo

// Criar jogo

const createResponse = await request(app)
    .post("/api/games")
    .send({
        title: "Minecraft"
});

const id = createResponse.body.id;

// Buscar o jogo

const getResponse = await request(app)
    .get(`/api/games/${id}`);

expect(getResponse.statusCode).toBe(200);

// Deletar

const deleteResponse = await request(app)
    .delete(`/api/games/${id}`);

expect(deleteResponse.statusCode).toBe(200);

// Buscar novamente

const getDeletedResponse = await request(app)
    .get(`/api/games/${id}`);

expect(getDeletedResponse.statusCode).toBe(404);
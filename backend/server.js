//importação
const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

//localhost:3000

//middleware
app.use(express.static('../frontend'));

//localhost:3000/cep
app.get("/cep/:cep", async (req, res) => {
    try{
        const cep = req.params.cep;
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);   
    }catch(error){
        res.status(500).send("Erro ao acessar a internet");
    }
});

app.get("/fake-name", async (req, res) => {
    try{
        const response = await axios.get("https://randomuser.me/api/");
        res.json(response.data.results[0]);
    }catch(error){
        res.status(500).send("Erro ao gerar um nome falso!");
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

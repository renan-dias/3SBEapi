# Projeto API: Consulta CEP e Gerador de Nomes (3SBEapi)

Bem-vindo ao projeto 3SBEapi! Esta é uma aplicação simples que consiste em um backend Node.js com Express para fornecer duas APIs (consulta de CEP via ViaCEP e geração de nomes falsos via RandomUser) e um frontend básico em HTML e JavaScript para interagir com essas APIs.

## Visão Geral

O objetivo principal deste projeto é demonstrar a criação de um servidor backend simples que consome APIs externas e serve esses dados para um frontend.

*   **Backend**: Construído com Node.js e Express, expõe endpoints para:
    *   Consultar informações de um CEP.
    *   Gerar um nome aleatório.
*   **Frontend**: Uma página HTML simples com JavaScript para fazer requisições ao backend e exibir os resultados.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
aulabe/
├── backend/
│   ├── node_modules/   (Criada após npm install)
│   ├── package-lock.json (Criado após npm install)
│   ├── package.json      (Criado após npm init e npm install)
│   └── server.js       (Lógica principal do servidor backend)
├── frontend/
│   ├── index.html      (Estrutura da página web)
│   └── index.js        (Lógica JavaScript do frontend)
└── README.md           (Este arquivo)
```

*   `backend/server.js`: Contém o código do servidor Express, definição das rotas da API e a lógica para buscar dados das APIs externas (ViaCEP e RandomUser).
*   `frontend/index.html`: A página web que o usuário interage. Contém campos de entrada e botões para acionar as funcionalidades.
*   `frontend/index.js`: Contém as funções JavaScript que são chamadas pelos elementos do `index.html` para fazer requisições `fetch` aos endpoints do backend e atualizar a página com os resultados.

## Tecnologias Utilizadas

### Backend
*   **Node.js**: Ambiente de execução JavaScript do lado do servidor.
*   **Express.js**: Framework web para Node.js, usado para criar o servidor e as rotas da API.
*   **Axios**: Cliente HTTP baseado em Promises para fazer requisições às APIs externas (ViaCEP, RandomUser).

### Frontend
*   **HTML**: Linguagem de marcação para estruturar a página web.
*   **JavaScript (Vanilla JS)**: Linguagem de programação para adicionar interatividade à página e fazer requisições à API.
*   **Fetch API**: Interface moderna do JavaScript para realizar requisições de rede.

### APIs Externas Consumidas
*   **ViaCEP**: API para consulta de Códigos de Endereçamento Postal brasileiros.
*   **RandomUser API**: API para gerar dados de usuários aleatórios (usada aqui para nomes).

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js (que inclui o npm) instalado em sua máquina.

## Configuração e Instalação

1.  **Clone o repositório:**
    Abra seu terminal ou Git Bash e execute o seguinte comando:
    ```bash
    git clone https://github.com/renan-dias/3SBEapi.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd 3SBEapi
    ```
    (Se você clonou dentro de `c:\Users\Renan\Documents\aulabe\`, o caminho será `cd c:\Users\Renan\Documents\aulabe\3SBEapi` ou o nome que o Git usou para a pasta).

3.  **Instale as dependências do backend:**
    Navegue até a pasta `backend` e instale as dependências listadas no `package.json` (Express e Axios).
    ```bash
    cd backend
    npm install
    ```

## Executando a Aplicação

1.  **Inicie o servidor backend:**
    Ainda dentro da pasta `backend` (`c:\Users\Renan\Documents\aulabe\3SBEapi\backend\`), execute:
    ```bash
    node server.js
    ```
    Você deverá ver a mensagem `Servidor rodando em http://localhost:3000` no console.

2.  **Acesse o frontend:**
    Com o servidor backend rodando, abra seu navegador de internet e acesse a seguinte URL:
    ```
    http://localhost:3000/
    ```
    Isso carregará o arquivo `index.html` da pasta `frontend`, que é servido estaticamente pelo Express.

    Alternativamente, você pode abrir o arquivo `c:\Users\Renan\Documents\aulabe\3SBEapi\frontend\index.html` diretamente no navegador, mas para que as chamadas à API funcionem corretamente, o backend precisa estar rodando e o acesso via `http://localhost:3000/` é o recomendado.

## Detalhes da API Backend (`server.js`)

O backend expõe os seguintes endpoints:

### Endpoint: `GET /cep/:cep`

*   **Descrição**: Consulta informações de endereço com base em um CEP fornecido.
*   **URL**: `/cep/:cep`
*   **Método**: `GET`
*   **Parâmetro da URL**:
    *   `cep` (string): O Código de Endereçamento Postal a ser consultado (ex: `01001000`).
*   **Exemplo de Requisição**: `http://localhost:3000/cep/01001000`
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
      "cep": "01001-000",
      "logradouro": "Praça da Sé",
      "complemento": "lado ímpar",
      "bairro": "Sé",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    }
    ```
*   **Resposta de Erro (500 Internal Server Error)**:
    ```
    Erro ao acessar a internet
    ```

### Endpoint: `GET /fake-name`

*   **Descrição**: Gera e retorna dados de um usuário aleatório, focando no nome.
*   **URL**: `/fake-name`
*   **Método**: `GET`
*   **Exemplo de Requisição**: `http://localhost:3000/fake-name`
*   **Resposta de Sucesso (200 OK)**:
    ```json
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Alice",
            "last": "Johnson"
        },
        // ... outros dados do usuário
    }
    ```
*   **Resposta de Erro (500 Internal Server Error)**:
    ```
    Erro ao gerar um nome falso!
    ```

## Funcionalidades do Frontend (`frontend/index.html` e `frontend/index.js`)

O frontend permite ao usuário:

1.  **Consultar CEP**:
    *   Um campo de input (`id="cepInput"`) para o usuário digitar o CEP.
    *   Um botão ("Consultar") que, ao ser clicado, chama a função `consultarCEP()` do `index.js`.
    *   A função `consultarCEP()` faz uma requisição `fetch` para o endpoint `/cep/:cep` do backend.
    *   O resultado (ou erro) é exibido em um `alert`.

2.  **Gerar Nome Falso**:
    *   Um botão ("Gerar Nome") que, ao ser clicado, chama a função `gerarNomeFalso()` do `index.js`.
    *   A função `gerarNomeFalso()` faz uma requisição `fetch` para o endpoint `/fake-name` do backend.
    *   O nome gerado é exibido em um parágrafo (`id="nomeFalso"`) na página.

## Para Explorar Mais

*   **Node.js**: Documentação Oficial
*   **Express.js**: Site Oficial
*   **Axios**: Repositório no GitHub
*   **Fetch API**: MDN Web Docs
*   **ViaCEP API**: Documentação
*   **RandomUser API**: Site Oficial

## Resumo em Tabelas

### Endpoints da API Backend

| Método | Endpoint     | Descrição                                  |
| :----- | :----------- | :----------------------------------------- |
| `GET`  | `/cep/:cep`  | Retorna dados de endereço para o CEP dado. |
| `GET`  | `/fake-name` | Retorna dados de um usuário aleatório.     |

### Tecnologias Principais

| Camada  | Tecnologia     | Propósito                                     |
| :------ | :------------- | :-------------------------------------------- |
| Backend | Node.js        | Ambiente de execução JavaScript               |
| Backend | Express.js     | Framework para construção da API              |
| Backend | Axios          | Cliente HTTP para consumir APIs externas      |
| Frontend| HTML           | Estrutura da página web                       |
| Frontend| JavaScript     | Interatividade e chamadas à API (Fetch)       |

Sinta-se à vontade para expandir e melhorar este projeto!

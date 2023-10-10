const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.post('/api', (req, res) => {
    const token = 'TOKEN';

    const requestData = {
        qtype: req.body.qtype,
        query: req.body.query,
        oper: req.body.oper,
        page: req.body.page,
        rp: "10000",
        sortname: req.body.sortname,
        sortorder: req.body.sortorder
    };
    console.log(JSON.stringify(requestData, null, 2)); 
    const options = {
        method: 'POST',
        url: 'https://HOST/webservice/v1/cliente',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(token).toString('base64'),
            ixcsoft: 'listar',
        },
        body: requestData,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro na chamada da API' });
        } else if (response.statusCode === 404) {
            console.error('Recurso não encontrado');
            res.status(404).json({ error: 'Recurso não encontrado' });
        } else {
            res.json(body);
        }
    });
    console.log(req.method, req.url, req.headers, req.body);

});

app.listen(port, () => {
    console.log('Servidor na porta:' + port);
});

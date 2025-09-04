
const express = require('express');
const mysql = require('mysql2');

const app = express(); 
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'colg@t1A', 
    database: 'gestao_remessas'
});

connection.connect(error => {
    if (error) {
        return console.error('Erro ao conectar ao banco de dados:', error.stack);
    }
    console.log('Conexão com o banco de dados bem-sucedida!');
});

app.post('/salvar-remessa', (req, res) => {
    const { dataPostagem, servico, quantidade, job, ocr } = req.body;
    const sql = 'INSERT INTO remessas (data_postagem, servico, quantidade, job, ocr) VALUES (?, ?, ?, ?, ?)';
    const values = [dataPostagem, servico, quantidade, job, ocr];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ success: false, message: 'Erro no servidor.' });
             }
        console.log('Dados da remessa salvos com sucesso!');
        res.status(200).json({ success: true, message: 'Remessa salva com sucesso!' });
  });
});

app.listen(port, () => {
    console.log(`Servidor iniciado. Acesse http://localhost:${port} no seu navegador.`);
});

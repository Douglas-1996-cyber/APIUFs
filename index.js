import { buscarUfs, buscarUfPorId, buscarUfsPorNome } from './servicos/servico.js';
import express from 'express'
const porta = 3003
const app = express()


app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.status(404).send({ "erro": "Nenhuma UF encontrada" });
    }
  });
  
  app.get('/ufs/:iduf', (req, res) => {
    const uf = buscarUfPorId(req.params.iduf);
  
    if (uf) {
      res.json(uf);
    } else if (isNaN(parseInt(req.params.iduf))) {
      res.status(400).send({ "erro": "Requisição inválida" });
    } else {
      res.status(404).send({ "erro": "UF não encontrada" });
    }
  });

app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});
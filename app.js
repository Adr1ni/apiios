const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let combis = [
    { id: 1, name: 'cotum', image: 'https://pbs.twimg.com/media/GP6_nR-W8AAyS8H?format=png&name=360x360', numerosRutas: 2, numerosdeUnidades: 12 },
    { id: 2, name: 'c9', image: 'https://pbs.twimg.com/media/GP6_q6gWIAAvbTA?format=png&name=360x360', numerosRutas: 2, numerosdeUnidades: 20 },
    { id: 3, name: 'logo', image: 'https://i.pinimg.com/736x/4f/7f/3a/4f7f3ae51d805c9e0ad014cf798d452d.jpg' },
    { id: 4, name: 'aqpmasivo', image: 'https://pbs.twimg.com/media/GP6_q6kXcAAtf30?format=png&name=360x360', numerosRutas: 2, numerosdeUnidades: 12 },
    { id: 5, name: 'combi1', image: 'https://i.pinimg.com/736x/f6/76/20/f67620d72710bf2323c87ada67398b8c.jpg', numerosRutas: 5, numerosdeUnidades: 10 },
    { id: 6, name: 'megabus', image: 'https://pbs.twimg.com/media/GP6_nR_WEAAjaI1?format=png&name=360x360', numerosRutas: 1, numerosdeUnidades: 26 },
    { id: 7, name: 'transcayma', image: 'https://pbs.twimg.com/media/GP6_nR8XsAALlLD?format=png&name=360x360', numerosRutas: 8, numerosdeUnidades: 25 },
    { id: 8, name: 'unionAqp', image: 'https://pbs.twimg.com/media/GP6_nR_WEAAjaI1?format=png&name=360x360', numerosRutas: 7, numerosdeUnidades: 11 },
];

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/combis', (req, res) => {
    res.json(combis);
});

app.post('/combis', (req, res) => {
    const { name, numerosRutas, numerosdeUnidades } = req.body;
    if (!name) {
        return res.status(400).send('El nombre es obligatorio');
    }
    const newCombi = {
        id: combis.length ? combis[combis.length - 1].id + 1 : 1,
        name,
        image: '',
        numerosRutas: numerosRutas || 0,
        numerosdeUnidades: numerosdeUnidades || 0
    };
    combis.push(newCombi);
    res.status(201).json(newCombi);
});

app.put('/combis/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, numerosRutas, numerosdeUnidades } = req.body;
    const combiIndex = combis.findIndex(c => c.id === id);
    if (combiIndex === -1) {
        return res.status(404).send('Combi no encontrada');
    }
    if (name) {
        combis[combiIndex].name = name;
    }
    if (numerosRutas !== undefined) {
        combis[combiIndex].numerosRutas = numerosRutas;
    }
    if (numerosdeUnidades !== undefined) {
        combis[combiIndex].numerosdeUnidades = numerosdeUnidades;
    }
    res.json(combis[combiIndex]);
});

app.delete('/combis/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const combiIndex = combis.findIndex(c => c.id === id);
    if (combiIndex === -1) {
        return res.status(404).send('Combi no encontrada');
    }
    combis.splice(combiIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const { Console } = require('console');
const express = require('express');
const app = express();
const fs = require("fs");
const pets = require('./pets.json');

const PORT = 5555;

app.use(express.json());

app.get('/api/pets', (req, res) => {
    fs.readFile("pets.json", "utf8", function (err, petsJson) {
        if (err) {
            res.status(404).send("Not found");
        }
        res.status(200).send(JSON.parse(petsJson));
    });
})


app.get('/api/pets/:id', function (req, res) {
    if (!pets[req.params.id]) {
        res.status(404).send('Not found');
    } else {
        res.status(200).send(pets[req.params.id]);
    }
})


app.post('/api/pets', (req, res) => {
    if (!req.body.age || !req.body.name || !req.body.kind) {
        res.status(404).end('Body must be formatted as such: { "age": integer, "kind": string, "name": string }');
        return undefined;
    } if (typeof req.body.age !== 'number') {
        res.status(404).end('Age must be a number')
        return undefined;
    }
    else {
        pets.push(req.body);
        fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Server error', err);
            } else {
                res.status(201).send(req.body)
            }
        })
    }
})

app.patch('/api/pets/:id', (req, res) => {
    const index = req.params.id;
    if (!pets[req.params.id]) {
        res.status(404).send('Not found');
    }
    else {
        let reqObj = req.body;
        let keys = Object.keys(reqObj);
        let petsObj = pets[index];
        for (let i = 0; i < keys.length; i++) {
            delete petsObj[keys[i].toLowerCase()];
            petsObj[keys[i]] = reqObj[keys[i]];
        }
        fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(pets[index])
            }
        })
    }
})

app.delete('/api/pets/:id', (req, res) => {
    if (!pets[req.params.id]) {
        res.status(404).send('Not found')
    } else {
        let index = req.params.id;
        pets.splice(index, 1);
        fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send('Pet deleted');
            }
        })
    }
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not found')
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

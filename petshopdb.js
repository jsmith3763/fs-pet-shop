const res = require('express/lib/response');
const { Pool } = require('pg');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const pool = new Pool({
    user: 'jsmith3763',
    host: 'localhost',
    database: 'petshop',
    password: 'password',
    port: 5432
});

app.use(express.json());

//get all
app.get('/api/pets', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM pets');
        res.send(data.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get one
app.get('/api/pets/:id', async (req, res) => {
    try {
        const data = await pool.query(`SELECT * FROM pets WHERE id = ${req.params.id}`);
        res.send(data.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//update one
app.patch('/api/pets/:id', async (req, res) => {
    try {
        const { age, kind, name } = req.body;
        const pet = await pool.query(`SELECT * FROM pets WHERE id = $1`, [req.params.id]);
        const updateDB = {
            name: name || pet.rows[0].name,
            kind: kind || pet.rows[0].kind,
            age: age || pet.rows[0].age
        }
        const updatePet = await pool.query(`UPDATE pets SET name = $1, kind = $2, age = $3 WHERE id = $4 RETURNING *`, [updateDB.name, updateDB.kind, updateDB.age, req.params.id])
        res.json(updatePet.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//add one
app.post('/api/pets', async (req, res) => {
    try {
        let name = req.body.name;
        let age = req.body.age;
        let kind = req.body.kind;

        if (name !== undefined && age !== undefined && kind !== undefined) {
            const newPet = await pool.query(`INSERT INTO pets (age, name, kind) VALUES ($1, $2, $3) RETURNING *`, [age, name, kind]);
            res.json(newPet.rows[0]);
        } else {
            res.send("Pet not added: Ensure you enter fields for age, name, and kind.");
        }
    } catch (error) {
        console.error(error.message);
    }
});

//delete one
app.delete('/api/pets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const del = await pool.query(`DELETE FROM pets WHERE id = ${id}`);
        res.send("Pet deleted");
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

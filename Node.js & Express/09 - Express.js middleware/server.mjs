import express from 'express';
import mysql from 'mysql2/promise';
import simpleAuthMiddleware from './middleware/simpleAuth.middleware.mjs';

const app = express()
const port = 3000

app.use(express.json());

// Všechny requesty musí projít tímto middlewarem
app.use(simpleAuthMiddleware);

/**
 * Pool pro připojení k databázi
 * Pool obsahuje sadu již otevřených spojení k databázi, která jsou pak opakovaně používána v rámci SQL operací.
 * Tím se šetří čas a zdroje
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_name',
});

/**
 * Základní select do databáze
 */
app.get('/', async (req, res) => {
    const [data, metadata] = await pool.execute('SELECT * FROM students');
    res.send(data);
});

/**
 * Select s parametrem
 */
app.get('/:id', async (req, res) => {
    const [data, metadata] = await pool.execute('SELECT * FROM students WHERE id = ?', [req.params.id]);
    res.send(data);
});

/**
 * Vložení dat do databáze
 */
app.post('/', async (req, res) => {
    const [data, metadata] = await pool.execute('INSERT INTO students (name, surname) VALUES (?, ?)', [req.body.name, req.body.surname]);
    res.send(data);
});

/**
 * Smazání dat z databáze
 */
app.delete('/:id', async (req, res) => {
    const [data, metadata] = await pool.execute('DELETE FROM students WHERE id = ?', [req.params.id]);
    res.send(data);
});

/**
 * Úprava dat v databázi
 */
app.put('/:id', async (req, res) => {
    const [data, metadata] = await pool.execute('UPDATE students SET name = ?, surname = ? WHERE id = ?', [req.body.name, req.body.surname, req.params.id]);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

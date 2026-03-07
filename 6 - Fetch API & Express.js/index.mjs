import express from 'express';
const app = express()
const port = 3000

// TOTO PRIDAT!!!
app.use(express.json());

// C# -> [HttpGet("/{str}")]
app.get('/users', (req, res) => {
    res.send([
        {
            name: "Adam",
            surname: "Mrózek"
        }
    ]);
});

app.post('/post', async (req, res) => {

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

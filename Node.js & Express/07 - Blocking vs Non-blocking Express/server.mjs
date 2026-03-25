import express from 'express';
const app = express()
const port = 3000

app.use(express.json());

app.get('/', async (req, res) => {
    //blockingSleep(5000);
    await nonBlockingSleep(5000);

    res.send([
        {
            name: "John",
            surname: "Doe"
        }
    ]);
});

// Original author: https://4it573.adamjedlicka.cz/scripta/npm-a-jednoduchy-http-server.html
function blockingSleep(delay) {
  let stop = new Date().getTime() + delay
    while (new Date().getTime() < stop) { }
}

function nonBlockingSleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

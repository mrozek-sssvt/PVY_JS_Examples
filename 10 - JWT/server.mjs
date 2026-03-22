import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuthMiddleware from './middleware/jwtAuth.middleware.mjs';

const app = express();
const port = 3000;

app.use(express.json());

/**
 * Tajný klíč pro podepisování tokenů.
 * V reálu by měl být uložen v .env souboru, ne přímo v kódu.
 */
export const SECRET_KEY = 'muj_tajny_klic';

/**
 * Simulovaná databáze uživatelů.
 * V reálu by hesla měla být hesla hashovaná.
 */
const mockUserDb = [
    { id: 1, username: 'admin', password: 'heslo123' },
    { id: 2, username: 'jan',   password: 'tajne456' },
];

/**
 * Přihlášení uživatele.
 * Pokud jsou správné přihlašovací údaje, vrátí JWT token.
 * TIP: Zkuste vložit vygenerovaný token na stránku jwt.io a podívat se, co je uvnitř.
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // V realitě by se heslo porovnávalo s hashem v databázi, nikdy neukládáme hesla v plaintextu!
    const user = mockUserDb.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send('Nesprávné přihlašovací údaje');
    }

    // Vytvoříme token s daty uživatele, platný 1 hodinu
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.send({ token });
});

/**
 * Chráněná routa - přístupná pouze s platným tokenem.
 * jwtAuthMiddleware se spustí před samotným handlerem.
 */
app.get('/profil', jwtAuthMiddleware, (req, res) => {
    res.send(`Ahoj, ${req.user.username}! Toto je tvůj profil.`);
});

/**
 * Další chráněná routa.
 */
app.get('/data', jwtAuthMiddleware, (req, res) => {
    res.send({ zprava: 'Tajná data', uzivatel: req.user.username });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

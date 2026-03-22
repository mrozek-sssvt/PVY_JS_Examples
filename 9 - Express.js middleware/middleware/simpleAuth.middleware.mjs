const mockUserDb = [
    {
        username: "admin",
        password: "[PASSWORD]"
    }
];

/**
 * Jednoduchý autentizační middleware.
 * V reálu není bezpečné posílat heslo a jméno v každém requestu. 
 * Mělo by se používat JWT tokeny.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export default function simpleAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const [username, password] = authHeader.split(':');

    const user = mockUserDb.find(user => user.username === username && user.password === password);
    
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    
    next();
}
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../server.mjs';

/**
 * JWT autentizační middleware.
 * Ověří, zda je v hlavičce platný JWT token.
 * Pokud ano, uloží data uživatele do req.user a pokračuje dál.
 * Do Postmana vkládáme do záložky Authorization, vybereme typ Bearer Token a vložíme token z /login.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export default function jwtAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Unauthorized - chybí token');
    }

    // Token se posílá ve formátu: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized - neplatný token');
    }
}

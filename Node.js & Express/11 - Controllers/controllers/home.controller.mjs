/**
 * Home Controller
 *
 * Controller sdružuje handlery (funkce) pro konkrétní část aplikace.
 * Díky tomu nemusíme mít veškerou logiku v jednom souboru (server.mjs),
 * ale rozdělíme ji do přehledných celků.
 */

/**
 * GET /
 * Vrátí uvítací zprávu.
 */
export function getHome(req, res) {
    res.send({ zprava: 'Vítejte na hlavní stránce!' });
}

/**
 * GET /o-nas
 * Vrátí informace o aplikaci.
 */
export function getAbout(req, res) {
    res.send({ nazev: 'Moje Express aplikace', verze: '1.0.0' });
}

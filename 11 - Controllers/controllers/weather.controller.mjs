/**
 * Weather Controller
 *
 * Druhý controller demonstruje, že každá část aplikace (feature)
 * může mít vlastní soubor s handlery. Router pak propojí URL adresy
 * s příslušnými controllery.
 */

/**
 * Simulovaná databáze počasí.
 * V reálu by data pocházela z externího API nebo z databáze.
 */
const pocasiData = {
    praha:  { mesto: 'Praha',  teplota: 18, popis: 'Polojasno' },
    brno:   { mesto: 'Brno',   teplota: 20, popis: 'Slunečno'  },
    ostrava:{ mesto: 'Ostrava',teplota: 15, popis: 'Oblačno'   },
};

/**
 * GET /pocasi
 * Vrátí počasí pro všechna dostupná města.
 */
export function getAll(req, res) {
    res.send(Object.values(pocasiData));
}

/**
 * GET /pocasi/:mesto
 * Vrátí počasí pro konkrétní město.
 * Parametr :mesto je část URL adresy – např. /pocasi/praha
 */
export function getByCity(req, res) {
    // req.params.mesto odpovídá názvu parametru v routě (:mesto)
    const mesto = req.params.mesto.toLowerCase();
    const data = pocasiData[mesto];

    if (!data) {
        // Pokud město neexistuje, vrátíme stavový kód 404
        return res.status(404).send({ chyba: `Město '${req.params.mesto}' nebylo nalezeno.` });
    }

    res.send(data);
}

/**
 * Ne vždy všechny operace jdou psát synchroně. Na některé operace musíme počkat a nevíme,
 * jak dlouho takové čekání bude. Proto existují asynchronní operace.
 * 
 * Promise je objekt, který reprezentuje stav asynchronní operace. Může být ve stavu:
 * - pending: operace ještě není dokončena
 * - fulfilled: operace byla úspěšně dokončena
 * - rejected: operace byla neúspěšně dokončena
 */

// Funkce, která nám vrací objekt promise
// V tomto kódu nám setTimeout simuluje např. HTTP request na náš server.
// V reálném světě nevíme, jak dlouho bude trvat, než nám server odpoví.
function addAsync(a, b) {
    // Každý promise má dva parametry, resolve a reject.
    // resolve je funkce, kterou zavoláme, když je operace úspěšně dokončena.
    // reject je funkce, kterou zavoláme, když je operace neúspěšně dokončena.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = a + b;

            if (isNaN(res)) {
                reject("Oba parametry musí být čísla");
            } else {
                resolve(res);
            }
        }, 1000);
    });
}

// Tento kus kódu se provede bez problémů. Vypíše se 3.
// Každý Promise má několik metod, které nám umožňují pracovat s výsledkem operace.
// Jedna z nich je metoda .then(), která nám umožní pracovat s výsledkem.
addAsync(1, 2).then((result) => {
    console.log(result);
});

// Tento kus kódu nám vyhodí Nodejs chybu UnhandledPromiseRejectionError v případě, že nebudeme mít catch. Znaky "a" a "b" nejsou čísla, takže se operace 
// neprovede úspěšně a zavolá se reject.
// Musíme proto přidat metodu .catch(), která nám umožní pracovat s chybou.
// Zkuste schválně zakomentovat .catch() a uvidíte, co se stane.
addAsync("a", "b").then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});


// Promise.all() je metoda, která nám umožní pracovat s více Promise najednou.
// V tomto kódu nám Promise.all() umožní pracovat s více Promise najednou.
Promise.all([addAsync(1, 2), addAsync(3, 4)]).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

// Metoda then() nemusí být ale pouze na objektu Promise. Můžeme si jí nadefinovat i samostatně.
// Mimochodem, tento kód je příkladem tzv. "builder patternu"
class SqlQueryBuilder {
    tableName;
    columns;

    from(tableName) {
        this.tableName = tableName;
        return this;
    }

    select(columns) {
        this.columns = columns;
        return this;
    }

    /**
     * Naše metoda then() funguje na stejném principu jako Promise.then()
     * V tomto případě nám vrací SQL dotaz.
     */
    then(resolve) {
        resolve(`SELECT ${this.columns} FROM ${this.tableName}`);
    }
}

const query = new SqlQueryBuilder().from("users").select(["name", "email"]);
query.then((result) => {
    console.log(result);
});
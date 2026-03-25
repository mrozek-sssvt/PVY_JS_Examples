/**
 * V předchozím příkladu jsme si ukázali, jak pracovat s Promise. 
 * V tomto příkladu si ukážeme, jak pracovat s Promise pomocí klíčových slov async a await.
 * 
 * Async a await jsou tzv. "syntaktický cukr" nad Promise. 
 * To znamená, že nám umožňují psát kód, který vypadá synchronně, ale ve skutečnosti je asynchronní.
 * 
 * Pozorujte, že běh tohoto progrmau trvá dále, než kód v předchozím příkladu.
*/


// Naše funkce vracející promise se v tomto případě měnit nebude.
function addAsync(a, b) {
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

// Pokud nyní zavoláme naši funkci addAsync(1, 2) a uložíme jí do proměnné.
// tak zjistíme, že v proměnné je objekt Promise, nikoliv hodnota 3.
// Do konzole se nám vypíše Promise { <pending> }
const result = addAsync(1, 2);
console.log(result);

// Chceme-li získat hodnotu z Promise, musíme na něj počkat. 
// K tomu nám slouží klíčové slovo await.
const result2 = await addAsync(1, 2);
console.log(result2);

// Tento kód nám nyní vyhodí výjimku.
// const wrongResult = await addAsync("a", "b");
// console.log(wrongResult);

// Abychom se vyhnuli výjimce, musíme použít try-catch blok.
try {
    const wrongResult = await addAsync("a", "b");
    console.log(wrongResult);
} catch (error) {
    console.log(error);
}


// I v případě Promise.all() můžeme využít await
// Všimněte si nové syntaxe pro rozbalení pole (destructuring)
const [one, two] = await Promise.all([addAsync(1, 2), addAsync(3, 4)]);
console.log(one);
console.log(two);

// V přípaě našeho SqlQueryBuilderu se nic zásadního nemění.
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

const query = await new SqlQueryBuilder().from("users").select(["name", "email"]);
console.log(query);

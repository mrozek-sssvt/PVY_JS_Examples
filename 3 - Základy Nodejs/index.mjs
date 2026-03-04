/**
 * Jednoduchá aplikace demonstrující synchroní
 * operaci načtení a zápisu do souboru.
 */

// Import modulu FS (File System modul)
import { log } from "node:console";
import fs from "node:fs";

// Načtení všech souborů ze složky, rekurzivně
const files = fs.readdirSync("./source", { recursive: true });

console.log(files);


// Překopírování všech souborů do složky "destination"
files.forEach((file) => {
    fs.copyFileSync(`./source/${file}`, `./output/${file}`);
});
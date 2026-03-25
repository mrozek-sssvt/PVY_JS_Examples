import express from "express";

// process.env obsahuje vsechny promenne nactenez .env souboru
// (nacitani zajisti Node.js pres --env-file flag v npm scriptech)
const app = express();

const PORT = process.env.PORT ?? 3000;
const APP_NAME = process.env.APP_NAME ?? "Aplikace";
const NODE_ENV = process.env.NODE_ENV ?? "development";
const DEBUG = process.env.DEBUG === "true";

// Konfigurace databaze sestavena z env promennych
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

// Informace o aktualnim prostredi
app.get("/", (req, res) => {
    res.json({
        app: APP_NAME,
        environment: NODE_ENV,
        debug: DEBUG,
        api_url: process.env.API_URL,
    });
});

// Endpoint dostupny jen v debug rezimu (development)
app.get("/debug/config", (req, res) => {
    if (!DEBUG) {
        return res.status(403).json({ error: "Debug endpoint neni dostupny v produkci" });
    }

    // V produkci NIKDY nevracet citlive hodnoty ven z API!
    res.json({
        environment: NODE_ENV,
        dbConfig: {
            host: dbConfig.host,
            port: dbConfig.port,
            database: dbConfig.database,
            user: dbConfig.user,
        },
        maxUploadSizeMB: process.env.MAX_UPLOAD_SIZE_MB,
    });
});

app.listen(PORT, () => {
    console.log(`[${APP_NAME}] Server bezi na portu ${PORT}`);
    console.log(`[${APP_NAME}] Prostredi: ${NODE_ENV}`);
    console.log(`[${APP_NAME}] Debug rezim: ${DEBUG}`);
    console.log(`[${APP_NAME}] DB: ${dbConfig.user}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
});

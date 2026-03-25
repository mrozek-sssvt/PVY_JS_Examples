Aplikaci otestujete pomocí scriptů:

npm run dev
npm run prod

V konzoli uvidíte, jaké hodnoty se načetly z .env souborů.

Následně můžete otestovat endpointy v prohlížeči:

http://localhost:3000
http://localhost:3000/debug/config

Doporučuji také prostudovat si package.json pro pochopení, jak se spouští jednotlivé skripty a samotné ENV soubory. Pokud se podíváme na script `node --env-file=.env --env-file=.env.development index.mjs` vidíme, že první načte soubor `.env` a následně `.env.development`. To znamená, že hodnoty z `.env.development` přepíší hodnoty z `.env` (dojde ke sloučení, přičemž pozdější soubor má přednost).

ENV soubory, vyjma `.env.example`, by neměly být commitovány do gitu. Měly by být spravovány v CI/CD pipeline nebo lokálně v závislosti na prostředí. V produkci se často používají tzv. "secrets" v cloudu (např. AWS Secrets Manager, Azure Key Vault, Google Secret Manager), které se automaticky načítají do proměnných prostředí serveru.

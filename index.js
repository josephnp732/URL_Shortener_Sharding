const app = require('express')();
const {Client} = require("pg");
const HashRing = require('hashring');
const crypto = require('crypto');

const hr = new HashRing();

const postgresHostName = "christymac.local";  // TODO:  change this to local machine hostname

hr.add("5432");
hr.add("5433");
hr.add("5434");

const clients = {
    "5432" : new Client( {
        "host": postgresHostName,
        "port" : "5432",
        "user" : "postgres",
        "password" : "changeme",
        "database" : "postgres"
    }),
    "5433" : new Client( {
        "host": postgresHostName,
        "port" : "5433",
        "user" : "postgres",
        "password" : "changeme",
        "database" : "postgres"
    }),
    "5434" : new Client( {
        "host": postgresHostName,
        "port" : "5434",
        "user" : "postgres",
        "password" : "changeme",
        "database" : "postgres"
    }),
}

connect();

// Postgres Connection Pool
async function connect() {
    await clients["5432"].connect();
    await clients["5433"].connect();
    await clients["5434"].connect();
}

// GET URL from DB
app.get('/:urlId', async (req, res) => {
    const urlId = req.params.urlId;  // rGu2a
    const server = hr.get(urlId);
    const result = await clients[server].query("SELECT * FROM URL_TABLE WHERE URL_ID = $1", [urlId]);
    if (result.rowCount > 0) {
        res.status(200);
        res.send({
            "hash": urlId,
            "URL" : result.rows[0].url,
            "server": server
        });
    } else {
        res.status(404);
        res.send("URL not found");
    }
});

// POST URL into DB
app.post("/", async (req, res) => {

    const url = req.query.url;  // www.google.com

    // Consistently hash to get a port
    const hash = crypto.createHash("sha256").update(url).digest("base64");
    const urlID = hash.substr(0, 5);

    const server = hr.get(urlID);

    await clients[server].query("INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)", [url, urlID]);
    res.status(200);
    res.send({
        "hash": urlID,
        "URL" : url,
        "server": server
    });
});

app.listen(3000, () => {
    console.log("Listening on PORT: 3000");
})
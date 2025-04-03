const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.get("/chats", async (req, res) => {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch("https://dashboard.render.com/web/srv-cvnccg2dbo4c73bi68ag/deploys/dep-cvnccgadbo4c73bi68e0/chats");
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import App from "../App";
import "../styles/index.css";
import fs from "fs";
import path from "path";

const PORT = 3000;
const server = express();

server.use(express.static("dist"));

server.get("/", (_, res) => {
  const app = renderToString(<App />);

  const indexFile = path.resolve(__dirname, "../../index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="app"></div>', `<div id="app">${app}</div>`),
    );
  });
});

server.listen(PORT, () => console.log("Example app listening on port 3000!"));

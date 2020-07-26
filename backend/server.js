"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const database_1 = require("./database");
var Server;
(function (Server) {
    let databaseURL = "mongodb+srv://umbertofalkenhagengis:gisistgeil@umbertofalkenhagengis.yuat8.mongodb.net/test";
    startServer();
    async function startServer() {
        console.log("Starting server");
        console.log("Connecting to DB...");
        await database_1.Database.connectToDB(databaseURL);
        let port = Number(process.env.PORT);
        if (!port)
            port = 8100;
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        let urlWithQuery = Url.parse(_request.url, true);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        switch (urlWithQuery.pathname) {
            case "/update":
                DbJsonResponse(_response, await database_1.Database.update(urlWithQuery.query));
                break;
            case "/insert":
                DbJsonResponse(_response, await database_1.Database.insert(urlWithQuery.query));
                break;
            case "/delete":
                DbJsonResponse(_response, await database_1.Database.removeOne(urlWithQuery.query));
                break;
            case "/get":
                DbJsonResponse(_response, await database_1.Database.findOne(urlWithQuery.query));
                break;
            case "/read":
                DbJsonResponse(_response, await database_1.Database.findAll());
                break;
            default:
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.write(_request.url);
        }
        _response.end();
    }
    // tslint:disable-next-line: no-any
    function DbJsonResponse(_response, _result) {
        _response.setHeader("content-type", "application/json");
        _response.write(JSON.stringify(_result));
    }
})(Server = exports.Server || (exports.Server = {}));
//# sourceMappingURL=server.js.map
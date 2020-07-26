import * as Http from "http";
import * as Url from "url";
import { Database } from "./database";

export namespace Server {

    startServer();
    async function startServer(): Promise<void> {
        console.log("Starting server");
        console.log("Connecting to DB...");
        await Database.connectToDB("mongodb://localhost:27017");

        let port: number = Number(process.env.PORT);
        if (!port)
            port = 8100;
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let urlWithQuery: Url.UrlWithParsedQuery = Url.parse(_request.url!, true);
        _response.setHeader("Access-Control-Allow-Origin", "*");

        switch (urlWithQuery.pathname) {
            case "/update":
                DbJsonResponse(_response, await Database.update(urlWithQuery.query));
                break;
            case "/insert":
                DbJsonResponse(_response, await Database.insert(urlWithQuery.query));
                break;
            case "/delete":
                DbJsonResponse(_response, await Database.removeOne(urlWithQuery.query));
                break;
            case "/get":
                DbJsonResponse(_response, await Database.findOne(urlWithQuery.query));
                break;
            case "/read":
                DbJsonResponse(_response, await Database.findAll());
                break;
            default:
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.write(_request.url);
        }
        _response.end();
    }

    // tslint:disable-next-line: no-any
    function DbJsonResponse(_response: Http.ServerResponse, _result: any): void {
        _response.setHeader("content-type", "application/json");
        _response.write(JSON.stringify(_result));
    }
}
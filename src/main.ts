// import { apiErrorHandler, apiNormalizationPort } from "./utils";
import http from 'http';
import app from './app'
import * as os from 'os';
import { apiErrorHandler, apiNormalizationPort } from './core/utils';


function bootstrap() {
    const port = apiNormalizationPort(process.env.PORT || 3000);
    app.set('port', port);

    const server = http.createServer(app);

    server.on("error", (error) => {
        apiErrorHandler(error, port, server);
    })
    server.on('listening', (stream: any) => {
        console.log(stream);
        const address = server.address();
        const bind = typeof address == "string" ? "pipe " + address : 'port ' + port;
        console.log('Listening on ' + bind);
        console.log("http://localhost:3000/docs");


        const wlp4s0 = os.networkInterfaces().wlp4s0?.filter(ele => ele.family == 'IPv4');
        if (wlp4s0 && wlp4s0.length != null) {
            const net = wlp4s0[0];
            console.log(`http://${net.address}:3000`)

            console.log();
        }
    })
    server.listen(port);
}

bootstrap();


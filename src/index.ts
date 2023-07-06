import { httpServer } from './httpServer';
import './wsServer';


const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
const server = httpServer.listen(HTTP_PORT);

export { server };

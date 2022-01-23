import server from "./src/server.js";
import 'dotenv/config';

server.listen(process.env.PORT, console.log(`\n ... Server is running at port ${process.env.PORT}... \n`))
import { Application } from "deps";
import router from "./src/routes/routes.ts";
import log from "log";
import loggerMiddleware from "./src/middlewares/logger.ts";
import errorMiddleware from "./src/middlewares/error.ts";
import notFoundMiddleware from "./src/middlewares/notFound.ts";
import timingMiddleware from "./src/middlewares/timing.ts";

const app = new Application();

app.use(loggerMiddleware);
app.use(timingMiddleware);
app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFoundMiddleware);


const URL = (Deno.env.get("URL") || "TEST");
const PORT = Deno.env.get("PORT") || "TEST";
const VERSION = Deno.env.get("BACKEND_VERSION") || "TEST";  

log.info(`Running backend${VERSION} on ${URL}:${PORT}...`);

await app.listen({ port: 8000 });

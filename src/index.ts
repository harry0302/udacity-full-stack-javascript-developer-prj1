import express from "express";
import morgan from "morgan";
import router from './routes';

const app = express();

const port = process.env.PORT || 8082;

app.use(morgan('short'));

app.use('/', router);

// Start the Server
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
});
export default app;
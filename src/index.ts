import { app } from "./server/server";


app.listen(process.env.PORT || 3333,() => {
    console.log('Server Rodando na porta ' + (process.env.PORT || 3333));
});
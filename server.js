const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();

const generateRandomProducts = require("./faker.js");

const listProducts = generateRandomProducts(5);

const { Server: HttpServer } = require("http");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();
const httpServer = new HttpServer(app);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cookieParser());
app.set("views", "./public");
app.set("view engine", "ejs");


app.use(session({
 store: MongoStore.create({ mongoUrl: "mongodb+srv://testram:1004@proyectofinal.3lbfntb.mongodb.net/?retryWrites=true&w=majority",
 mongoOptions: advancedOptions}),
 secret: 'desafio9',
 resave: false,
 saveUninitialized: false
}))
app.get("/api/productos", (req, res) => {
  res.render("faker", { productos: listProducts });
});

let contador = 0;
app.get('/sin-session', (req, res) => {
  res.send({ contador: ++contador});
});

app.get('/con-session', (req, res) => {
  if(req.session.contador){
    req.session.contador++;
    res.send(`Hola! visitaste la pagina ${req.session.contador} veces`);
  } else {
    req.session.contador = 1;
    res.send(`Hola! Te damos la bienvenida`);
  }
});
app.get("/", async (req, res) => {
  const userName = req.body
  req.session.user = userName
  res.render("index");
});

const port = 8080;

const server = httpServer.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

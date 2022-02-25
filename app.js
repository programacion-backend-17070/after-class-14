const express = require("express")
const app = express()
const routerCarrito = require("./routers/carrito")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/carrito", routerCarrito)

app.listen(8080, () => console.log("listening"))
const { Router } = require("express")
const router = Router()
const Carrito = require("../model/carrito")

// { id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }

router.post("/", async (req, res) => {
  const { body } = req
  console.log(body)
  await Carrito.crearCarrito(body)
  res.sendStatus(200)
})


router.delete("/:id", (req, res) => res.sendStatus(200))
router.get("/:id/productos", (req, res) => res.sendStatus(200))

// /api/carrito/2/productos
router.post("/:id/productos", async (req, res) => {
  const { id } = req.params
  const { body } = req
  console.log(id, body)
  
  try {
    await Carrito.agregarProducto(id, body)
    // res.status(201).send({
    //   code: 0
    // })

    res.sendStatus(201)
  } catch(e) {
    if (e.message === "no existe") {
      res.sendStatus(404) // HTTP Not Found
    } else {
      console.log(e)
      res.sendStatus(500) // HTTP Internal Server Error
    }
  }
})

router.delete("/:id/productos/:prod", async (req, res) => {
  const { id, prod } = req.params

  await Carrito.borrarProducto(id, prod)

  res.sendStatus(202)
})




module.exports = router
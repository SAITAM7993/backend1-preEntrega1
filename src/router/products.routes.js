import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid'; //para crear identificadores unicos
import { checkProductsFields } from '../middlewares/products/checkProductsFields.middleware.js';
const router = Router();

//Productos
let products = [];

const findPid = (pid) => {
  let index = products.findIndex((product) => product.pid === pid);
  //busco producto por pid, si index devuelve -1 es que no lo encontro
  return index;
};

//Lista productos
router.get('/', (req, res) => {
  res.status(200).json(products);
});

//Agrega producto
router.post('/', checkProductsFields, (req, res) => {
  const product = req.body;

  product.pid = uuidv4();
  product.status = true;

  //   pid:'', **
  //   title:'',
  //   description:'',
  //   code:'',
  //   price:,
  //   status: true, **
  //   stock:,
  //   category:,
  //   thumbnails: [], ***

  products.push(product);

  res.status(201).json({
    status: 'success',
    msg: `Producto creado correctamente`,
    pid: `${product.pid}`,
  });
});

//Modifica producto
router.put('/:pid', (req, res) => {
  const { pid } = req.params;

  //   let dataUser = req.body;

  //   let index = users.findIndex( user => user.email === email );
  //   if(index === -1) return res.status(404).json({ status: "Error", msg: "No se encuentra el usuario" });

  //   users[index] = {
  //     ...users[index], // hacemos una copia completa del mismo usuario
  //     ...dataUser // sobre escribimos la data actualizada que recibimos del body
  //   }
  res.status(201).json(products);
});

//Elimina producto
router.delete('/:pid', (req, res) => {
  const { pid } = req.params;

  //busco producto por pid, si index devuelve -1 es que no lo encontro
  if (findPid(pid) === -1)
    return res.status(404).json({
      status: 'Error',
      msg: `No se encuentra el producto con id ${pid}`,
    });

  //si lo encuentra hago un filter para quitar el pid indicado
  products = products.filter((product) => product.pid !== pid);
  res.status(201).json({
    status: 'success',
    msg: `Producto ${pid} eliminado con éxito`,
  });
});
export default router;

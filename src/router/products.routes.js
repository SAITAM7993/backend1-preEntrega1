import { Router } from 'express';
import productManager from '../managers/product.manager.js';
import { checkProductData } from '../middlewares/products/checkProductData.middleware.js';
const router = Router();

//GET PRODUCTS TODOS Y LIMIT
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    // throw new Error("Error de productos") // Forzamos el error
    res.status(200).json({ status: 'success', products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});

//OBTENER UN PRODUCTO
router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    // const product = await productManager.getProductById(Number(pid)); IMPORTANTE CUANDO USEMOS MONGO DESCOMENTAR ESTA LIN Y BORRAR LA DE ABAJO, al usar uuid no es NUMBER entonces no encuentra productos
    const product = await productManager.getProductById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'Error', msg: 'Producto no encontrado' });

    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Erro', msg: 'Error interno del servidor' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    // const product = await productManager.deleteProduct(Number(pid));IMPORTANTE CUANDO USEMOS MONGO DESCOMENTAR ESTA LIN Y BORRAR LA DE ABAJO
    const product = await productManager.deleteProduct(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'Error', msg: 'Producto no encontrado' });

    res.status(200).json({
      status: 'success',
      msg: `El producto con el id ${pid} fue eliminado`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Erro', msg: 'Error interno del servidor' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    // const product = await productManager.updateProduct(Number(pid), body);IMPORTANTE CUANDO USEMOS MONGO DESCOMENTAR ESTA LIN Y BORRAR LA DE ABAJO
    const product = await productManager.updateProduct(pid, body);
    if (!product)
      return res
        .status(404)
        .json({ status: 'Error', msg: 'Producto no encontrado' });

    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Erro', msg: 'Error interno del servidor' });
  }
});

router.post('/', checkProductData, async (req, res) => {
  try {
    const body = req.body;
    const product = await productManager.addProduct(body);

    res.status(201).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Erro', msg: 'Error interno del servidor' });
  }
});
export default router;

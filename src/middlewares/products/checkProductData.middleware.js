import { request, response } from 'express';
import productManager from '../../managers/product.manager.js';

//reglas de tipo de datos para los campos
const fieldRules = {
  title: 'string',
  description: 'string',
  code: 'string',
  price: 'number',
  stock: 'number',
  category: 'string',
};

//funcion para ver que los tipos de datos esten bien
function matchesFieldType(body, rules) {
  for (let attribute in rules) {
    //recorro los attributos en rules (fieldRules)
    //Si no está el campo va a devolver 'undefined' no debe pasar porque antes chequeamos que vinieran todos los campos
    if (typeof body[attribute] !== rules[attribute]) {
      //Se invalida si encuentra el primer tipo de dato que no coincida
      let error = `Error ${attribute} debe ser ${rules[attribute]}`;
      return error;
    }
  }
}

export const checkProductData = async (req = request, res = response, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body; //desestructuro el producto
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };

    const products = await productManager.getProducts(); //obtengo todos los productos

    const productExists = products.find((p) => p.code === code); // Valida que no se repita el campo de code
    if (productExists)
      return res.status(400).json({
        status: 'Error',
        msg: `El producto con el código ${code} ya existe`,
      });

    const checkData = Object.values(newProduct).includes(undefined); // Valida que los campos obligatorios vengan
    if (checkData)
      return res
        .status(400)
        .json({ status: 'Error', msg: 'Todos los datos son obligatorios' });

    // verifica tipo de datos
    let error = matchesFieldType(req.body, fieldRules);
    if (error)
      return res.status(400).json({
        status: 'Error',
        msg: error,
      });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'Error', msg: 'Error interno del servidor' });
  }
};

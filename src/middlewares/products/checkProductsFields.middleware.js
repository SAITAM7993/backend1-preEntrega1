import { request, response } from 'express';

// const fieldRules = {
//   title: 'string',
//   description: 'string',
//   code: 'string',
//   price: 'number',
//   stock: 'number',
//   category: 'string',
// };
// function matches(body, rules) {
//   // All keys of rules must be present, so we use that to check our body
//   for (let attribute in rules) {
//     // The type of value must be same as our rule
//     // Not present would mean 'undefined'
//     if (typeof body[attribute] !== rules[attribute]) {
//       // We invalidate body as soon as we find our first invalid attribute
//       return false;
//     }
//   }
//   // All checked out, request body is OK
//   return true;
// }
export const checkProductsFields = (req = request, res = response, next) => {
  //chequeo de campos
  // const match = matches(req.body, fieldRules);
  // console.log(match);
  // if (!matches(req.body, fieldRules))
  //   return res.status(400).json({
  //     status: 'Error',
  //     msg: `Todos los campos son requeridos`,
  //   });
  // next();

  //TITLE
  const { title } = req.body;
  if (!title)
    return res.status(400).json({
      status: 'Error',
      msg: `El campo title es requerido`,
    });

  if (typeof title !== 'string')
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo title debe ser string`,
    });

  //DESCRIPTION
  const { description } = req.body;
  if (!description)
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo description obligatorio`,
    });

  if (typeof description !== 'string')
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo description debe ser string`,
    });

  //CODE
  const { code } = req.body;
  if (!code)
    return res
      .status(400)
      .json({ status: 'Error', msg: `Atributo code obligatorio` });
  if (typeof code !== 'string')
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo code debe ser string`,
    });
  //PRICE
  const { price } = req.body;
  if (!price)
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo price obligatorio`,
    });
  if (typeof price !== 'number')
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo price debe ser numeric`,
    });
  //STOCK
  const { stock } = req.body;
  if (!stock)
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo stock obligatorio`,
    });
  if (typeof stock !== 'number')
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo stock debe ser numeric`,
    });

  //CATEGORY
  const { category } = req.body;
  if (!category)
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo category obligatorio`,
    });
  if (typeof category !== 'string')
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo category debe ser string`,
    });
  next();
};

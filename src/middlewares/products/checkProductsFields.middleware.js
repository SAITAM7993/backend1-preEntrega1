import { request, response } from 'express';

export const checkProductsFields = (req = request, res = response, next) => {
  //chequeo de campos

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
      .json({ status: 'Error', code: `P05`, msg: `Atributo code obligatorio` });
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

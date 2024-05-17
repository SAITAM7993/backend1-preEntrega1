import { request, response } from 'express';

export const checkProductUpdate = (req = request, res = response, next) => {
  const { pid } = req.body;
  if (pid)
    return res.status(400).json({
      status: 'Error',
      msg: `Atributo pid no se puede modificar`,
    });
  next();
};

import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import { validateData } from '../services/helper';

const getAll = (req, res, next) => {
  const {
    query = {},
    params: { parseModel },
    models,
  } = req;
  const { [parseModel]: model } = models;

  if (!model) {
    return res.json({});
  }

  return model
    .findMany(query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const getById = (req, res, next) => {
  const {
    query = {},
    params: { parseModel, id },
    models,
  } = req;
  const { [parseModel]: model } = models;
  const { where, ..._query } = query;

  if (!model) {
    return res.json({});
  }

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return model
    .findUnique({ where: { ...where, id }, ..._query })
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const create = (req, res, next) => {
  const {
    body,
    query = {},
    params: { parseModel },
    models,
  } = req;
  const { [parseModel]: model } = models;
  console.log({ model, req });

  return validateData(body)
    .then(() => model.create({ data: body, ...query }))
    .then(validateData)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const update = (req, res, next) => {
  const {
    body,
    params: { parseModel, id },
    models,
  } = req;
  const { [parseModel]: model } = models;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return validateData(body)
    .then(() => model.update({ where: id, data: body }))
    .then(validateData)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const remove = (req, res, next) => {
  const {
    params: { parseModel, id },
    models,
  } = req;
  const { [parseModel]: model } = models;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return model
    .delete({ where: id })
    .then(validateData)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

export { getAll, getById, create, update, remove };

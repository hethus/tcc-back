import enums from '../../lib/enumLib';

const getEnums = (req, res) => {
  res.status(200).json(enums);
};

export { getEnums };

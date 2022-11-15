const mockClass = {
  id: 1,
  name: 'teste',
  subjectName: 'IHC',
  subjectId: 2,
};

const Class = {
  findAndCountAll: () => [mockClass, 1],
  findByPk: (id) => (id === mockClass.id ? mockClass : null),
  findOne: ({ where: { id } }) => (id === mockClass.id ? mockClass : null),
  update: (object, { where: { id } }) => (id === mockClass.id ? object : null),
  create: (object) => (object?.name ? object : null),
  delete: (object, { where: { id } }) => (id === mockClass.id ? object : null),
};

export default Class;

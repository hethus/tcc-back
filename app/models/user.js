const mockUser = {
  id: 1,
  name: 'teste',
  email: 'teste@email.com',
  password: '$2b$10$i7AWThpWs.AJnx2j/EeT0OG8rFHmwBaivP/1VBq6HWLeidNnxhT9.', // teste
  registration: 123456789,
};

const User = {
  findAndCountAll: () => [mockUser, 1],
  findByPk: (id) => (id === mockUser.id ? mockUser : null),
  findOne: ({ where: { email } }) =>
    email === mockUser.email ? mockUser : null,
  update: (object, { where: { email, id } }) =>
    email === mockUser.email || id === mockUser.id ? object : null,
  create: (object) => (object?.email === mockUser.email ? object : null),
  delete: (object, { where: { id } }) => (id === mockUser.id ? object : null),
};

export default User;

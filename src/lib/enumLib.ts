const userType = {
  admin: {
    value: 'admin',
    label: 'Administrador',
    canModify: ['teacher'],
  },
  teacher: { value: 'teacher', label: 'Professor', canModify: ['student'] },
  student: { value: 'student', label: 'Aluno', canModify: [] },
};

export default { userType };

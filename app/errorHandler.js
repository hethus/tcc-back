export default (app) => {
  app.use((e, req, res, next) => {
    const { name, message, code, statusCode = 500 } = e;
    console.log({ name, message, code, statusCode });
    if (statusCode !== 200) {
      return res.status(statusCode).json({ message, code, logout: true });
    }

    return next();
  });
};

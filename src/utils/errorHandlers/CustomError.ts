function CustomError({ message, statusCode, code }) {
  this.name = 'CustomError';
  this.code = code;
  this.statusCode = statusCode;
  this.message = message;
  const error = new Error();
  this.stack = error.stack;

  return this;
}
CustomError.prototype = Object.create(Error.prototype);

export default CustomError;

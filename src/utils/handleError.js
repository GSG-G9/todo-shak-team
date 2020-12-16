module.exports.handleError = ({ status, message, data = null }) => {
  const err = new Error('');
  err.msg = message;
  err.data = data;
  err.status = status;
  return err;
};
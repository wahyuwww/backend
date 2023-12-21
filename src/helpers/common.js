const response = (res, result, message, status, pagination) => {
  const resultRespon = {}
  resultRespon.status = 'success'
  resultRespon.statusCode = 200
  resultRespon.message = message || null
  resultRespon.data = result
  if (pagination) resultRespon.pagination = pagination
  res.status(status).json(resultRespon)
}

module.exports = {
  response
}

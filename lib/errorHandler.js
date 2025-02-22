function errorHandler(err, _req, res, next) {
  console.log(`🤖❌ Something Went Wrong!
    Error: ${err.name}
  `)
  console.log(err.stack)

  if (err.name === 'CastError' || err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not Found' })
  }

  if (
    err.name === 'Unauthorized' ||
    err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError'
  ) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (err.code === 11000) {
    const identifier = Object.keys(err.keyValue)[0]
    return res.status(409).json({ errors: { [identifier]: `That ${identifier} already exists. Please try another one.` } })
  }

  // This next block creates a custom error so 422 msg comes back far clearer. via object looping
  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json({
      message: 'Form Validation Failed', errors: customErrors,
    })
  }
  next(err)
}

export default errorHandler
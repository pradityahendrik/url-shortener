const validateInput = (schema) => {
  return (req, res, next) => {
    // Validate request body
    if (schema.body) {
      const { error: bodyError } = schema.body.validate(req.body);
      if (bodyError) {
        return res.status(400).json({ error: bodyError.details[0].message });
      }
    }

    // Validate request params
    if (schema.params) {
      const { error: paramsError } = schema.params.validate(req.params);
      if (paramsError) {
        return res.status(400).json({ error: paramsError.details[0].message });
      }
    }

    // Validate request query
    if (schema.query) {
      const { error: queryError } = schema.query.validate(req.query);
      if (queryError) {
        return res.status(400).json({ error: queryError.details[0].message });
      }
    }

    next();
  };
}

module.exports = { validateInput };

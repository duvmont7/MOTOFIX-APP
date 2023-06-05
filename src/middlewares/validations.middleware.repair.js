exports.validRepairs = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({
        message: "The name is required🧩",
      });
    }
  
    next();
  };


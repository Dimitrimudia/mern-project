const Product = require('../models/product');
const fs = require('fs');



exports.createThing = (req, res, next) => {
  const productObject = JSON.parse(req.body.product);
  delete productObject._id;
  const product = new Product({
  ...productObject,
  imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  
  product.save().then(
    () => {
      res.status(201).json({
        message: 'Product saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const productObject = req.body.file ?
  {
    ...JSON.parse(req.body.product),
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};
  Product.updateOne({_id: req.params.id}, {...productObject, _id:req.params.id }).then(
    () => {
      res.status(201).json({
        message: 'Product updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Product.findOne({ _id : res.params.id })
    .then(product => {
      const filename = product.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{

        Product.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Product Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );

      });
    })
    .catch(error => res.status(500).json({ error }))
  
};

exports.getAllStuff = (req, res, next) => {
  Product.find().then(
    (products) => {
      res.status(200).json(products);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
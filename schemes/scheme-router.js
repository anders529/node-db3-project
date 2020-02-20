const express = require('express');
const Schemes = require('./scheme-model.js');
const router = express.Router();
router.get('/', (req, res) => {Schemes.find()
  .then(schemes => {res.send(schemes);})
  .catch(error => {res.status(500).send({message:'Failed to get schemes'});
  });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Schemes.findById(id).then(scheme => {
    if (scheme) {res.send(scheme);}
    else {res.status(404).send({message:'Could not find scheme with given id.'})}
  })
  .catch(err => {res.status(500).send({message:'Failed to get schemes'})});
});
router.get('/:id/steps', (req, res) => {
  const {id} = req.params;
  Schemes.findSteps(id).then(steps => {
    if (steps.length) {res.send(steps);}
    else {res.status(404).send({ message: 'Could not find steps for given scheme' })}
  })
  .catch(error => {res.status(500).send({ message: 'Failed to get steps' })});
});
router.post('/', (req, res) => {
  const schemeData = req.body;
  Schemes.add(schemeData)
  .then(scheme => {res.status(201).send(scheme);})
  .catch (error => {res.status(500).send({message:'Failed to create new scheme'});});
});
router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const {id} = req.params;
  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {Schemes.addStep(stepData, id).then(step => {res.status(201).send(step);})}
    else {res.status(404).send({message:'Could not find scheme with given id.'})}
  })
  .catch (error => {res.status(500).send({message:'Failed to create new step'});
  });
});
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  Schemes.findById(id).then(scheme => {
    if (scheme) {Schemes.update(changes, id)
      .then(updatedScheme => { res.send(updatedScheme);
      });}
    else {res.status(404).send({message:'Could not find scheme with given id'});
    }})
  .catch (error => {res.status(500).send({message:'Failed to update scheme'});
  });
});
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Schemes.remove(id).then(deleted => {
    if (deleted) {res.send({removed:deleted});}
    else {res.status(404).send({message:'Could not find scheme with given id'});}
  })
  .catch(err => {res.status(500).send({message:'Failed to delete scheme'});
  });
});
module.exports = router;
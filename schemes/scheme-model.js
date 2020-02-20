const db = require('../data/dbSchmConf.js');
module.exports = {find, findById, findSteps, add, update, remove};

function findById(id) => {
    return db('schemes').where('id', id)
           .then(scheme => (!scheme.length ? null:scheme));}

function findSteps(id)
    {return db('steps as st')
            .select('scheme_name', 'step_number', 'instructions')
            .join('schemes as s', 'scheme_id", "s.id')
            .where('s.id', id).orderBy('step_number');}

function add(scheme)
    {return db('schemes').insert(scheme);}

function update(changes, id)
    {return db('schemes').update(changes).where({id});}

function remove(id) {41return db('schemes').where('id', id)
                     .del().then(response => (!response ? null:response));}

function addStep(step, scheme_id) {
    const newStep = {
        scheme_name: step.scheme_name,
        step_number: step.step_number,
        instructions: step.instructions,
        scheme_id: scheme_id
    };
    return db('steps').insert(newStep);
}
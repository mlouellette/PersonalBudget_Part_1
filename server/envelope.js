const envelopesRouter = require('express').Router();
const Joi = require('joi');

module.exports = envelopesRouter

const { envelopes } = require('./db');

// Retrieve all envelopes in the database
envelopesRouter.get('/', (req, res) => {
    res.send(envelopes);

});

// Retrieve a specific envelope in the database
envelopesRouter.get('/:id', (req, res) => {
    const envelope = envelopes.find(c => c.id === parseInt(req.params.id));
    if (!envelope) return res.status(404).send("envelope not found");

    res.send(envelope);

});


// Create a new envelope object
envelopesRouter.post('/', (req, res) => {
    const { error } = validateEnvelope(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const envelope = {
        id: envelopes.length + 1,
        name: req.body.name,
        price: req.body.price

    }
    envelopes.push(envelope);
    res.send(envelope);

});

envelopesRouter.put('/:id', (req, res) => {
    const envelope = envelopes.find(c => c.id === parseInt(req.params.id));
    if (!envelope) return res.status(404).send("envelope not found");

    const { error } = validateEnvelope(req.body.price);
    if (error) return res.status(404).send(error.details[0].message);

    envelope.name = req.body.name;
    envelope.price = req.body.price;

    res.send(envelope);

});



// Input validation function for schema
function validateEnvelope(envelope) {
    const schema = {
        name: Joi.string().min(3).required(),
        price: Joi.number().required()

    };
    return Joi.validate(envelope, schema);

}
const envelopesRouter = require('express').Router();

module.exports = envelopesRouter

const { envelopes } = require('./db');
    
envelopesRouter.get('/', (req, res) => {
    res.send(envelopes);

});

  



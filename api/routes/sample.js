const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');


//LIST
router.get('/', async (req, res) => {
    try {
        const sample = await Sample.find();
        res.json(sample);
    } catch (err) {
        res.json({ message: err })
    }
})

//GET BY ID
router.get('/:sampleId', async (req, res) => {
    try {
        const sample = await Sample.findById(req.params.sampleId);
        res.json(sample)
    } catch (err) {
        res.json({ message: err })
    }
});

//ADD NEW
router.post('/', async (req, res) => {
    const sample = new Sample({
        title: req.body.title,
        description: req.body.description,
        other: req.body.other
    });
    try {
        const saveSample = await sample.save();
        res.json(saveSample);
    } catch (err) {
        res.json({ message: err })
    }
});

//DELETE
router.delete('/:sampleId', async (req, res) => {
    try {
        const removedSample = await Sample.remove({ _id: req.params.sampleId });
        res.json(removedSample);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH
router.patch('/:sampleId', async (req, res) => {
    try {
        const patchSample = await Sample.updateOne(
            { _id: req.params.sampleId },
            {
                $set: {
                    description: req.body.description,
                    poute: req.body.poute
                }
            });
        res.json(patchSample);
    } catch (err) {
        res.json({ message: err });
    }
});

//Sub
// router.get('/specific', (req, res) => {
//     res.send('specific');
// })

//PENSER A l'indexation de Mongo ainsi que l'agrégation (permet de faire des recherches)

module.exports = router;
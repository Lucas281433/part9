import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewPatientEntry } from '../utils';
import { toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.json(patientsServices.getPatients());
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientsServices.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Someting went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

patientsRouter.get('/:id', (req, res) => {
    const patient = patientsServices.getPatient(req.params.id);

    if (!patient) {
        res.sendStatus(404);
    }

    res.json(patient);
});

patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body); 
        const id = req.params.id;
        const entry = patientsServices.addEntry(newEntry, id);
    
        res.json(entry);
    } catch (error) {
        let errorMessage = 'Someting went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default patientsRouter;

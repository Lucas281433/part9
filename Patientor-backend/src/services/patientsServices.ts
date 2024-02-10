import { Patient, NonSensitivePatient, NewPatientEntry, NewEntry, Entry } from "../types";
import patients from "../../data/dataPatients";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSsnPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {

  const newPatient = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry | undefined => {
  const patient = patients.find(p => p.id === id);

  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient?.entries.push(newEntry);
  
  return newEntry;
};

export default { getPatients, getNonSsnPatients, addPatient, getPatient, addEntry };

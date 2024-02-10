import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../types";
import EntryPatient from "./EntryPatient";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Icon, Typography } from "@mui/material";
import EntryForm from "./EntryForm";
import Togglable, { TogglableRef } from "./Togglable";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import Notification from "./Notification";

const PatientInfo = () => {
  const [entry, setEntry] = useState("");
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [message, setMessage] = useState("");

  const entryFormRef = useRef<TogglableRef>(null);

  const id = useParams().id;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    const fetchDiagnosesList = async () => {
      const diagnosis = await diagnosesService.getAllDiagnoses();
      setDiagnoses(diagnosis);
    };

    void fetchPatient();
    void fetchDiagnosesList();
  }, [id]);

  let genreIcon;
  if (patient?.gender === Gender.Male) {
    genreIcon = <Icon component={MaleIcon} sx={{ fontSize: 40 }} />;
  } else if (patient?.gender === Gender.Female) {
    genreIcon = <Icon component={FemaleIcon} sx={{ fontSize: 40 }} />;
  } else {
    genreIcon = <Icon component={TransgenderIcon} sx={{ fontSize: 40 }} />;
  }

  const handleCancelSelect = () => {
    setEntry("");
  };

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {patient?.name}
        {genreIcon}
      </Typography>

      <Typography variant="body2" color="text.primary">
        ssh: {patient?.ssn}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ marginBottom: 3 }}>
        Occupation: {patient?.occupation}
      </Typography>

      <Notification message={message} />

      <Togglable handleCancelSelect={handleCancelSelect} ref={entryFormRef}>
        <EntryForm
          entry={entry}
          setEntry={setEntry}
          patient={patient}
          setPatient={setPatient}
          setMessage={setMessage}
          entryFormRef={entryFormRef}
          diagnoses={diagnoses}
        />
      </Togglable>

      <Typography variant="h5">Entries</Typography>
      {patient?.entries.map((entry) => (
        <EntryPatient key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientInfo;

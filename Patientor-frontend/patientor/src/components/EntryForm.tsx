import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, Patient } from "../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import React from "react";
import { TogglableRef } from "./Togglable";

interface Props {
  patient: Patient | undefined;
  entry: string;
  setEntry: React.Dispatch<React.SetStateAction<string>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  entryFormRef: React.RefObject<TogglableRef>;
  diagnoses: Diagnosis[];
}

const EntryForm = ({
  patient,
  entry,
  setEntry,
  setPatient,
  setMessage,
  entryFormRef,
  diagnoses
}: Props) => {
  const handleSelect = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setEntry(event.target.value);
  };

  switch (entry) {
    case "HealthCheck":
      return (
        <HealthCheckForm
          patient={patient}
          setPatient={setPatient}
          setMessage={setMessage}
          entryFormRef={entryFormRef}
        />
      );
    case "Hospital":
      return (
        <HospitalForm
          patient={patient}
          setPatient={setPatient}
          setMessage={setMessage}
          entryFormRef={entryFormRef}
          diagnoses={diagnoses}
        />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareForm
          patient={patient}
          setPatient={setPatient}
          setMessage={setMessage}
          entryFormRef={entryFormRef}
          diagnoses={diagnoses}
        />
      );
  }

  return (
    <FormControl fullWidth>
      <InputLabel style={{ marginTop: 6 }}>Type Entry</InputLabel>
      <Select value={entry} onChange={handleSelect}>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default EntryForm;

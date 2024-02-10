import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { NewHealthCheckEntry, Patient } from "../types";
import React, { SyntheticEvent, useState } from "react";
import entriesService from "../services/entries";
import axios from "axios";
import { TogglableRef } from "./Togglable";

interface Props {
  patient: Patient | undefined;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  entryFormRef: React.RefObject<TogglableRef>;
}

const HealthCheckForm = ({
  patient,
  setPatient,
  setMessage,
  entryFormRef,
}: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheck, setHealtCheck] = useState(0);

  const handleHealthCheckChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setHealtCheck(Number(event.target.value));
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entry: NewHealthCheckEntry = {
      date,
      specialist,
      description,
      type: "HealthCheck",
      healthCheckRating: healthCheck,
    };
    try {
      const newEntry = await entriesService.createEntry(entry, patient?.id);
      if (patient && patient.entries) {
        setPatient({ ...patient, entries: [...patient.entries, newEntry] });
      }
      setDate("");
      setSpecialist("");
      setDescription("");
      setHealtCheck(0);

      entryFormRef.current?.handleChangeVisibility();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data);
        setTimeout(() => {
          setMessage("");
        }, 10000);
      }
    }
  };

  return (
    <form onSubmit={addEntry}>
      <Typography variant="h4">New Health Check Entry</Typography>
      <Typography variant="body1" color="text.secondary">Date:</Typography>
      <TextField
        type="date"
        value={date}
        fullWidth
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        value={specialist}
        fullWidth
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Description"
        value={description}
        fullWidth
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
      <Select
        label="Health Check Rating"
        fullWidth
        value={healthCheck.toString()}
        onChange={handleHealthCheckChange}
      >
        <MenuItem value={Number(0)}>Healthy</MenuItem>
        <MenuItem value={Number(1)}>Low Risk</MenuItem>
        <MenuItem value={Number(2)}>High Risk</MenuItem>
        <MenuItem value={Number(3)}>Critical Risk</MenuItem>
      </Select>

      <Grid>
        <Grid item>
          <Button style={{ float: "right" }} variant="contained" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default HealthCheckForm;

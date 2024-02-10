import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewOccupationalHealthcareEntry, Patient } from "../types";
import { TogglableRef } from "./Togglable";
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import entriesService from "../services/entries";
import axios from "axios";

interface Props {
  patient: Patient | undefined;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  entryFormRef: React.RefObject<TogglableRef>;
  diagnoses: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const OccupationalHealthcareForm = ({
  patient,
  setPatient,
  setMessage,
  entryFormRef,
  diagnoses
}: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
        target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(", "): value,);
  };
  //It has to be created to pass the validations in the backend
  const diagnosis = new Object({
    diagnosisCodes: diagnosisCodes,
  }) as Diagnosis["code"][];

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: NewOccupationalHealthcareEntry = {
      date,
      specialist,
      description,
      type: "OccupationalHealthcare",
      diagnosisCodes: diagnosis,
      employerName,
      sickLeave: {
        startDate,
        endDate,
      },
    };
    try {
      const newEntry = await entriesService.createEntry(entry, patient?.id);
      if (patient && patient.entries) {
        setPatient({ ...patient, entries: [...patient.entries, newEntry] });
      }
      setDate("");
      setSpecialist("");
      setDescription("");
      setDiagnosisCodes([]);
      setEmployerName("");
      setStartDate("");
      setEndDate("");

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
      <Typography variant="h4">New Occupational Healthcare Entry</Typography>  
      <Typography variant="body1" color="text.secondary">Date:</Typography>
      <TextField
        value={date}
        fullWidth
        type="date"
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

      <Typography variant="h5">Add Diagnosis Code:</Typography>
      <FormControl  sx={{ m: 1, width: 300 }}>
        <InputLabel>Code</InputLabel>
        <Select 
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Code"/>}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
        >
            {diagnoses ? diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                    <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1}/>
                    <ListItemText primary={d.code} />
                </MenuItem>
            )): null}
        </Select>
      </FormControl>
      <Typography variant="h5">
        Diagnosis Codes: {diagnosisCodes.join(", ")}
      </Typography>

      <TextField
        label="Employer Name"
        value={employerName}
        fullWidth
        onChange={({ target }) => setEmployerName(target.value)}
      />

      <Typography variant="h5">Sick Leave:</Typography>
      <Typography variant="body1" color="text.secondary">Start Date:</Typography>
      <TextField
        value={startDate}
        fullWidth
        type="date"
        onChange={({ target }) => setStartDate(target.value)}
      />
      <Typography variant="body1" color="text.secondary">End Date:</Typography>
      <TextField
        value={endDate}
        fullWidth
        type="date"
        onChange={({ target }) => setEndDate(target.value)}
      />

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

export default OccupationalHealthcareForm;

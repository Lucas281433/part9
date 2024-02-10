import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewHospitalEntry, Patient } from "../types";
import { TogglableRef } from "./Togglable";
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import entriesServices from "../services/entries";
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

const HospitalForm = ({
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
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

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

    const entry: NewHospitalEntry = {
      date,
      specialist,
      description,
      type: "Hospital",
      diagnosisCodes: diagnosis,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
    try {
      const newEntry = await entriesServices.createEntry(entry, patient?.id);
      if (patient && patient.entries) {
        setPatient({ ...patient, entries: [...patient.entries, newEntry] });
      }
      setDate("");
      setSpecialist("");
      setDescription("");
      setDischargeDate("");
      setDischargeCriteria("");

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
      <Typography variant="h4">New Hospital Entry</Typography>
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

      <Typography variant="h5">
        Add Diagnosis Code:
      </Typography>
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
        Diagnosis Code: {diagnosisCodes.join(", ")}
      </Typography>

      <Typography variant="h5">Discharge:</Typography>
      <Typography variant="body1" color="text.secondary">Date:</Typography>
      <TextField
        type="date"
        value={dischargeDate}
        fullWidth
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Criteria"
        value={dischargeCriteria}
        fullWidth
        onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalForm;

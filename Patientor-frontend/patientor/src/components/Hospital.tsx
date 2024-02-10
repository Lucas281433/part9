import {
  Card,
  CardContent,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DescriptionIcon from "@mui/icons-material/Description";
import { HospitalEntry } from "../types";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

interface Props {
  entry: HospitalEntry;
  getDiagnosisName: (code: string) => string;
}

const Hospital = ({ entry, getDiagnosisName }: Props) => {
  return (
    <Paper elevation={6}>
      <Card variant="outlined" style={{ marginTop: 5, marginBottom: 5 }}>
        <CardContent>
          <Typography variant="h6">
            {entry.date}{" "}
            <Icon component={LocalHospitalIcon} sx={{ fontSize: 40 }} />{" "}
          </Typography>
          <Typography variant="h6">Description:</Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 3 }}
          >
            <em>{entry.description}</em>
          </Typography>
          <Typography variant="h6">Diagnoses:</Typography>
          <List>
            {entry.diagnosisCodes?.map((d) => (
              <ListItem key={d}>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                {d} {getDiagnosisName(d)}
              </ListItem>
            ))}
          </List>

          <Typography variant="h6">Discharge:</Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 3 }}
          >
            Date: {entry.discharge.date}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 3 }}
          >
            Criteria: <em>{entry.discharge.criteria}</em>
          </Typography>

          <Typography variant="h6">
            Diagnose By:{" "}
            <Icon component={AssignmentIndIcon} sx={{ fontSize: 40 }} />{" "}
            {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Hospital;

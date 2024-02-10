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
import { OccupationalHealthcareEntry } from "../types";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

interface Props {
  entry: OccupationalHealthcareEntry;
  getDiagnosisName: (code: string) => string;
}

const OccupationalHealthcare = ({ entry, getDiagnosisName }: Props) => {
  return (
    <Paper elevation={6}>
      <Card variant="outlined" style={{ marginTop: 10, marginBottom: 10 }}>
        <CardContent>
          <Typography variant="h6">
            {entry.date}
            <Icon component={WorkIcon} sx={{ fontSize: 40 }} />{" "}
            {entry.employerName}
          </Typography>
          <Typography variant="h6">Description:</Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 3 }}
          >
            <em>{entry.description}</em>
          </Typography>
          {entry.diagnosisCodes ? (
            <div>
              <Typography variant="h6">Diagnoses:</Typography>
              <List>
                {entry.diagnosisCodes?.map((d) => (
                  <ListItem key={d}>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <Typography variant="body2" color="text.primary">
                      {d} {getDiagnosisName(d)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
          {entry.sickLeave ? (
            <div>
              <Typography variant="h6">Sick Leave:</Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ marginLeft: 3 }}
              >
                Start Date: {entry.sickLeave?.startDate}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ marginLeft: 3 }}
              >
                End Date: {entry.sickLeave?.endDate}
              </Typography>
            </div>
          ) : null}

          <Typography variant="h6">
            Diagnose By:
            <Icon component={AssignmentIndIcon} sx={{ fontSize: 40 }} />{" "}
            {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default OccupationalHealthcare;

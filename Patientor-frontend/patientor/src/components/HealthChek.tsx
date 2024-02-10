import { Card, CardContent, Icon, Paper, Typography } from "@mui/material";
import { HealthCheckEntry } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
  const colorOfHeartIcon = () => {
    if (entry.healthCheckRating === 0) {
      return (
        <Icon component={FavoriteIcon} sx={{ color: "green", fontSize: 40 }} />
      );
    } else if (entry.healthCheckRating === 1) {
      return (
        <Icon
          component={FavoriteIcon}
          sx={{ color: "greenyellow", fontSize: 40 }}
        />
      );
    } else if (entry.healthCheckRating === 2) {
      return (
        <Icon component={FavoriteIcon} sx={{ color: "red", fontSize: 40 }} />
      );
    } else if (entry.healthCheckRating === 3) {
      return (
        <Icon component={HeartBrokenIcon} sx={{ color: "red", fontSize: 40 }} />
      );
    }
  };
  return (
    <Paper elevation={6}>
      <Card variant="outlined" style={{ marginTop: 5, marginBottom: 5 }}>
        <CardContent>
          <Typography variant="h6">
            {entry.date}{" "}
            <Icon component={MonitorHeartIcon} sx={{ fontSize: 40 }} />
          </Typography>
          <Typography variant="h6">Description:</Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 3 }}
          >
            <em>{entry.description}</em>
          </Typography>
          <Typography variant="h6">
            Health Check Rating: {colorOfHeartIcon()}
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

export default HealthCheck;

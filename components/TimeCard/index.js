import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { TextField, Autocomplete } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Horizontal from "../Horizontal";
import CustomCard from "../CustomCard";
import styles from "./time.module.css";

export default function LocationCard({ technicians }) {
  return (
    <CustomCard title="Scheduled">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start date"
          slotProps={{
            textField: () => ({ name: "date" }),
          }}
        />
        <Horizontal>
          <TimePicker
            className={styles.timepicker}
            label="Start time"
            slotProps={{
              textField: () => ({ name: "startTime" }),
            }}
          />
          <TimePicker
            className={styles.timepicker}
            label="End time"
            slotProps={{
              textField: () => ({ name: "endTime" }),
            }}
          />
        </Horizontal>
        <Autocomplete
          style={{ flexGrow: 1 }}
          options={technicians}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              name="tech"
              placeholder="Select technician"
              label="Select technitian"
              fullWidth
            />
          )}
        />
      </LocalizationProvider>
    </CustomCard>
  );
}

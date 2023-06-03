import { TextField, Autocomplete } from "@mui/material";

import CustomCard from "../CustomCard";
import Horizontal from "../Horizontal";

export default function JobCard({ jobTypes, jobSources }) {
  return (
    <CustomCard title="Job details">
      <Horizontal>
        <Autocomplete
          style={{ flexGrow: 1 }}
          options={jobTypes}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              name="jobType"
              placeholder="Job type"
              label="Job type"
              fullWidth
            />
          )}
        />
        <Autocomplete
          style={{ flexGrow: 1 }}
          options={jobSources}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              name="jobSource"
              placeholder="Job source"
              label="Job source"
              fullWidth
            />
          )}
        />
      </Horizontal>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        name="jobDescription"
        placeholder="Job description (optional)"
        label="Job description"
      />
    </CustomCard>
  );
}

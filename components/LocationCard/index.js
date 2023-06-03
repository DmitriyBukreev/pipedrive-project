import { TextField } from "@mui/material";

import CustomCard from "../CustomCard";
import Horizontal from "../Horizontal";

export default function LocationCard() {
  return (
    <CustomCard title="Service location">
      <TextField
        required
        label="Address"
        placeholder="Address"
        name="address"
        fullWidth
      />
      <TextField
        required
        label="City"
        placeholder="City"
        name="city"
        fullWidth
      />
      <TextField
        required
        label="State"
        placeholder="State"
        name="state"
        fullWidth
      />
      <Horizontal>
        <TextField
          required
          label="Zip code"
          placeholder="Zip code"
          name="zipCode"
          fullWidth
        />
        <TextField
          required
          label="Area"
          placeholder="Area"
          name="area"
          fullWidth
        />
      </Horizontal>
    </CustomCard>
  );
}

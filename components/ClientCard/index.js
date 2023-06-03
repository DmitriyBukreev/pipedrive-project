import { TextField } from "@mui/material";

import CustomCard from "../CustomCard";
import Horizontal from "../Horizontal";

export default function ClientCard() {
  return (
    <CustomCard title="Client details">
      <Horizontal>
        <TextField
          required
          label="First Name"
          placeholder="First Name"
          name="firstName"
          fullWidth
        />
        <TextField
          required
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          fullWidth
        />
      </Horizontal>
      <TextField
        required
        label="Phone"
        placeholder="Phone"
        name="phone"
        type="tel"
        fullWidth
      />
      <TextField
        label="Email"
        placeholder="Email (optional)"
        name="email"
        type="email"
        fullWidth
      />
    </CustomCard>
  );
}

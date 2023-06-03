import { Alert, AlertTitle } from "@mui/material";

export default function CustomAlert({ state, children }) {
  if (!state) return;

  return (
    <Alert severity={state}>
      <AlertTitle>{state}</AlertTitle>
      {children}
    </Alert>
  );
}

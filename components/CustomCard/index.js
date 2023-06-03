import styles from "./card.module.css";

import { Card, CardHeader, CardContent } from "@mui/material";

export default function CustomCard({ children, title }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent className={styles.customcard}>{children}</CardContent>
    </Card>
  );
}

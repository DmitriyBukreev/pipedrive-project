import { React, useEffect, useState } from "react";

import ClientCard from "../components/ClientCard";
import JobCard from "../components/JobCard";
import LocationCard from "../components/LocationCard";
import TimeCard from "../components/TimeCard";
import CustomAlert from "../components/CustomAlert";

import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";
import ApiClient from "../components/utils/api";

import styles from "./index.module.css";

import { Button, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  let _window;
  const [api, setApi] = useState({});
  const [persons, setPersons] = useState([]);
  const [alert, setAlert] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const sdk = new AppExtensionsSDK();
      await sdk.initialize({
        size: { height: 1000, width: 1000 },
      });

      const apiClient = new ApiClient(sdk);

      const persons = await apiClient.getPersons();
      _window = window;
      setApi(apiClient);
      setPersons(persons);
    };

    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (result[key] = value));
    try {
      const response = await api.postDeal(JSON.stringify(result));
      setAlert("success");
      setMessage([
        `Created deal available at: `,
        <a href={response.deal_url}>{response.deal_url}</a>,
      ]);
    } catch {
      setAlert("error");
      setMessage("Failed to create deal");
    }
  };

  return (
    <div>
      <CssBaseline />

      <form id="form" method="post" onSubmit={submitHandler}>
        <div className={styles["form-layout"]}>
          <ClientCard />
          <JobCard
            jobTypes={["Plumbing", "Cleaning", "Other"]}
            jobSources={["Household", "Company"]}
          />
          <LocationCard />
          <TimeCard technicians={persons} />
        </div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="submit"
            color="success"
            size="large"
          >
            Submit
          </Button>
        </Box>
        <CustomAlert state={alert}>{message}</CustomAlert>
      </form>
    </div>
  );
}

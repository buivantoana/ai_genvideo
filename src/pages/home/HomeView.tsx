import { Box } from "@mui/material";
import React from "react";
import ProjectList from "./ProjectList";

type Props = {};

const HomeView = (props: Props) => {
  return (
    <Box p={3}>
      <ProjectList />
    </Box>
  );
};

export default HomeView;

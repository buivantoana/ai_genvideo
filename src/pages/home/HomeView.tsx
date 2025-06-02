import { Box } from "@mui/material";
import React, { useState } from "react";
import ProjectList from "./ProjectList";

type Props = {};

const HomeView = ({ project }: any) => {
  return (
    <Box p={3}>
      <ProjectList project={project} />
    </Box>
  );
};

export default HomeView;

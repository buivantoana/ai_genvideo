import React, { useEffect, useState } from "react";
import ProjectManagerView from "./ProjectManagerView";
import Loading from "../../components/Loading";
import { gatAllProject, getAllFunctions } from "../../service/project";

type Props = {};

const ProjectManagerController = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [functions, setFunctions] = useState([]);
  useEffect(() => {
    getAll();
    getFunctions();
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      let result: any = await gatAllProject();
      if (result && result.length > 0) {
        setProject(result);
      }
    } catch (error) {}
    setLoading(false);
  };
  const getFunctions = async () => {
    setLoading(true);
    try {
      let result: any = await getAllFunctions();
      if (result && result.length > 0) {
        setFunctions(result);
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <ProjectManagerView
        project={project}
        setLoading={setLoading}
        getAll={getAll}
        functions={functions}
      />
    </>
  );
};

export default ProjectManagerController;

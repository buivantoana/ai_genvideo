import React, { useEffect, useState } from "react";
import HomeView from "./HomeView";
import Loading from "../../components/Loading";
import { gatAllProject } from "../../service/project";

type Props = {};

const HomeController = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  useEffect(() => {
    getAll();
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
  return (
    <>
      {loading && <Loading />}
      <HomeView project={project} />
    </>
  );
};

export default HomeController;

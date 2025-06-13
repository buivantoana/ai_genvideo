import React, { useEffect, useState } from "react";
import IdeaView from "./IdeaView";
import Loading from "../../components/Loading";
import { getScriptModels } from "../../service/project";

type Props = {};

const IdeaController = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState([]);
  useEffect(() => {
    getScript();
  }, []);
  const getScript = async () => {
    try {
      let result = await getScriptModels();
      if (result && result.length) {
        setModel(
          result.map((item) => {
            return {
              value: item.name,
              key: item.id,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <IdeaView setLoading={setLoading} modelList={model} />
    </>
  );
};

export default IdeaController;

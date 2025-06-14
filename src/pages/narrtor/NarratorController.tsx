import React, { useEffect, useState } from "react";
import NarratorView from "./NarratorView";
import { getVoiceModels } from "../../service/project";
import { useLocation } from "react-router-dom";

type Props = {};

const NarratorController = (props: Props) => {
  const [model, setModel] = useState([]);
  const [genScript, setGenScript] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getModels();
  }, []);
  const getModels = async () => {
    try {
      let result = await getVoiceModels();
      console.log("result", result);
      if (result && result.length) {
        setModel(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let script: any = localStorage.getItem("gen_script");
    if (script) {
      script = JSON.parse(script);
      if (script.script && id) {
        setGenScript(script);
        // genScriptFun();
      } else {
      }
    }
  }, [id]);
  return <NarratorView model={model} genScript={genScript} />;
};

export default NarratorController;

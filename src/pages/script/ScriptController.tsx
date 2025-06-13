import React, { useEffect, useState } from "react";
import ScriptView from "./ScriptView";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";
import { genScriptProject, getScriptModels } from "../../service/project";
import { toast } from "react-toastify";

type Props = {};

const ScriptController = (props: Props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [loading, setLoading] = useState(false);
  const [genScript, setGenScript] = useState(null);
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
  useEffect(() => {
    let script: any = localStorage.getItem("gen_script");
    if (script) {
      script = JSON.parse(script);
      if (script.script && id) {
        setGenScript(script);
      }
    }
  }, [id]);
  const genScriptFun = async () => {
    setLoading(true);
    try {
      let result = await genScriptProject(id);
      if (result) {
        let script: any = localStorage.getItem("gen_script");
        if (script) {
          script = JSON.parse(script);
          script.script = result;
          setGenScript(script);
          localStorage.setItem("gen_script", JSON.stringify(script));
        }
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log(genScript);
  return (
    <>
      {loading && <Loading />}
      <ScriptView
        script={genScript}
        id={id}
        genScriptFun={genScriptFun}
        setLoading={setLoading}
        modelList={model}
      />
    </>
  );
};

export default ScriptController;

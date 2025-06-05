import React, { useEffect, useState } from "react";
import CreateVideoView from "./CreateVideoView";
import { useLocation } from "react-router-dom";
import { genScriptPromt } from "../../service/project";
import { toast } from "react-toastify";

type Props = {};

const CreateVideoController = (props: Props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [loading, setLoading] = useState(false);
  const [genScript, setGenScript] = useState(null);
  useEffect(() => {
    let script: any = localStorage.getItem("gen_script");
    if (script) {
      script = JSON.parse(script);
      if (!script.prompts && id) {
        genScriptFun();
      } else {
        setGenScript(script);
      }
    }
  }, [id]);
  const genScriptFun = async () => {
    setLoading(true);
    try {
      let result = await genScriptPromt(id);
      if (result) {
        let script: any = localStorage.getItem("gen_script");
        if (script) {
          script = JSON.parse(script);
          script.prompts = result;
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
  return <CreateVideoView genScript={genScript} setLoading={setLoading} />;
};

export default CreateVideoController;

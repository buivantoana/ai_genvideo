import React, { useEffect, useState } from "react";
import SuccessView from "./SuccessView";
import { useLocation } from "react-router-dom";

type Props = {};

const SuccessController = (props: Props) => {
  const [model, setModel] = useState([]);
  const [genScript, setGenScript] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

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
  return <SuccessView genScript={genScript} />;
};

export default SuccessController;

import React, { useEffect, useState } from "react";
import SuccessView from "./SuccessView";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

type Props = {};

const SuccessController = (props: Props) => {
  const [model, setModel] = useState([]);
  const [genScript, setGenScript] = useState(null);
  const [loading, setLoading] = useState(false);
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
  return (
    <>
      {loading && <Loading />}
      <SuccessView setLoading={setLoading} genScript={genScript} />
    </>
  );
};

export default SuccessController;

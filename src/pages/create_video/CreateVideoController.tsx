import React, { useEffect, useState } from "react";
import CreateVideoView from "./CreateVideoView";
import { useLocation } from "react-router-dom";
import { genScriptPromt, getVideoModels } from "../../service/project";
import { toast } from "react-toastify";

type Props = {};

const CreateVideoController = (props: Props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [loading, setLoading] = useState(false);
  const [genScript, setGenScript] = useState(null);
  const [model, setModel] = useState([]);
  useEffect(() => {
    getModels();
  }, []);
  const getModels = async () => {
    try {
      let result = await getVideoModels();
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
        let prompt = script.script.scenes.map((item) => {
          return {
            ...item,
            video: {
              ...item.video,
              ids: item.video?.id ? [item.video?.id] : null,
              imageUrls: item.video?.url ? [item.video?.url] : null,
              selected: 0,
            },
          };
        });
        script.script.scenes = prompt;
        setGenScript(script);
        // genScriptFun();
      } else {
      }
    }
  }, [id]);
  // const genScriptFun = async () => {
  //   setLoading(true);
  //   try {
  //     let result = await genScriptPromt(id);
  //     if (result) {
  //       let script: any = localStorage.getItem("gen_script");
  //       if (script) {
  //         script = JSON.parse(script);
  //         script.prompts = result;
  //         setGenScript(script);
  //         localStorage.setItem("gen_script", JSON.stringify(script));
  //       }
  //     } else {
  //       toast.warning(result.detail);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };
  return (
    <CreateVideoView
      genScript={genScript}
      modelList={model}
      setLoading={setLoading}
      id={id}
    />
  );
};

export default CreateVideoController;

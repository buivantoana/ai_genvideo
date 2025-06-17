import React, { useEffect, useState } from "react";
import CreateImageView from "./CreateImageView";
import { useLocation } from "react-router-dom";
import { genScriptPromt, getImageModels } from "../../service/project";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

type Props = {};

const CreateImageController = (props: Props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [loading, setLoading] = useState(false);
  const [genScript, setGenScript] = useState(null);
  const [model, setModel] = useState([]);
  const [modelAdd, setModelAdd] = useState([]);
  useEffect(() => {
    getModels();
  }, []);
  const getModels = async () => {
    try {
      let result = await getImageModels();
      if (result && result.length) {
        const uniqueBySubType: any = Array.from(
          new Map(
            result.map((item) => [
              item.sub_type,
              {
                value:
                  item.sub_type.charAt(0).toUpperCase() +
                  item.sub_type.slice(1),
                key: item.sub_type,
              },
            ])
          ).values()
        );
        setModelAdd(uniqueBySubType);
        setModel(
          result.map((item) => {
            return {
              value: item.name,
              key: item.name,
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
            image: {
              ...item.image,
              ids: item.image?.id ? [item.image?.id] : null,
              imageUrls: item.image?.url ? [item.image?.url] : null,
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
  console.log("mo", modelAdd);
  return (
    <>
      {loading && <Loading />}
      <CreateImageView
        genScript={genScript}
        setLoading={setLoading}
        id={id}
        modelList={model}
        modelAdd={modelAdd}
        getModels={getModels}
        setModelList={setModel}
        setModelAdd={setModelAdd}
      />
      ;
    </>
  );
};

export default CreateImageController;

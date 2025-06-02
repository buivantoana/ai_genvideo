import React, { useState } from "react";
import IdeaView from "./IdeaView";
import Loading from "../../components/Loading";

type Props = {};

const IdeaController = (props: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <IdeaView setLoading={setLoading} />
    </>
  );
};

export default IdeaController;

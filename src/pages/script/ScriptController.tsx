import React, { useState } from 'react'
import ScriptView from './ScriptView'
import Loading from '../../components/Loading';

type Props = {}

const ScriptController = (props: Props) => {
  const [loading,setLoading] = useState(false)
  let script = localStorage.getItem("gen_script");
  if(script){
    script = JSON.parse(script)
  }
  return (
    <>
      {loading && <Loading />}
    <ScriptView script={script} setLoading={setLoading} />
    </>
  )
}

export default ScriptController
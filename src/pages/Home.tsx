import React from 'react'
import useAuthPriorities from '../hooks/useAuthPriorities'

type Props = {}

const Home = (props: Props) => {

  const {voltaComments} = useAuthPriorities();

  const handleVolta = ()=>{
    voltaComments();
  }
  
  return (
    <div>
      <button onClick={handleVolta}>Volta comments</button>
    </div>
  )
}

export default Home
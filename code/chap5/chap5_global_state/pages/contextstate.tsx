import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import countContext from '../comp/context/countContext';

const Home: NextPage = ({ initialCount = 0 } : any) => {

const {count, setCount} = useContext(countContext);

  return (
    <div>
        count in component is : {count}
        <br/>
      <button
        onClick={() => setCount(count+1)}>
            Increment +
      </button>

      <br/>
      <button
        onClick={() => setCount(count-1)}>
            Decrement +
      </button>

    </div>
  )
}

export default Home

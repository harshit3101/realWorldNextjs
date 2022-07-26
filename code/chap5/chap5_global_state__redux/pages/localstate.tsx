import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = ({ initialCount = 0 } : any) => {

const [count, setCount] = useState(initialCount);

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

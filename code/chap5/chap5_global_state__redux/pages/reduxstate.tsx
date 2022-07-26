import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../lib/redux/selectors/selector';


const Home: NextPage = ({ initialCount = 0 } : any) => {
  const disPatcher= useDispatch();
  const {count} = useStoreSelector();

  return (
    <div>
        count in component is {count} :
        <br/>
      <button
        onClick={() => disPatcher({type: 'INCREMENT'})}>
            Increment +
      </button>

      <br/>
      <button
        onClick={() => disPatcher({type: 'DECREMENT'})}>
            Decrement +
      </button>

    </div>
  )
}

export default Home

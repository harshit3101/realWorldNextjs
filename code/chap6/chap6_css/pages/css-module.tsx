import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../lib/redux/selectors/selector';
import styles from '../styles/ex.module.css';


const Home: NextPage = ({ initialCount = 0 } : any) => {
  const disPatcher= useDispatch();
  const {count, global} = useStoreSelector();

  return (
    <>
        <div className={global?'custom':styles.custom}>
            count in component is {count} 
            <br/>
        </div>
        <button className='incr-btn'
            onClick={() => disPatcher({type: 'INCREMENT'})}>
                Increment +
        </button>

        <br/>
        <button className='decr-btn'
            onClick={() => disPatcher({type: 'DECREMENT'})}>
                Decrement +
        </button>

        <br/>
        <button
            onClick={() => disPatcher({ type: 'GLOBAL_CSS', payload: !global})}>
               Switch css
        </button>
      
       
    </>
    )
}

export default Home

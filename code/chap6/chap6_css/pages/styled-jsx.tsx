import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../lib/redux/selectors/selector';


const Home: NextPage = ({ initialCount = 0 } : any) => {
  const disPatcher= useDispatch();
  const {count, global} = useStoreSelector();

  return (
    <>
        <div className='custom'>
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
      
       {!global && 
          <style>{
            `
            .custom {
                background: green;
                color: pink;
            }
            `
          }</style> 
        }
    </>
    )
}

export default Home

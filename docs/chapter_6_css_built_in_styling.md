### Chapter 6: CSS and Built-In Styling Methods

- Three different built-in styling methods (Supported out of the box in Next.js)
  - Styled JSX. 
  - CSS modules.
  - How to integrate the SASS preprocessor. (Need to install dependency using ``yarn add sass``)

##### Styled JSX

- Component scoped styling. Added in js. (Same class name for different components)
- Can be made global using ``<style jsx global>``. All components under the component which has this styled applied will be able to access the css classes.

```
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
```

> Problem with this is, it is rendered twice. Once at server and once at client side.

##### Module css

- Create separate plain CSS file ending with ``.module.css``  and write css classes. 
- Import it in the component required and use like below

```
import styles from '../styles/Home.module.css';
export default function Home() {
  return (
    <div className={styles.homepage}>
      <h1> Welcome to the CSS Modules example </h1>
    </div>
  );
}
```

> If we want to have global rules, then we define them in ``styles/globals.css`` file and import it into our ``pages/_app.js`` file.

##### SASS Integration

- CSS preprocessor, similar syntax with css. 
- Extra properties like @extend, @if etc. to define and create dynamic css properties.
- Any css files can be converted by renaming it from ``something.module.css`` to ``something.module.scss`

```

.something {
    background: brown;
}

.custom {
    @extend .something;
    color: pink;
}
```

> Checkout code examples under ``code`` package.
Run using yarn dev
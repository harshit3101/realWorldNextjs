import Link from 'next/link';
import { useStoreSelector } from '../lib/redux/selectors/selector';


export default function Header(props: any) {

    const {count} = useStoreSelector();

    
    return (
        <>
            <div > count in Header is {count}</div>
            <Link  href='/reduxstate'>  
                <button>
                    Go TO Redux State
                </button>
            </Link>
            <Link href='/styled-jsx'>
                <button>
                    Go TO Styled JSX
                </button>
            </Link>
            <Link href='/css-module'>
                <button>
                    Go TO css module
                </button>
            </Link>
            <Link href='/scss-module'>
                <button>
                    Go TO scss module
                </button>
            </Link>
        </>
    );
}
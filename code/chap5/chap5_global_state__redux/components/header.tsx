import { useStoreSelector } from "../lib/redux/selectors/selector";



export default function Header(props: any) {

    const {count} = useStoreSelector();

    
    return <div> count in Header is {count}</div>;
}
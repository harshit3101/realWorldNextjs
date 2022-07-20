import { useEffect, useState } from "react";

function IndexPage() {
  
    let [isBrowser, setIsBrower] = useState(process.browser);
    let [time, setTime] = useState(new Date().getTime());
    
    useEffect(()=> {
        setIsBrower(process.browser);
        setTime(new Date().getTime());
    })

    const side = isBrowser ? 'client' : 'server';
  
    return <div>You are currently on the {side}-side and time is {time} </div>;
  
}
  
export default IndexPage;
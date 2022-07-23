import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";


function IndexPage() {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {
        setLoading(true);

        setTimeout(() => {
            axios.get(`${process.env.NEXT_PUBLIC_ADVICE_SLIP_ENDPOINT}`)
            .then(res => {setData(res.data);setLoading(false);})
        }, 1000);
    }, []);

    if(loading) {
        return (
            <>
            <div> Client Side</div>
            <div> Loading...</div>
            </>
        );
    } else {
        return (
            <>
             <div> Client Side</div>
             <div >Advice id: : {data?.slip.id}</div>
             <div >Advice fetched : {data?.slip.advice}</div>
            </>
         );
    }
}
export default IndexPage;
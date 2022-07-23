import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(params:any) {
    const {id} = params.query;

    return {
        props: {
            id
        }
    }
}

function IndexPage({id} : any) {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {
        setLoading(true);
        setTimeout(() => {
            axios.get(`https://api.adviceslip.com/advice/${id}`)
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
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps() {
    const res = await axios.get('https://api.adviceslip.com/advice');

    return {
        props: {
            advice: res.data
        }
    }
}

function IndexPage(props: any) {
    let {slip} = props.advice;
    return (
       <>
       <div> Server Side</div>
        <div >Advice id: : {slip.id}</div>
        <div >Advice fetched : {slip.advice}</div>
       </>
    );
}
export default IndexPage;
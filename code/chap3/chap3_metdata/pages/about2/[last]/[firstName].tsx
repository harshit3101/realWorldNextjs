import Head from "next/head";
import { useRouter } from "next/router";


function IndexPage() {

    const {query} = useRouter();

    return (
        <>
          <Head>
            <title> About2 name dynamic </title>
         </Head>
         
         <div >You are {query.firstName} {query.last}.</div>;
        </>
     ); 
  
}
  
export default IndexPage;
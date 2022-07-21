import Head from "next/head";
import { useContext } from "react";
import dataContext from "../../components/dataContext";

function IndexPage() {

   const {data} = useContext(dataContext);
  
    return (
       <>
         <Head>
        <title> About index </title>
        </Head>
        
        <div >You are Harshit.</div>

        <div> {data} from Context</div>
       </>
    );
  
}
  
export default IndexPage;



/**
 * 

<Head>

      <title> {props.title} </title>

      <meta name="description" content={props.subtitle} />

      //{ open-graph meta }

      <meta property="og:title" content={props.title} />

      <meta property="og:description"

       content={props.subtitle} />

      <meta property="og:image" content={props.image} />

      //{ twitter card meta }

      <meta name="twitter:card" content="summary" />

      <meta name="twitter:title" content={props.title} />

      <meta name="twitter:description"

       content={props.description} />

      <meta name="twitter:image" content={props.image} />

    </Head>

 */

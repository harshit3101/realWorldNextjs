import Head from "next/head";


export async function getServerSideProps(input: any) {
    // const name = params.name;

    const {name} = input.params;

    return {
        props: {
            name
        }
    };
}


function IndexPage(props: any) {

    return (
        <>
          <Head>
         <title> About name dynamic </title>
         </Head>
         
         <div >You are {props.name}.</div>;
        </>
     );
  
}
  
export default IndexPage;
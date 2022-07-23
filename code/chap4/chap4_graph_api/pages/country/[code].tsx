import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "../../lib/apollo/queries";


export async function getServerSideProps(input: any){
    const {code} = input.params;

    return {
        props: {
            code
        }
    };
}

function IndexPage(props: any) {

  const {loading, data} = useQuery(GET_COUNTRY_BY_CODE, {
    fetchPolicy: 'no-cache',
    variables: {
        code: props.code
    }
  })

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
         <div >Country data : {JSON.stringify(data)} </div>
        </>
     );
}
    
}
export default IndexPage;
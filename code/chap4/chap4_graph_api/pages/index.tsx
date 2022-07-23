import { useQuery } from "@apollo/client";
import { GET_COUNTRY_INDIA } from "../lib/apollo/queries";

function IndexPage() {
  const {loading, data} = useQuery(GET_COUNTRY_INDIA, {
    fetchPolicy: 'no-cache'
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
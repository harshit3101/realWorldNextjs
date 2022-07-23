import { useQuery } from "@apollo/client";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { GET_COUNTRY_CODES } from "../lib/apollo/queries";


function IndexPage() {

  const {loading, data} = useQuery(GET_COUNTRY_CODES, {
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
         <div >Country CODES :</div>
         <div>
            {
            data.countries.map((item: { name: string, code: string }) => 
                <><div>Name: {item.name}</div><div>Code: {item.code}</div></>
            )
            }
         </div>
        </>
     );
}
    
}
export default IndexPage;
import { useRouter } from "next/router";


function IndexPage() {

    const {query} = useRouter();
  
    return <div >You are {query.firstName} {query.last}.</div>;
  
}
  
export default IndexPage;
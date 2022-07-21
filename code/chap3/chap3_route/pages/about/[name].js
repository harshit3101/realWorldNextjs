export async function getServerSideProps({params}) {
    // const name = params.name;

    const {name} = params;

    return {
        props: {
            name
        }
    };
}


function IndexPage(props) {
  
    return <div >You are {props.name}.</div>;
  
}
  
export default IndexPage;
export async function getServerSideProps() {
    let time = new Date().getTime();
  
    return {
      props: {
        browser: false,
        time: time
      }
    }
  }
  
  function IndexPage(props) {
  
    const side = props.browser ? 'client' : 'server';
  
    return <div>You are currently on the {side}-side and time is {props.time} </div>;
  
  }
  
  export default IndexPage;
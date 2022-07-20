function IndexPage() {

  const side = process.browser ? 'client' : 'server';

  return <div >You are currently on the {side}-side.</div>;

}

export default IndexPage;
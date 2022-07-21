import Link from "next/link";

function IndexPage() {


  return (
    <>
     <div >
      Welcome Harshit to Chapter 3
    </div>
    <br/>
    <div>
      <a href='/about'> About_emp_0_using a</a>
      <Link href='/about'>About_emp_1</Link>
      <br/>
      <Link href='/about/Harshit'>About_dynamic_emp_1</Link>
      <br/>
      <Link href='/about2/Garg/Harshit'>About2_dynamic_emp_1</Link>
      <br/>
      <Link href='/about2/Branson/Richard'>About2_dynamic_emp_2</Link>
      <br/>
      <Link href={{
        pathname: '/about2/[last]/[first]',
        query:{
          last: 'Dhoni',
          first: 'MS'
        }
      }}>About2_dynamic_emp_3</Link>
    </div>
    </>
  );

}

export default IndexPage;
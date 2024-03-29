import Head from 'next/head'
import AddUser from '../components/AddUser'
import Login from '../components/Login';
import Navbar from '../components/Navbar'
import { getSession} from "next-auth/react";

export default function Home({session}) {
  if(!session) {return <Login/>}
  else{
  return (
    <div >
      <Head>
        <title>User Management App</title>
      </Head>
      <Navbar/>
      <main>
       <AddUser/>
      </main>
    </div>
  )
  }
}


export async function getServiceSideProps(context) {
      
  const session = await getSession(context);
  return {
    props : { session },
  };

}

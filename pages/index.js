import Head from "next/head";
import Header from "../components/header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/client";
export default function Home({ session }) {
  if (!session) return <Login sessions={session} />;

  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header sessions={session} />

      <Sidebar sessions={session} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

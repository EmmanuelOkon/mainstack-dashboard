import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mainstack Dashboard</title>
        <meta name="keywords" content="dashboard"></meta>
      </Head>
      <div>
        <h1 className="text-2xl">Homepage</h1>
        <p className="text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non
          quis exercitationem culpa nesciunt nihil aut nostrum explicabo
          reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
          Voluptatum ducimus voluptates voluptas?
        </p>
        <p className="text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non
          quis exercitationem culpa nesciunt nihil aut nostrum explicabo
          reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
          Voluptatum ducimus voluptates voluptas?
        </p>
      </div>
    </>
  );
}

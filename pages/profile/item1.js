import Head from "next/head";
import SecondChart from "../../components/Second.js";
export default function Item1() {
  <>
    <Head>
      <title>Item 1</title>
      <meta name="keywords" content="item1"></meta>
    </Head>
    <div>
      <div className="flex flex-col">
        <div className="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="py-2 align-middle inline-block min-w-full px-2">
            <SecondChart />
          </div>
        </div>
      </div>
    </div>
  </>;
}

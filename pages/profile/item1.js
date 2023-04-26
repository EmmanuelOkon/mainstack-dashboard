import Head from "next/head";
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
            This is Item 2
          </div>
        </div>
      </div>
    </div>
  </>;
}

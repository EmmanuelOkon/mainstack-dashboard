import Head from "next/head";

export default function Item3() {
  return (
    <>
      <Head>
        <title>Item 3</title>
        <meta name="keywords" content="item3"></meta>
      </Head>
      <>
        <div className="flex flex-col">
          <div className="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div className="py-2 align-middle inline-block min-w-full px-2">
              This is Item 3
            </div>
          </div>
        </div>
      </>
    </>
  );
}

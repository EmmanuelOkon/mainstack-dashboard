import Head from "next/head";

export default function Item7({ location }) {
  return (
    <>
      <Head>
        <title>Item 7</title>
        <meta name="keywords" content="item7"></meta>
      </Head>
      <DashboardLayout pathname={location.pathname}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              Item 7
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
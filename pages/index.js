import client from '../src/apollo/client';
import { HOME_QUERY } from '../src/queries/home-query';
import Layout from '../src/components/layout';
import Head from 'next/head';


export default function Home({ data }) {
  // console.warn(data.homeBlocks.homeBlocks);
  // const blocksData = Array.from(JSON.parse(data.homeBlocks.homeBlocks))

  // blocksData.map((item) => {
  //   console.warn(item.attributes.data);
    
  // })

  return (
    <>
    <Layout data={data}></Layout>    
    <Head>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />
    </Head>
    </>
  )
}

export async function getStaticProps(context){
  // Here we make a call with the client and pass in our query string to the 
  // configuration objects 'query' property
  const { loading, error, data } = await client.query({
    query: HOME_QUERY
  });
  // Once we get the response back, we need to traverse it to pull out the 
  // data we want to pass into the HomePage
  const headerLayout = data?.headerLayout; 
  const themeOptions = data?.themeOptions; 
  const headerMenus = data?.headerMenus?.edges; 
  const footerMenus = data?.footerMenus?.edges; 
  const footerBottomMenus = data?.footerBottomMenus?.edges;
  const homeBlocks =  data?.page?.blocks;
  const pageTitle = data?.page?.title;
  const uri = data?.page?.uri;
	const seo = data?.page?.seo;

  return {
    props: {
      data: {        
        headerLayout: {
          headerLayout
        },
        logos: {
          themeOptions
        },
        pageTitle: {
					pageTitle,
					uri
				},
				seo,
        homeBlocks: {
          homeBlocks
        },
        menus: {
          headerMenus,
          footerMenus,
          footerBottomMenus
        }
      }
    },
    revalidate: 10,
  }
}

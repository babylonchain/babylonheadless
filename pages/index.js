import client from '../src/apollo/client';
import { HOME_QUERY } from '../src/queries/home-query';
import Layout from '../src/components/layout';


export default function Home({ data }) {
  // console.warn(data.homeBlocks.homeBlocks);
  // const blocksData = Array.from(JSON.parse(data.homeBlocks.homeBlocks))

  // blocksData.map((item) => {
  //   console.warn(item.attributes.data);
    
  // })

  console.log('data', data)
 
  return (
    <Layout data={data}></Layout>    
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

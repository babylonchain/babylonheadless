import Link from 'next/link';
import client from '../src/apollo/client';
import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import {GET_MENUS} from '../src/queries/get-menus';
import { Container } from 'react-bootstrap';

function Error404( {data} ) {
	const {header, footer, headerMenus, footerMenus} = data || {};
	return (
		<>
         <Header
                headerType={data?.headerLayout?.headerLayout?.headerLayout?.chooseHeaderType}
                headerLogos={data?.logos?.themeOptions?.themeSettings}
                headerMenus={data?.menus?.headerMenus}>
            </Header>
			{/* <Header header={header} headerMenus={headerMenus?.edges}/> */}
				<section className="section error-404 p-large">
					<Container>
						<div
							className="page-content text-center">
							<h1 className='h2'>
                            Oops! That page can’t be found.
							</h1>
                            <p>It looks like nothing was found at this location. Maybe try different link.</p>
							<div className="flex justify-center mt-5">
								<Link href="/">
									<a className='btn btn-secondary btn-lg'>Back to Home page</a>
								</Link>
							</div>
						</div>
					</Container>
				</section>
			<Footer 
                footerSetting={data?.logos?.themeOptions?.themeSettings} 
                footerMenus={data?.menus?.footerMenus} 
                footerBottomMenu={data?.menus?.footerBottomMenus}>                
            </Footer>
		</>
	);
}

export default Error404;

export async function getStaticProps() {

	const {data} = await client.query( {
		query: GET_MENUS,
	} );

    const headerLayout = data?.headerLayout; 
	const themeOptions = data?.themeOptions; 
	const headerMenus = data?.headerMenus?.edges; 
	const footerMenus = data?.footerMenus?.edges; 
	const footerBottomMenus = data?.footerBottomMenus?.edges;


    const defaultProps = {
		props: {
			data: {        
				headerLayout: {
					headerLayout
				},
				logos: {
					themeOptions
				},
							
				menus: {
					headerMenus,
					footerMenus,
					footerBottomMenus
				}	
			}
		},
		/**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
		revalidate: 1,
	};

	return defaultProps;
}
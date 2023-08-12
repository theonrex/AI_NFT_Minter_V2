import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from '../../components';
import Link from 'next/link';
import styles from './styles.module.css';


const Error: NextPage = () => {
	return (
		<AppLayout>
			<div className={`container md:px-16 lg:px-28 ${styles["container"]}`}>
				<Head>
					<title>Page not found</title>
				</Head>
				<section className={`${styles["error-container"]} flex flex-col items-center justify-center h-96`}>
					<h3 className="">Page not found!</h3>

					<div className="mt-10">
						Go back <Link href="/">home</Link>
					</div>
				</section>
			</div>
		</AppLayout>
	);
};

export default Error;

import Head from "next/head";

import "../styles/globals.css";
import "../styles/phoneStyles.scss";
import "../styles/style.scss";

import { ThemeProvider } from "../components/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Hot search Việt</title>
				<link rel="icon" href="/icons/small_logo.svg" />
				<meta
					name="description"
					content="Website thống kê lượng tìm kiếm ở Việt Nam"
				/>
				<meta property="fb:app_id" content="174600884477732" />
				<meta name="keywords" content="Hot search Việt Nam"/>
				<script
					async
					defer
					crossorigin="anonymous"
					src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=174600884477732&autoLogAppEvents=1"
					nonce="jca3O8A5"
				></script>
			</Head>

			<ThemeProvider>
				<div id="app-root" className="App light-theme">
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</div>
			</ThemeProvider>
		</>
	);
}

export default MyApp;

import Script from "next/script";

// Google Analytics 4 (gtag.js). Page views on client-side navigation are
// picked up by GA's enhanced measurement (browser history events).
const GA_MEASUREMENT_ID = "G-YXH5VX1PQ1";

export default function GoogleAnalytics() {
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}');
				`}
			</Script>
		</>
	);
}

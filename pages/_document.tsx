import React, { ReactElement } from "react";
import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render(): ReactElement {
		return (
			<Html lang="en">
				<Head />
				<body className="">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

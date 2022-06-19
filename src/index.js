import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'assets/style.scss';
import 'assets/styles.scss';

import App from 'App';
import * as serviceWorker from 'serviceWorker';

//redux store
import { Provider } from 'react-redux'
import store from 'store';

// provider
import { MoralisProvider } from 'react-moralis';
import { DappifyProvider, Logger } from 'react-dappify';

Logger.debug(`NODE_ENV ${process.env.NODE_ENV}`);
Logger.debug(`REACT_APP_HOST_ENV ${process.env.REACT_APP_HOST_ENV}`);

ReactDOM.render(
	<Suspense fallback="loading">
		<MoralisProvider 
			appId={process.env.REACT_APP_MORALIS_APP_ID} 
			serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
		>
			<DappifyProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</DappifyProvider>
		</MoralisProvider>
	</Suspense>,
	document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
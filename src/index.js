import React from 'react';
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
import { DappifyProvider } from 'react-dappify';

ReactDOM.render(
	<MoralisProvider 
		appId={process.env.REACT_APP_MORALIS_APP_ID} 
		serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
	>
		<DappifyProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</DappifyProvider>
	</MoralisProvider>,
	document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
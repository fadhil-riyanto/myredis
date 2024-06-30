import { render } from 'preact';
import { SetTargetHost } from './components/SetTargetHost.modal'

import * as bootstrap from 'bootstrap'
import "./style.scss"
import { useEffect, useState } from 'preact/hooks';


export function App() {
	const [globalConnToken, globalConnTokenset] = useState(null)
	

	return (
		<>
			<SetTargetHost parentRefTokenset={globalConnTokenset} parentRefToken={globalConnToken} />
			<h1>hello world</h1>
		</>
	);
}



render(<App />, document.getElementById('app'));

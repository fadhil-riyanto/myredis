import { render } from 'preact';
import { SetTargetHost } from './components/SetTargetHost.modal'

import "./style.scss"
import { useEffect, useState } from 'preact/hooks';
import { Dashboard } from "./dashboard"

export function App() {
	const [globalConnToken, globalConnTokenset] = useState(null)
	

	return (
		<>
			<div data-bs-theme="dark" className="bg-dark min-vh-100">
			<SetTargetHost parentRefTokenset={globalConnTokenset} parentRefToken={globalConnToken} />
			<Dashboard parentRefToken={globalConnToken}/>
			</div>
		</>
	);
}



render(<App />, document.getElementById('app'));

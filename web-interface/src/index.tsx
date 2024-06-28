import { render } from 'preact';
import { SetTargetHost } from './components/SetTargetHost.modal'

import * as bootstrap from 'bootstrap'
import "./style.scss"
import { useEffect } from 'preact/hooks';

// modal


export function App() {
	useEffect(() => {
		new bootstrap.Modal('#staticBackdropaddhost').show()
	})
	return (
		<>
			<SetTargetHost />
			<h1>hello world</h1>
		</>
	);
}



render(<App />, document.getElementById('app'));

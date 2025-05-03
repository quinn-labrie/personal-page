import './App.css';
import OminousOrbScene from './components/OminousOrb';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
	return (
		<ThemeProvider>
			<div>Quinn LaBrie</div>
			<OminousOrbScene />
		</ThemeProvider>
	);
}

export default App;

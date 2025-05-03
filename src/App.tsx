import './App.css';
import Info from './components/Info';
import OminousOrbScene from './components/OminousOrb';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
	return (
		<ThemeProvider>
			<div>Quinn LaBrie</div>
			<OminousOrbScene />
			<Info />
		</ThemeProvider>
	);
}

export default App;

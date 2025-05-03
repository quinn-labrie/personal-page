import './App.css';
import Info from './components/Info';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
	return (
		<ThemeProvider>
			<Info />
		</ThemeProvider>
	);
}

export default App;

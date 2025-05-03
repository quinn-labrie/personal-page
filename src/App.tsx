import { useState } from 'react';
import './App.css';
import { Card, CardContent } from './components/ui/card';
import TypingText from './components/TypingText';

function App() {
	const textItems = [
		{ label: 'Name', text: 'Quinn LaBrie' },
		{ label: 'Email', text: 'quinn.labrie@gmail.com' },
		{ label: 'Occupation', text: 'Software Engineer' },
		{ label: 'Location', text: 'Austin, TX' },
	];

	const [activeLineIndex, setActiveLineIndex] = useState(0);

	const handleLineComplete = () => {
		setActiveLineIndex((prev) => prev + 1);
	};

	return (
		<Card className="items-start w-full max-w-md mx-auto mt-[20vh]">
			<CardContent className="flex flex-col items-start">
				{textItems.map((item, index) => (
					<TypingText
						key={item.label}
						label={item.label}
						text={item.text}
						startTyping={index <= activeLineIndex}
						onComplete={
							index === activeLineIndex
								? handleLineComplete
								: undefined
						}
					/>
				))}
			</CardContent>
			<CardContent className="flex flex-row-reverse w-full">
				<a
					href="https://github.com/quinn-labrie"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'src/assets/github-mark-white.png'}
						className="w-6 h-6"
					/>
				</a>
				<a
					href="https://github.com/quinn-labrie"
					target="_blank"
					rel="noopener noreferrer"
					className="mr-1"
				>
					<img
						src={'src/assets/InBug-White.png'}
						className="w-6 h-6"
					/>
				</a>
			</CardContent>
		</Card>
	);
}

export default App;

import { useState } from 'react';
import './App.css';
import { Card, CardContent } from './components/ui/card';
import TypingText from './components/TypingText';

function App() {
	const textItems = [
		{ label: `"name"`, text: `"quinn labrie",` },
		{ label: `"occupation"`, text: `"full stack software engineer",` },
		{ label: `"email"`, text: `"quinn.labrie@gmail.com",` },
		{ label: `"location"`, text: `"austin, tx, usa",` },
		{},
		{
			label: `"languages"`,
			text: `["typescript", "javascript"],`,
		},
		{
			label: `"frameworks"`,
			text: `["react", "next.js", "nest.js"],`,
		},
		{
			label: `"databases"`,
			text: `["postgresql", "mongodb"]`,
		},
	];

	const [activeLineIndex, setActiveLineIndex] = useState(0);

	const handleLineComplete = () => {
		setActiveLineIndex((prev) => {
			let nextIndex = prev + 1;
			while (
				nextIndex < textItems.length &&
				Object.keys(textItems[nextIndex]).length === 0
			) {
				nextIndex++;
			}
			return nextIndex;
		});
	};

	return (
		<Card className="items-start w-full max-w-md mx-auto mt-[20vh]">
			<CardContent className="flex flex-col items-start">
				<p>{`{`}</p>
				{textItems.map((item, index) => {
					if (!item.label || !item.text) {
						return <br key={`break-${index}`} />;
					}

					return (
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
							indentLevel={1} // Add indentation
						/>
					);
				})}
				<p>{`}`}</p>
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

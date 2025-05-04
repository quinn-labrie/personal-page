import { useState } from 'react';
import './App.css';
import { Card, CardContent, CardFooter } from './components/ui/card';
import TypingText from './components/TypingText';
import { info } from './lib/consts';
import SocialLinks from './components/SocialLinks';

function App() {
	const [activeLineIndex, setActiveLineIndex] = useState(0);

	const handleLineComplete = () => {
		setActiveLineIndex((prev) => {
			let nextIndex = prev + 1;
			while (
				nextIndex < info.length &&
				Object.keys(info[nextIndex]).length === 0
			) {
				nextIndex++;
			}
			return nextIndex;
		});
	};

	return (
		<Card className="items-start w-full max-w-md mx-auto mt-[10vh] card-appear">
			<CardContent
				className="flex flex-col items-start"
				aria-label="Profile Information"
			>
				<p>{`{`}</p>
				{info.map((item, index) => {
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
						/>
					);
				})}
				<p>{`}`}</p>
			</CardContent>
			<CardFooter
				className="flex flex-row-reverse w-full"
				aria-label="Profile Links"
			>
				<SocialLinks />
			</CardFooter>
		</Card>
	);
}

export default App;

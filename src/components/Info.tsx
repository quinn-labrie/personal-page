import TypingText from './TypingText';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';

export default function Info() {
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
		<Card className="items-start">
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
		</Card>
	);
}

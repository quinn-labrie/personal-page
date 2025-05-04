import { useEffect, useState } from 'react';
import './App.css';
import { Card, CardContent, CardFooter } from './components/ui/card';
import TypingText from './components/TypingText';
import { info } from './lib/consts';
import SocialLinks from './components/SocialLinks';
import { Progress } from './components/ui/progress';

function App() {
	const [activeLineIndex, setActiveLineIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		let startTime: number | null = null;

		const duration = 1500;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;

			const elapsed = timestamp - startTime;
			const progressPercent = Math.min(elapsed / duration, 1);

			const easedProgress = Math.round(
				progressPercent *
					progressPercent *
					(3 - 2 * progressPercent) *
					100
			);

			setProgress(easedProgress);

			if (progressPercent < 1) {
				requestAnimationFrame(animate);
			} else if (progressPercent === 1) {
				setTimeout(() => {
					setShowContent(true);
				}, 600);
			}
		};

		requestAnimationFrame(animate);
	}, []);

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

	return !showContent ? (
		<Card className="items-start w-full max-w-md mx-auto mt-[10vh] card-appear">
			<Progress
				value={progress}
				className={'my-3'}
			/>
		</Card>
	) : (
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

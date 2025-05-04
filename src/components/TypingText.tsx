import { useEffect, useState, useRef } from 'react';
import './TypingCursor.css';

interface TypingTextProps {
	label: string;
	text: string;
	startTyping: boolean;
	onComplete?: () => void;
}

export default function TypingText({
	label,
	text,
	startTyping,
	onComplete,
}: TypingTextProps) {
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const hasTypedRef = useRef(false);

	const fullLine = `${label}: ${text}`;
	useEffect(() => {
		if (hasTypedRef.current) {
			setDisplayedText(fullLine);
			return;
		}

		if (startTyping && !hasTypedRef.current) {
			setIsTyping(true);
			let i = 0;
			const typing = setInterval(() => {
				setDisplayedText(fullLine.substring(0, i));
				i++;
				if (i > fullLine.length) {
					clearInterval(typing);
					setIsTyping(false);
					hasTypedRef.current = true;
					if (onComplete) {
						setTimeout(onComplete, 200);
					}
				}
			}, 25);

			return () => clearInterval(typing);
		}
	}, [fullLine, startTyping, onComplete]);

	return (
		<p className="typing-line pl-6">
			<span className={`typing-text ${isTyping ? 'typing' : 'finished'}`}>
				{displayedText}
			</span>
		</p>
	);
}

import { useEffect, useState, useRef } from 'react';
import './TypingCursor.css';

interface TypingTextProps {
	label: string;
	text: string;
	startTyping: boolean;
	onComplete?: () => void;
	indentLevel?: number; // Add this to control indentation
}

export default function TypingText({
	label,
	text,
	startTyping,
	onComplete,
	indentLevel = 1, // Default indent level
}: TypingTextProps) {
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const hasTypedRef = useRef(false);

	// Combine label and text into a complete line
	const fullLine = `${label}: ${text}`;

	// Calculate indent style
	const indentStyle = {
		paddingLeft: `${indentLevel * 20}px`, // 20px per indent level
	};

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
						setTimeout(onComplete, 500);
					}
				}
			}, 50);

			return () => clearInterval(typing);
		}
	}, [fullLine, startTyping, onComplete]);

	return (
		<p
			style={indentStyle}
			className="typing-line"
		>
			<span className={`typing-text ${isTyping ? 'typing' : 'finished'}`}>
				{displayedText}
			</span>
		</p>
	);
}

"use client";

import copy from "clipboard-copy";
import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ value }: { value: string }) {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const handleCopyClick = useCallback(() => {
		copy(value);
		setShowTooltip(true);
	}, [value]);

	useEffect(() => {
		if (showTooltip) {
			const timer = setInterval(() => {
				setShowTooltip(false);
			}, 2000);

			return () => clearInterval(timer);
		}
	}, [showTooltip]);

	if (showTooltip) {
		return <div className="p-2"><Check size={16} /></div>;
	}

	return (
		<Button variant={"ghost"} className="p-2 h-max" onClick={handleCopyClick}>
			<Copy />
		</Button>
	);
}

import { AIToolContent } from "@/components/views/ai-tools/ai-tool-content";
import { AIToolHeader } from "@/components/views/ai-tools/ai-tools-header";

export default function AIToolsPage() {
	return (
		<div className="flex flex-col gap-2.5 max-w-[662px] w-full">
			<AIToolHeader />
			<AIToolContent />
		</div>
	);
}

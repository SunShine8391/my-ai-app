"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useGeneratedLessonPlan } from "@/hooks/atom/use-generated-lesson-plan";
import { markdownToHtml } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { CopyButton } from "./copy-button";
import { exportMarkdownToPDF } from "@/hooks/actions/ai-tools";

export function GeneratedLessonPlanView() {
	const { lessonPlan, setLessonPlan } = useGeneratedLessonPlan();

	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [html, setHtml] = useState<string>(lessonPlan.text);

	const [htmlContent, setHtmlContent] = useState({
		content: "",
	});

	const generateHtml = useCallback(async (value: string) => {
		const { content } = await markdownToHtml(value);
		setHtmlContent({ content });
	}, []);

	const handleClickDownload = useCallback(async () => {
		setIsLoading(true);
		const pdfBlob = await exportMarkdownToPDF(lessonPlan.text);
		setIsLoading(false);

		if (!pdfBlob) return;

		const blobURL = URL.createObjectURL(pdfBlob);
		const tempLink = document.createElement("a");
		tempLink.href = blobURL;
		tempLink.setAttribute("download", "lesson-plan.pdf");
		tempLink.click();
	}, [lessonPlan.text]);

	useEffect(() => {
		generateHtml(lessonPlan.text);
	}, [generateHtml, lessonPlan]);

	if (lessonPlan.text.length === 0) return <></>;

	return (
		<div className="space-y-6">
			<p className="text-base font-semibold">Generated Lesson Plan</p>
			{isEdit ? (
				<Textarea
					className="rounded-xl px-6 py-3"
					rows={10}
					onChange={(e) => setHtml(e.target.value)}
					value={html}
					placeholder="Your generated lesson plan will appear here..."
				/>
			) : (
				<div className="relative group">
					<div
						dangerouslySetInnerHTML={{ __html: htmlContent.content }}
						className="rounded-xl px-6 py-3 border border-solid border-[#E3E4E8] w-full overflow-auto bg-slate-200/10 space-y-2"
					/>
					<div className="absolute px-2 py-1 border border-solid top-4 right-4 border-[#E3E4E8] rounded-xl hidden gap-2 group-hover:flex">
						<CopyButton value={lessonPlan.text} />
						<Button
							variant={"ghost"}
							className="p-2 h-max"
							onClick={() => setIsEdit(true)}
						>
							<Edit />
						</Button>
					</div>
				</div>
			)}
			{isEdit ? (
				<Button
					className="rounded-xl text-base"
					onClick={() => {
						setLessonPlan({ text: html });
						setIsEdit(false);
					}}
				>
					Save
				</Button>
			) : (
				<div className="flex justify-between items-center">
					<Button
						variant={"outline"}
						className="rounded-xl text-base"
						onClick={() => setLessonPlan({ text: "" })}
					>
						Reset
					</Button>
					<Button
						className="rounded-xl text-base"
						onClick={handleClickDownload}
						disabled={isLoading}
					>
						{isLoading && (
							<div
								className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-muted-foreground border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
								role="status"
							></div>
						)}
						Download PDF
					</Button>
				</div>
			)}
		</div>
	);
}

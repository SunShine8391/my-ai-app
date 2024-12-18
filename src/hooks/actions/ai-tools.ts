"use server";

import { API_ENDPOINT, API_TOKEN } from "@/config";
import { CreateLessonPlanParams } from "@/types/ai-tools";

export async function createLessonPlan(params: CreateLessonPlanParams) {
	try {
		const response = await fetch(`${API_ENDPOINT}/ai_tools/lesson_planner`, {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
			method: "POST",
		});

		if (!response.ok) {
			new Error("Internal Server Error!");
		}

		console.log(response);
		const result = await response.text();
		console.log(result);

		return result;
	} catch (err) {
		console.log(err);
	}
}

export async function exportMarkdownToPDF(md: string) {
	try {
		const response = await fetch("https://md-to-pdf.fly.dev", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({ markdown: md, engine: "pdflatex" }),
		});
		if (!response.ok) {
			throw new Error("Failed to generate PDF");
		}
		const pdfBlob = await response.blob();

		return pdfBlob;
	} catch (err) {
		console.log(err);
	}
}

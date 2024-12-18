import Image from "next/image";
import { imagePaths } from "@/lib/image-path";
import { CreateLessonPlanForm } from "./create-lesson-plan-form";
import { GeneratedLessonPlanView } from "./generated-lesson-plan-view";

export function AIToolContent() {
	return (
		<div className="flex flex-col gap-6 bg-white border border-solid border-[#E3E4E8] rounded-3xl py-5 px-4 w-full">
			<Image
				src={imagePaths.lessonPlanner}
				width={70}
				height={70}
				alt="Lesson Planner"
			/>
			<CreateLessonPlanForm />
			<GeneratedLessonPlanView />
		</div>
	);
}

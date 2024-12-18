import { atom, useAtom } from "jotai";

const generatedLessonPlanAtom = atom<{ text: string }>({ text: "##44563563" });

export const useGeneratedLessonPlan = () => {
	const [lessonPlan, setLessonPlan] = useAtom(generatedLessonPlanAtom);

	return {
		lessonPlan,
		setLessonPlan,
	};
};

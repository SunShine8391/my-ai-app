"use server";

import { API_ENDPOINT, API_TOKEN } from "@/config";
import { CreateLessonPlanParams } from "@/types/ai-tools";

export async function createLessonPlan(params: CreateLessonPlanParams) {
  try {
    const response = await fetch(`${API_ENDPOINT}/ai_tools/lesson_planner`, {
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params),
      method: "POST"
    });

    if (!response.ok) {
      new Error("Internal Server Error!");
    }

    console.log(response)
    const result = await response.text();
    console.log(result)

    return result
  } catch (err) {
    console.log(err)
  }
}

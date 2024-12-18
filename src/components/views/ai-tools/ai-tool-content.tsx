"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { imagePaths } from "@/lib/image-path";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/lib/routes";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createLessonPlan } from "@/hooks/actions/ai-tools";

const lessonPlanFormSchema = z.object({
	topic: z.string({
		required_error: "Topic is required!",
	}),
	duration: z.string({
		required_error: "Lection Duration is required!",
	}),
	gradeLevel: z.string({
		required_error: "Grade Level is required!",
	}),
});

type LessonPlanFormValues = z.infer<typeof lessonPlanFormSchema>;

export function AIToolContent() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<LessonPlanFormValues>({
		resolver: zodResolver(lessonPlanFormSchema),
	});

	const onSubmit = useCallback(async (data: LessonPlanFormValues) => {
		setIsLoading(true);
		const res = await createLessonPlan({
			...data,
		});
		setIsLoading(false);

		console.log(res);
		alert(res);
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6 bg-white border border-solid border-[#E3E4E8] rounded-3xl py-5 px-4 w-full">
					<Image
						src={imagePaths.lessonPlanner}
						width={70}
						height={70}
						alt="Lesson Planner"
					/>
					<div className="space-y-1">
						<p className="text-2xl font-bold">Lesson Planner</p>
						<p className="text-base text-[#757678]">
							This AI tool helps you with creating lesson plans for your class!
						</p>
					</div>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="gradeLevel"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-col gap-1.5">
											<FormLabel className="text-base font-semibold">
												Grade Level:
											</FormLabel>
											<Select onValueChange={(e) => field.onChange(e)}>
												<SelectTrigger className="rounded-full h-16 px-6">
													<SelectValue placeholder="Please select grade level" />
												</SelectTrigger>
												<SelectContent>
													{[
														{ label: "1st grade", value: "1st grade" },
														{ label: "2nd grade", value: "2nd grade" },
													].map(({ label, value }, index) => (
														<SelectItem value={value} key={index}>
															{label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-col gap-1.5">
											<FormLabel className="text-base font-semibold">
												Lecture duration (in minutes)
											</FormLabel>
											<Select onValueChange={(e) => field.onChange(e)}>
												<SelectTrigger className="rounded-full h-16 px-6">
													<SelectValue placeholder="Please select lecture duration" />
												</SelectTrigger>
												<SelectContent>
													{[{ label: "60", value: "60" }].map(
														({ label, value }, index) => (
															<SelectItem value={value} key={index}>
																{label}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="topic"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-col gap-1.5">
											<FormLabel className="text-base font-semibold">
												Topic, Standard, or Objective:
											</FormLabel>
											<p className="text-sm text-[#747678]">
												Provide how the assignment should open the conversation
											</p>
											<Textarea
												className="rounded-xl px-6 py-3"
												rows={6}
												onChange={(e) => field.onChange(e.target.value)}
												placeholder="Student last lesson was on the geography of the United States, have the lesson include group work, etc. The lesson plan should include standards (CCSS, TEKS)"
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-y-1.5">
							<p className="text-sm">Upload additional documents</p>
							<div className="flex items-center justify-center w-full">
								<label
									htmlFor="dropzone-file"
									className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
								>
									<div className="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span className="font-semibold">Click to upload</span> or
											drag and drop
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Max. file size 50 MB (PDF, DOCX, PPTX, TXT, HTML)
										</p>
									</div>
									<input id="dropzone-file" type="file" className="hidden" />
								</label>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2.5">
						<Button
							type="submit"
							className="h-16 rounded-full text-base"
							disabled={isLoading}
						>
							{isLoading && (
								<div
									className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-muted-foreground border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								></div>
							)}
							Create lesson plan
						</Button>
						<Button
							variant={"ghost"}
							className="h-16 rounded-full text-base text-destructive hover:bg-destructive/20 hover:text-destructive"
							asChild
						>
							<Link href={routes.home}>Cancel</Link>
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}

import { routes } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AIToolHeader() {
	return (
		<div className="w-full flex items-center px-4 py-5 border border-solid border-[#E3E4E8] rounded-3xl bg-white gap-4">
			<Link href={routes.home}>
				<ArrowLeft size={24} className="cursor-pointer" />
			</Link>
			<p className="px-5 py-2.5 text-sm bg-black text-white rounded-xl">
				Lesson Planner
			</p>
		</div>
	);
}

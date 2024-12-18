"use client";

import { imagePaths } from "@/lib/image-path";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { LayoutGrid, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function Sidebar() {
	const pathname = usePathname();
	const [currentTab, setCurrentTab] = useState<string>("Home");

	const options = useMemo(
		() => [
			{
				icon: Presentation,
				label: "Overview",
				href: routes.overview,
			},
			{
				icon: LayoutGrid,
				label: "AI Tools",
				href: routes.aiTool,
			},
		],
		[]
	);

	useEffect(() => {
		if (pathname.includes(routes.home)) {
			setCurrentTab("Home");
		}

		options.map((item) => {
			if (pathname.includes(item.href)) setCurrentTab(item.label);
		});
	}, [options, pathname]);

	return (
		<div className="flex flex-col justify-between items-center bg-white rounded-3xl border border-[#E3E4E8] border-solid p-2.5 sticky top-0">
			<div className="flex flex-col gap-1">
				<Link
					href={routes.home}
					className={cn(
						"flex justify-center items-center w-full h-16 hover:bg-gray-200 rounded-xl cursor-pointer transition-all",
						currentTab === "Home" ? "bg-slate-400" : ""
					)}
					onClick={() => setCurrentTab("Home")}
				>
					<Image
						src={imagePaths.logo}
						sizes="30"
						width={30}
						height={30}
						alt="Logo"
					/>
				</Link>
				{options.map(({ label, icon: Icon, href }, index) => {
					const isSelected = currentTab === label;

					return (
						<Link
							key={index}
							href={href}
							className={cn(
								"flex flex-col items-center gap-3 p-2.5 group rounded-xl cursor-pointer transition-all",
								isSelected ? "bg-black" : "hover:bg-gray-200"
							)}
							onClick={() => setCurrentTab(label)}
						>
							<Icon size={16} className={isSelected ? "text-white" : ""} />
							<p className={cn("text-xs", isSelected ? "text-white" : "")}>
								{label}
							</p>
						</Link>
					);
				})}
			</div>
			<Link
				className="w-full h-16 flex justify-center items-center"
				href={routes.profile}
			>
				<p className="flex justify-center items-center w-12 h-12 rounded-full bg-[#CE9DFF] text-[#7F00FF] text-base font-bold">
					ED
				</p>
			</Link>
		</div>
	);
}

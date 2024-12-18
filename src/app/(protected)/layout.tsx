import { Sidebar } from "@/components/layout/side-bar";
import React from "react";

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex bg-[#F9F9F9] w-full h-full p-6 gap-6 overflow-y-auto">
			<Sidebar />
			<div className="flex-1 flex justify-center">{children}</div>
		</div>
	);
}

import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export async function markdownToHtml(markdown: string) {
	const { content, data } = matter(markdown);

	const processedContent = await remark().use(html).process(content);

	return {
		content: processedContent.toString(),
		frontmatter: data,
	};
}

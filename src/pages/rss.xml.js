import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data, // Spreads all fields from frontmatter (title, author, date, description, tags)
			pubDate: post.data.date, // Ensures pubDate is set from post.data.date for RSS
			link: `/blog/${post.id}/`, 
		})),
	});
}

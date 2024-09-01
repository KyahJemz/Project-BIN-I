import { NewsService } from '@/services/news.service';
import NewsModel, { INewsDocument } from '@/models/news';
import NewsSection from '@/components/NewsSection/NewsSection';

export interface NewsPageProps {
    allNews: INewsDocument[];           
}

export const getNewsPageProps = async () => {
    const newsService = new NewsService(NewsModel);

    try {
        const [allNews] = await Promise.all([
            newsService.getAllNews(),
        ]);

        return {
            props: {
                allNews,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                allNews: [],
            },
        };
    } 
};

export default function NewsPage({
    allNews,
}: NewsPageProps) {
	return (
		<div className="min-h-screen">

            {/* News Highlights Section */}
            <NewsSection data={allNews.reverse()} />

        </div>
	);
}
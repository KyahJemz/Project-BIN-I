import { NewsService } from '@/services/news.service';
import NewsModel, { INewsDocument } from '@/models/news';
import NewsSection from '@/components/NewsSection/NewsSection';

export interface NewsPageProps {
    allNews: INewsDocument[];           
}

export const getNewsPageProps = async () => {
    const newsService = new NewsService(NewsModel, null);

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

export default function NewsPage() {
	return (
		<></>
	);
}
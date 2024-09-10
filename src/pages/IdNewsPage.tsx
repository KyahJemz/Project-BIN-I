import IdNewsSection from '@/components/IdNewsSection/IdNewsSection';
import NewsModel, { INewsDocument } from '@/models/news';
import { NewsService } from '@/services/news.service';

export interface NewsPageProps {
    idNews: INewsDocument | null; 
}

export const getIdNewsPageProps = async (id: string) => {
    const newsService = new NewsService(NewsModel, null);
    try {
        const idNews = await newsService.getNewsById(id)
        return { props: { idNews }};
    } catch (error) {
        console.error(error);
        return { props: { idNews: null }}} 
};

export default function IdNewsPage() {

	return (
		<></>
	);
}
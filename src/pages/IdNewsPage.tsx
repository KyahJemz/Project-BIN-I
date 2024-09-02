import IdNewsSection from '@/components/IdNewsSection/IdNewsSection';
import NewsModel, { INewsDocument } from '@/models/news';
import { NewsService } from '@/services/news.service';

export interface NewsPageProps {
    idNews: INewsDocument | null; 
}

export const getIdNewsPageProps = async (id: string) => {
    const newsService = new NewsService(NewsModel);
    try {
        const idNews = await newsService.getNewsById(id)
        return { props: { idNews }};
    } catch (error) {
        console.error(error);
        return { props: { idNews: null }}} 
};

export default function IdNewsPage({
	idNews,
}: NewsPageProps) {

	return (
		<div className="min-h-screen bg-gray-100">

            {/* News Section */}
            <IdNewsSection news={idNews}/>

        </div>
	);
}
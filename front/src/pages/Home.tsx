import { useEffect, useState } from 'react';
import { useFetch } from '../utils/hooks';
import { Cards } from '../components/Cards';
import Pagination from '@mui/material/Pagination';
import { GET_ARTICLES_INFOS } from '../constants/routes';

export const Home = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 5;
	const { data, error, loadingData, fetchData } = useFetch(GET_ARTICLES_INFOS);

	useEffect(() => {
		const query = '';
		const maxResults = 10;

		fetchData(query, maxResults);
	}, [fetchData]);

	useEffect(() => {
		console.log('data: ', data)
	}, [data])

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		page: number
	) => {
		setCurrentPage(page);
	};

	if (loadingData)
		return (
			<div className="flex justify-center items-center w-full">
				Chargement de la page...
			</div>
		);
	if (error) return <div>Erreur : {error.message}</div>;

	const offset = (currentPage - 1) * itemsPerPage;
	const currentPageItems = data && data.slice(offset, offset + itemsPerPage);

	return (
		<div className="w-full flex items-center flex-col">
			{ data && <div className="w-11/12 mb-8">
				<Cards currentPageItems={currentPageItems} />
				<Pagination
					count={Math.ceil(data.length / itemsPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					variant="outlined"
				/>
			</div>
			}
		</div>
	);
};

import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();

	return (
		<div className="py-6 px-20 flex justify-between">
			<button
				onClick={() => navigate('/')}
				className="md:text-xl pr-10 text-[#3E4261]"
			>
				Articles FranceInfo
			</button>
			<button
				onClick={() => navigate('/keywords')}
				className="md:text-xl pr-10 text-[#3E4261]"
			>
				Scraping CSV New York Times
			</button>
		</div>
	);
};

import React from 'react';
import { CollapsibleTable } from './CollapsibleTable';

interface CardsProps {
	currentPageItems: any[];
}

export const Cards: React.FC<CardsProps> = ({ currentPageItems }) => {
	return (
		<div className="flex flex-col">
			<CollapsibleTable currentPageItems={currentPageItems} />
		</div>
	);
};

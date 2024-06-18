import { useEffect, useState } from 'react';
import { useFetch } from '../utils/hooks';
import { PieChart } from '@mui/x-charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';
import { GET_KEYWORDS_COUNT } from '../constants/routes';

export const Keywords = () => {
    const { data, error, loadingData, fetchData } = useFetch(GET_KEYWORDS_COUNT);

    useEffect(() => {
        const query = '';
        const maxResults = 10;

        fetchData(query, maxResults);
    }, [fetchData]);

    if (loadingData)
        return (
            <div className="flex justify-center items-center w-full h-full">
                <CircularProgress /> Chargement des données...
            </div>
        );

    if (error) return <div>Erreur : {error.message}</div>;

    const formattedData = data && data.map((item, index) => ({
        id: index,
        value: item.count,
        label: item.keyword,
    }));

    return (
        <div className="w-full flex items-center justify-center h-full flex-col">
            {data && (
                <PieChart
                    series={[
                        {
                            data: formattedData,
                            label: ({ dataEntry }) => `${dataEntry.label} (${dataEntry.value})`,
                        },
                    ]}
                    width={400}
                    height={400}
                />
            )}
        </div>
    );
};

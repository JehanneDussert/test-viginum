import React from 'react';
import ReactDOM from 'react-dom/client';
import { Wrapper } from './components/Wrapper.tsx';
import { Home } from './pages/Home.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Keywords } from './pages/Keywords.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Wrapper>
				<Header />
				<Home />
			</Wrapper>
		),
	},
	{
		path: '/keywords',
		element: (
			<Wrapper>
				<Header />
				<Keywords />
			</Wrapper>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

import { ReactNode } from 'react';

interface WrapperProps {
	children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
	return <div className="w-screen h-screen">{children}</div>;
};

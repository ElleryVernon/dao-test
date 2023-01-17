import { createContext, useState } from "react";

const AddressContext = createContext({
	address: "",
	setAddress: (address: string) => {},
});

interface Props {
	children: JSX.Element | JSX.Element[];
}

const AddressProvider = ({ children }: Props): JSX.Element => {
	const [address, setAddress] = useState<string>("");

	return (
		<AddressContext.Provider
			value={{
				address,
				setAddress,
			}}
		>
			{children}
		</AddressContext.Provider>
	);
};

export { AddressContext, AddressProvider };

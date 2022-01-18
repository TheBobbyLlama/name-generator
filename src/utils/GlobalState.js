import React, { createContext, useContext } from "react";
import {  } from "./actions";
import { useNameGenReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
	// Set default state here.
	const [state, dispatch] = useNameGenReducer({
		dataset: undefined,
		resultCount: 20,
		results: []
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
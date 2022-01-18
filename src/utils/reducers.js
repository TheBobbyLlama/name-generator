import { useReducer } from "react";
import { generateNames } from "./utils";

import {
	SET_NAME_SOURCE,
	SET_NAME_CATEGORY,
	SET_NAME_SUBCATEGORY
} from "./actions";

function setNameCategory(state, categoryInfo) {
	let defaultSubcategory = categoryInfo.subcategories.find(subcat => subcat.name)?.name || "";
	state.nameInfo = { category: categoryInfo.category, subcategory: defaultSubcategory, filters: categoryInfo.defaultFilters || [] };
	state.results = generateNames(state.dataset, state.nameInfo, state.resultCount);
}

export const reducer = (state, action) => {
	let newState;

	switch (action.type) {
		case SET_NAME_SOURCE:
			newState = { ...state };
			newState.dataset = action.sourceData;
			setNameCategory(newState, newState.dataset[0]);
			return newState;
		case SET_NAME_CATEGORY:
			newState = { ...state };
			setNameCategory(newState, state.dataset.find(cat => cat.category === action.category));
			return newState;
		case SET_NAME_SUBCATEGORY:
			newState = { ...state };
			newState.nameInfo = { ...newState.nameInfo, subcategory: action.subcategory };
			newState.results = generateNames(newState.dataset, newState.nameInfo, newState.resultCount);
			return newState;
		default:
			return state;
	}
}

export function useNameGenReducer(initialState) {
	return useReducer(reducer, initialState);
}
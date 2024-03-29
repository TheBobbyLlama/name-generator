import { useReducer } from "react";
import { generateNames, getFilterList } from "./utils";

import {
	SET_NAME_SOURCE,
	SET_NAME_CATEGORY,
	SET_NAME_SUBCATEGORY,
	TOGGLE_NAME_FILTER,
	SET_RESULT_COUNT,
	GENERATE_NEW_RESULTS
} from "./actions";

function setNameCategory(state, categoryInfo) {
	let defaultSubcategory = categoryInfo.subcategories?.find(subcat => subcat.name)?.name || "";
	state.nameInfo = { category: categoryInfo.category, subcategory: defaultSubcategory };
	state.nameInfo.filters = categoryInfo.defaultFilters || getFilterList(state);
	
	state.results = generateNames(state.dataset, state.nameInfo, state.resultCount);
}

export const reducer = (state, action) => {
	let newState;
	
	switch (action.type) {
		case SET_NAME_SOURCE:
			newState = { ...state };
			newState.dataset = action.sourceData;

			if (action.category) {
				let tmpCat = newState.dataset.find(cat => cat.category?.toLowerCase() === action.category.toLowerCase());

				if (!tmpCat) {
					tmpCat = newState.dataset.find(cat => cat.category?.toLowerCase().startsWith(action.category.toLowerCase()));
				}

				setNameCategory(newState, tmpCat);

				if (action.subcategory) {
					newState.nameInfo = { ...newState.nameInfo, subcategory: action.subcategory };
					newState.results = generateNames(newState.dataset, newState.nameInfo, newState.resultCount);
				}
			} else {
				setNameCategory(newState, newState.dataset.find(cat => cat.category));
			}
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
		case TOGGLE_NAME_FILTER:
			newState = { ...state };
			newState.nameInfo = { ...newState.nameInfo };

			if (newState.nameInfo.filters.indexOf(action.filter) > -1) {
				newState.nameInfo.filters = newState.nameInfo.filters.filter(item => item !== action.filter);
			} else {
				newState.nameInfo.filters = [...newState.nameInfo.filters];
				newState.nameInfo.filters.push(action.filter);
				newState.nameInfo.filters.sort();
			}

			newState.results = generateNames(newState.dataset, newState.nameInfo, newState.resultCount);
			return newState;
		case SET_RESULT_COUNT:
			localStorage.setItem("NameGen:ResultCount", action.resultCount);
			newState = { ...state, resultCount: action.resultCount };
			newState.results = generateNames(newState.dataset, newState.nameInfo, newState.resultCount);
			return newState;
		case GENERATE_NEW_RESULTS:
			newState = { ...state };
			newState.results = generateNames(newState.dataset, newState.nameInfo, newState.resultCount);
			return newState;
		default:
			return state;
	}
}

export function useNameGenReducer(initialState) {
	return useReducer(reducer, initialState);
}
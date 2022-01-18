import { useStoreContext } from "../../utils/GlobalState";

import { } from "../../utils/actions";

import "./NameFilters.css";

function NameFilters() {
	const [state, dispatch] = useStoreContext();

	if ((!state.dataset) || (!state.nameInfo.category)) {
		return <></>;
	}

	const getFilterList = function() {
		const result = [];
		const curCat = state.dataset.find(cat => cat.category === state.nameInfo.category);
		curCat.subcategories.forEach(subcat => result.push(...subcat.componentList.components.map(clist => clist.filter)));

		return result.filter((item, index, self) => ((item) && (self.indexOf(item) === index)));
	}

	const filterList = getFilterList();

	console.log(filterList);

	return (
		<div id="nameFilters" className="subSection">
			<h2>Filters</h2>
		</div>
	);
}

export default NameFilters;
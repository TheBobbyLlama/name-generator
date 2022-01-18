import { useStoreContext } from "../../utils/GlobalState";
import { getFilterList } from "../../utils/utils";

import { TOGGLE_NAME_FILTER } from "../../utils/actions";

import "./NameFilters.css";

function NameFilters() {
	const [state, dispatch] = useStoreContext();

	if ((!state.dataset) || (!state.nameInfo.category)) {
		return <></>;
	}

	const filterList = getFilterList(state);

	if (!filterList.length) {
		return <></>;
	}

	const toggleFilter = function(e) {
		dispatch({ type: TOGGLE_NAME_FILTER, filter: e.target.name });
	}

	return (
		<section id="nameFilters">
			<h2>Filters</h2>
			<div>
				{filterList.map(filter => {
					return (<div key={filter}>
							<input name={filter} type="checkbox" checked={!!(state.nameInfo.filters.indexOf(filter) > -1)} onChange={toggleFilter}></input>
							<label htmlFor={filter}>{filter}</label>
						</div>);
				})}
			</div>
		</section>
	);
}

export default NameFilters;
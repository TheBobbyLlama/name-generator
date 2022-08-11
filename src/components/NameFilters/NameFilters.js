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

	const toggleFilter = function(name) {
		dispatch({ type: TOGGLE_NAME_FILTER, filter: name });
	}

	return (
		<section id="nameFilters">
			<h2>{state.dataset[0].filterText || "Filters"}</h2>
			<div>
				{filterList.map(filter => {
					const changeFunc = () => { toggleFilter(filter); }

					return (<div key={filter}>
							<input name={filter} type="checkbox" checked={!!(state.nameInfo.filters.indexOf(filter) > -1)} onChange={changeFunc}></input>
							<label htmlFor={filter} onClick={changeFunc}>{filter}</label>
						</div>);
				})}
			</div>
		</section>
	);
}

export default NameFilters;
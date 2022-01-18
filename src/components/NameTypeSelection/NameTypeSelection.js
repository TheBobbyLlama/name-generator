import { useStoreContext } from "../../utils/GlobalState";

import { SET_NAME_SOURCE, SET_NAME_CATEGORY, SET_NAME_SUBCATEGORY } from "../../utils/actions";

import "./NameTypeSelection.css";

function NameTypeSelection() {
	const nameSources = require("../../data/ListIndex.json");
	const [state, dispatch] = useStoreContext();

	const setNameSource = async function(source) {
		const sourceData = await require("../../data/namelists/" + source + ".json");

		dispatch({ type: SET_NAME_SOURCE, sourceData });
	}

	const setNameCategory = function(category) {
		dispatch({ type: SET_NAME_CATEGORY, category });
	}

	const setNameSubcategory = function(subcategory) {
		dispatch({ type: SET_NAME_SUBCATEGORY, subcategory });
	}

	// Default to the first option.
	if (!state.dataset) {
		// TODO - Put up a spinner?
		setNameSource(nameSources[0].file);
		return <></>;
	}

	const categoryList = state.dataset?.map(category => category.category).filter((category, index, self) => ((category) && (self.indexOf(category) === index))) || [];
	const subCatList = (state.nameInfo.category) ? state.dataset.find(cat => cat.category === state.nameInfo.category).subcategories.map(subcat => subcat.name).filter((subcat, index, self) => ((subcat) && (self.indexOf(subcat) === index))) : [];

	return (
		<div id="nameTypeSelection" className="subSection">
			<h2>Name Types</h2>
			<div>
				<label htmlFor="nameSource">Source:</label>
				<select name="nameSource" onChange={e => setNameSource(e.target.value)}>{nameSources.map(source => { return (<option key={source.file} value={source.file}>{source.name}</option>); })}</select>
			</div>
			{categoryList?.length ?
			<div>
				<label htmlFor="nameCategory">Category:</label>
				<select name="nameCategory" value={state.nameInfo.category} onChange={e => setNameCategory(e.target.value)}>{categoryList.map(category => { return (<option key={category}>{category}</option>); })}</select>
			</div>
			: <></>}
			{subCatList?.length ?
			<div>
				<label htmlFor="nameSubcategory">Subcategory:</label>
				<select name="nameSubcategory" value={state.nameInfo.subcategory} onChange={e => setNameSubcategory(e.target.value)}>{subCatList.map(subcat => { return (<option key={subcat}>{subcat}</option>); })}</select>
			</div>
			: <></>}
		</div>
	);
}

export default NameTypeSelection;
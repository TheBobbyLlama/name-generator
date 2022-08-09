import { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";

import { SET_NAME_SOURCE, SET_NAME_CATEGORY, SET_NAME_SUBCATEGORY } from "../../utils/actions";

import "./NameTypeSelection.css";

function NameTypeSelection() {
	const nameSources = require("../../data/ListIndex.json");
	const params = new URLSearchParams(window.location.search);
	const [state, dispatch] = useStoreContext();
	const [curSource, setCurSource] = useState("");

	const setNameSource = async function(source, category=null, subcategory=null) {
		const sourceData = await require("../../data/namelists/" + source + ".json");
		setCurSource(source);

		dispatch({ type: SET_NAME_SOURCE, sourceData, category, subcategory });
	}

	const setNameCategory = function(category) {
		dispatch({ type: SET_NAME_CATEGORY, category });
	}

	const setNameSubcategory = function(subcategory) {
		dispatch({ type: SET_NAME_SUBCATEGORY, subcategory });
	}

	// Choose the first option.
	if (!state.dataset) {
		// Put up a spinner,maybe?
		if (window.location.search) {
			const tmpSrc = (params.get("source") || params.get("src") || params.get("s"))?.toLowerCase();
			const tmpItem = nameSources.find(src => src.name.toLowerCase() === tmpSrc || src.abbr.toLowerCase() === tmpSrc);

			if (tmpItem) {
				const tmpCat = params.get("category") || params.get("cat") || params.get("c");
				const tmpSubcat = params.get("subcategory") || params.get("subcat") || params.get("sc");

				setNameSource(tmpItem.file, tmpCat, tmpSubcat);

				return <></>
			}
		}

		setNameSource(nameSources[0].file);
		return <></>;
	}

	const categoryList = state.dataset?.map(category => category.category).filter((category, index, self) => ((category) && (self.indexOf(category) === index))) || [];
	const subCatList = ((state.nameInfo.category) && (!state.dataset.find(cat => cat.category === state.nameInfo.category).randomSubcategory)) ? state.dataset.find(cat => cat.category === state.nameInfo.category).subcategories.map(subcat => subcat.name).filter((subcat, index, self) => ((subcat) && (self.indexOf(subcat) === index))) : [];

	return (
		<section id="nameTypeSelection">
			<h2>Name Types</h2>
			<div>
				<label htmlFor="nameSource">Source:</label>
				<select name="nameSource" onChange={e => setNameSource(e.target.value)} value={curSource} disabled={params.get("source") === curSource}>{nameSources.map(source => { return (<option key={source.file} value={source.file}>{source.name}</option>); })}</select>
			</div>
			{(categoryList.length > 1) ?
			<div>
				<label htmlFor="nameCategory">Category:</label>
				<select name="nameCategory" value={state.nameInfo.category} onChange={e => setNameCategory(e.target.value)} disabled={params.get("cat") === state.nameInfo.category}>{categoryList.map(category => { return (<option key={category}>{category}</option>); })}</select>
			</div>
			: <></>}
			{(subCatList.length > 1) ?
			<div>
				<label htmlFor="nameSubcategory">Subcategory:</label>
				<select name="nameSubcategory" value={state.nameInfo.subcategory} onChange={e => setNameSubcategory(e.target.value)} disabled={params.get("subcat") === state.nameInfo.subcategory}>{subCatList.map(subcat => { return (<option key={subcat}>{subcat}</option>); })}</select>
			</div>
			: <></>}
		</section>
	);
}

export default NameTypeSelection;
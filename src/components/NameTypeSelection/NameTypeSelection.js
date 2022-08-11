import { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";

import { SET_NAME_SOURCE, SET_NAME_CATEGORY, SET_NAME_SUBCATEGORY } from "../../utils/actions";

import "./NameTypeSelection.css";

function NameTypeSelection() {
	const nameSources = require("../../data/ListIndex.json");
	const params = new URLSearchParams(window.location.search);
	const urlSource = params.get("source") || params.get("src") || params.get("s");
	const urlCat = params.get("category") || params.get("cat") || params.get("c");
	const urlSubcat = params.get("subcategory") || params.get("subcat") || params.get("sc");

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
			const tmpItem = nameSources.find(src => src.name === urlSource || src.file === urlSource);

			if (tmpItem) {
				setNameSource(tmpItem.file, urlCat, urlSubcat);

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
				<select name="nameSource" onChange={e => setNameSource(e.target.value)} value={curSource} disabled={urlSource === curSource}>{nameSources.map(source => { return (<option key={source.file} value={source.file}>{source.name}</option>); })}</select>
				{!urlSource &&
					<div title="Get a link using this source." onClick={e => { navigator.clipboard.writeText(window.location.href.split("?")[0] + "?s=" + curSource); }}>
						<i className="fas fa-solid fa-link"></i>
					</div>
				}
			</div>
			{(categoryList.length > 1) ?
			<div>
				<label htmlFor="nameCategory">Category:</label>
				<select name="nameCategory" value={state.nameInfo.category} onChange={e => setNameCategory(e.target.value)} disabled={urlCat === state.nameInfo.category}>{categoryList.map(category => { return (<option key={category}>{category}</option>); })}</select>
				{!urlCat &&
					<div title="Get a link using this source &amp; category." onClick={e => { navigator.clipboard.writeText(window.location.href.split("?")[0] + "?s=" + curSource + "&c=" + state.nameInfo.category); }}>
						<i className="fas fa-solid fa-link"></i>
					</div>
				}
			</div>
			: <></>}
			{(subCatList.length > 1) ?
			<div>
				<label htmlFor="nameSubcategory">Subcategory:</label>
				<select name="nameSubcategory" value={state.nameInfo.subcategory} onChange={e => setNameSubcategory(e.target.value)} disabled={urlSubcat === state.nameInfo.subcategory}>{subCatList.map(subcat => { return (<option key={subcat}>{subcat}</option>); })}</select>
				{!urlSubcat &&
					<div title="Get a link using this source, category, &amp; subcategory." onClick={e => { navigator.clipboard.writeText(window.location.href.split("?")[0] + "?s=" + curSource + "&c=" + state.nameInfo.category + "&sc=" + state.nameInfo.subcategory); }}>
						<i className="fas fa-solid fa-link"></i>
					</div>
				}
			</div>
			: <></>}
		</section>
	);
}

export default NameTypeSelection;
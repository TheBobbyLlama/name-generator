/// Applies our filters and returns an array valid component lists for each possible word in the name.
function getComponentLists(dataset, nameInfo) {
	var result = [];
	var componentIndex = 1;
	const catIndex = dataset.findIndex(cat => ((!cat.category) || (cat.category === nameInfo.category)));

	if (catIndex < 0) {
		return result;
	}

	while (true) {
		let tmpResults = [];

		for (let x = 0; x < dataset[catIndex].subcategories.length; x++) {
			let curSet = dataset[catIndex].subcategories[x];

			if ((curSet.componentList.index === componentIndex) && ((!curSet.name) || (curSet.name === nameInfo.subcategory))) {

				for (let i = 0; i < curSet.componentList.components.length; i++) {
					if ((!curSet.componentList.components[i].filter) || (nameInfo.filters.indexOf(curSet.componentList.components[i].filter) > -1)) {
						tmpResults.push(curSet.componentList.components[i]);
					}
				}
			}
		}

		if (tmpResults.length > 0) {
			result.push(tmpResults);
			componentIndex++;
		} else {
			return result;
		}
	}
}

/// Generates an individual name.
function generateName(workingList) {
	const result = [];

	for (let i = 0; i < workingList.length; i++) {
		result.push(createNameComponent(workingList[i]));
	}

	return result;
}

/// The heavy lifting of name generation - Chooses a component list and then builds a word from it.
function createNameComponent(componentList) {
	var count = 0;
	var random;
	var curList = 0;
	var curLength;
	var result = "";

	for (let i = 0; i < componentList.length; i++) {
		count += componentList[i].list.length;
	}

	random = getRandomIndex(count);

	while (componentList[curList].list.length < random) {
		random -= componentList[curList].list.length;
		curList++;
	}

	if (typeof(componentList[curList].length) === "string") {
		var tmpVals = componentList[curList].length.split("-").map(element => parseInt(element));
		// Extra Math.random() is there to create a bias toward lower end of the scale!
		curLength = tmpVals[0] + Math.floor((((tmpVals[1] - tmpVals[0]) * Math.random()) + 1) * Math.random());
	} else {
		curLength = componentList[curList].length;
	}

	for (let i = 0; i < curLength; i++) {
		var workingList;

		if (i === 0) {
			workingList = componentList[curList].list.filter(element => element[0] !== "+");
		} else if (i >= curLength - 1) {
			workingList = componentList[curList].list.filter(element => element[element.length - 1] !== "+");
		} else {
			workingList = componentList[curList].list.filter(element => ((element[0] === "+") && (element[element.length - 1] === "+")));
		}

		result += workingList[getRandomIndex(workingList.length)];
	}

	return result.replace(/\+/g, "");
}

/// Helper function for random numbers.
function getRandomIndex(max) {
	return Math.floor(max * Math.random());
}

export const generateNames = function(dataset, nameInfo, resultCount) {
	var componentBucket;
	var results = [];

	componentBucket = getComponentLists(dataset, nameInfo);
	
	for (let i = 0; i < resultCount; i++) {
		var name = generateName(componentBucket).join(" ").replace(/- /g, "-").replace(/ >/g, "");

		if (name) {
			results.push(name);
		}
	}

	return results;
}

export const getFilterList = function(state) {
	const result = [];

	if (state.dataset) {
		const curCat = state.dataset.find(cat => cat.category === state.nameInfo.category);
		curCat.subcategories.forEach(subcat => result.push(...subcat.componentList.components.map(clist => clist.filter)));
	}

	return result.filter((item, index, self) => ((item) && (self.indexOf(item) === index)));
}
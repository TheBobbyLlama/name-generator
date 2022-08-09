// This file is a simple wrapper so the spell check implementation can be changed at any time.
import spelling from "spelling";
import dictionary from "spelling/dictionaries/en_US";

const checker = new spelling(dictionary);

export default function checkWordConflict(word, allowed) {
	// If we allow anything, then there can be no conflict.
	if ([ "all", "any" ].indexOf(allowed) > -1) {
		return false;
	}
	const result = checker.lookup(word, { suggest: false });

	// If names are allowed, then a generated name like "Michael" is not considered a conflict.
	if ((result?.found) && ([ "name", "names" ].indexOf(allowed) > -1)) {
		// console.log("Checking " + word, ": ", dictionary.indexOf(` ${word} `) === -1);
		return (dictionary.indexOf(` ${word} `) === -1);
	}

	return result?.found;
}
// This file is a simple wrapper so the spell check implementation can be changed at any time.
import spelling from "spelling";
import dictionary from "spelling/dictionaries/en_US";

const checker = new spelling(dictionary);

export default function checkSpelling(word) {
	const result = checker.lookup(word, { suggest: false });
	return result?.found;
}
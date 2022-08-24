import { useStoreContext } from "../../utils/GlobalState";

import { SET_RESULT_COUNT, GENERATE_NEW_RESULTS } from "../../utils/actions";

import "./ResultsPanel.css";

function ResultsPanel() {
	const [state, dispatch] = useStoreContext();

	if (!state.dataset) {
		return <></>;
	}

	const setResultCount = function(resultCount) {
		dispatch({ type: SET_RESULT_COUNT, resultCount })
	}

	const generateNewResults = function() {
		dispatch({ type: GENERATE_NEW_RESULTS });
	}

	return (
		<section id="resultsPanel">
			<div id="resultsHeader">
				<h2>Results</h2>
				<div>
					<button type="button" onClick={generateNewResults}>Generate</button>
					<select name="resultCount" value={state.resultCount} onChange={e => setResultCount(Number(e.target.value))}>
						<option>25</option>
						<option>50</option>
						<option>75</option>
						<option>100</option>
					</select>
					<label htmlFor="resultCount">Results</label>
				</div>
			</div>
			{(state.results.length) ?
				<div id="resultsList">
					{state.results.map((result, index) => { return (
						<div key={index + result.text} title={result.annotations.join(" + ")}>
							<div>{result.text}</div>
							<div title={`Copy ${result.text}`} onClick={e => { navigator.clipboard.writeText(result.text); }}><i className="fas fa-clipboard"></i></div></div>
					);})}
				</div>
			: <></>}
		</section>
	);
}

export default ResultsPanel;
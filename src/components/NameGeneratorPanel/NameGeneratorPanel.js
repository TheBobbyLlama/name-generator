import NameTypeSelection from "../NameTypeSelection/NameTypeSelection";
import NameFilters from "../NameFilters/NameFilters";
import ResultsPanel from "../ResultsPanel/ResultsPanel";

import "./NameGeneratorPanel.css";

function NameGeneratorPanel() {
	return (
		<>
			<div id="selectionBlocks">
				<NameTypeSelection />
				<NameFilters />
			</div>
			<ResultsPanel />
		</>
	);
}

export default NameGeneratorPanel;
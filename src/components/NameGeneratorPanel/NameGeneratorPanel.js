import NameTypeSelection from "../NameTypeSelection/NameTypeSelection";
import NameFilters from "../NameFilters/NameFilters";

import "./NameGeneratorPanel.css";

function NameGeneratorPanel() {
	return (
		<section>
			<div id="selectionBlocks">
				<NameTypeSelection />
				<NameFilters />
			</div>
		</section>
	);
}

export default NameGeneratorPanel;
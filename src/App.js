import { StoreProvider } from "./utils/GlobalState";

import NameGeneratorPanel from "./components/NameGeneratorPanel/NameGeneratorPanel";

import './App.css';

function App() {
  return (
    <StoreProvider>
      <h1>The Bobby Llama's Name Generator</h1>
      <NameGeneratorPanel />
    </StoreProvider>
  );
}

export default App;

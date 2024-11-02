import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import ScrollableTextInput from "./components/ScrollableTextInput";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      {/* <ScrollableTextInput /> */}
    </div>
  );
}

export default App;

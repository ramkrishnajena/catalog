import CatalogViewer from "./CatalogViewer";
import catalogData from "./api/fetchApi";

function App() {
  return <CatalogViewer images={catalogData} />;
}

export default App;

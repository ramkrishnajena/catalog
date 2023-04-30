import CatalogViewer from "./CatalogViewer";
import catalogData from "./api/fetchApi";

function App() {
  return
  <BrowserRouter
  <CatalogViewer images={catalogData} />;
}

export default App;

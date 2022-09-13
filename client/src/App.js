import './App.css';
import BaseTable from './components/Table'
import Page from './components/Page';

function App() {
  return (
    <div className="App">
      <header>
        {/* <BaseTable headers={["name", "calories", "fat", "carbs", "protein"]} rows={rows}/> */}
        <Page/>
      </header>
    </div>
  );
}

export default App;

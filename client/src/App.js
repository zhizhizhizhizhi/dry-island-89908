import './App.css';
import BaseTable from './components/Table'
import Teams from './components/Teams';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <BaseTable headers={["name", "calories", "fat", "carbs", "protein"]} rows={rows}/> */}
        <Teams filterOption={(team) => {return team.group == 2;}}/>
      </header>
    </div>
  );
}

export default App;

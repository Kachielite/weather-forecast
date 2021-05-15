import TitleBar from './AppComponents/TitleBar';
import SearchBar from './AppComponents/SearchBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <TitleBar/>
      <div className="container">
        <SearchBar/>
      </div>
    </div>
  );
}

export default App;

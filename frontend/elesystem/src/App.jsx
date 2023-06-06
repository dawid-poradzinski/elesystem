import './App.css';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App" style={{ backgroundImage: `url("../bg.jpg")` }}>
      <div className="flex items-center h-screen w-screen p-7 md:p-20">
        <div className="flex items-center justify-center w-full h-full bg-zinc-200/80 rounded-lg shadow-xl backdrop-blur-lg overflow-hidden">
          <Outlet className="w-full h-full"/>
        </div>
      </div>

    </div>
  );
}

export default App;

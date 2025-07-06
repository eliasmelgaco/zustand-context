import './App.css';

function App() {
  // tailwind setup
  return (
    <div className="py-8 px-8 max-w-sm mx-auto space-y-2 bg-white shadow-lg flex items-center gap-x-4">
      <div className="shink-0">
        <p className="text-xs">CC</p>
      </div>
      <div>
        <h4 className="text-xl font-medium text-black">ChitChat</h4>
        <p className="text-slate-500">You have a new message!</p>
      </div>
    </div>
  );
}

export default App;

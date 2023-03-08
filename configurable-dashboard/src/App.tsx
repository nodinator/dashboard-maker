import {  useGetRandomQuery } from './services/main';

import './App.css';




function App() {

    const { data, error, isLoading } = useGetRandomQuery("number",{
        pollingInterval: 500,
    })


  return (
    <div className="App">
     { error ? (
        <>Oh no, there was a loading error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
          <span>{data.number.first} </span>
      ) : (
        "No Data"
      )}
    </div>
  );
}

export default App;

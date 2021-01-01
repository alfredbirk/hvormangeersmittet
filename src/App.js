import React, { useState, useEffect } from 'react';
import './App.css';
import CountUp from 'react-countup';
import axios from 'axios';

const TIME_REFRESH = 1000 * 60; // 1min

const fetchData = async (setData) => {
  const result = await axios('https://api.covid19api.com/total/country/norway/status/confirmed');
  setData(result.data);
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData);

    const interval = setInterval(() => {
      fetchData(setData);
    }, TIME_REFRESH);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!data || data.length === 0) {
    return null
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <CountUp start={0} end={data[data.length-1].Cases} delay={0}>
            {({ countUpRef }) => (
              <div>
                <div className="Number" ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h1 className="Description">Personer smittet av Corona i Norge</h1>
        </div>
      </header>
    </div>
  );
}

export default App;

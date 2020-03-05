import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useCountUp } from 'react-countup';
import CountUp from 'react-countup';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://www.vg.no/spesial/2020/corona-viruset/data/norway/',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  
  if (!data.totals) {
    return null
  }



  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <CountUp start={0} end={data.totals.confirmed} delay={0}>
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

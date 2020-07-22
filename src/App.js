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
        'https://redutv-api.vg.no/corona/v1/front/topbox?region=municipality',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  
  if (!data.tableOverview) {
    return null
  }



  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <CountUp start={0} end={data.tableOverview.totals.confirmed} delay={0}>
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

import logo from './logo.svg';
import './App.css';
import { Server } from "./utils/config";
import { useState, useEffect } from 'react';
import api from './api/api';


function App() {

  const [bouquets, setBouquets ] = useState([]);

  useEffect(() => {
    const getBouquets = () => {      
      try {
        const data = api.listDocuments(Server.databaseID, Server.collectionID);
        data.then((response)=> {
          const bouqs = response.documents;
          setBouquets(bouqs);  
        })
      } catch (e) {
        console.log(e);
      }
    };
    getBouquets();
  }, []);

  const bouquetList = bouquets.map((bouq)=> {
    return (<div>{bouq.Name}</div>)
  });

  
 

  return (
    <div>
      {bouquetList}
    </div>
      
  );
}

export default App;

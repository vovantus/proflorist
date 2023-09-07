import { Server } from "../utils/config";
import { useState, useEffect } from 'react';
import api from '../api/api';



export default function BouquetList ({sorting}) {
const [bouquets, setBouquets ] = useState([]);

useEffect(() => {
  const getBouquets = () => {      
    try {
      const data = api.listDocuments(Server.databaseID, Server.collectionID);
      data.then((response)=> {
        const bouqs = response.documents;
        bouqs.sort((a,b)=> {
            if (sorting.direction === 'asc') {
                return a[sorting.field] > b[sorting.field] ? 1 : -1;
            } else {
                return a[sorting.field] < b[sorting.field] ? 1 : -1;
            }
        })
        setBouquets(bouqs);
      })
    } catch (e) {
      console.log(e);
    }
  };
  getBouquets();
}, [sorting]);



const bouquetList = bouquets.map((bouq)=> {
    console.log(bouq);
    return (
            <div className="bouquet" key={bouq.id}>
                <img className="bouquetImage" src={bouq.ImageUrl}></img>
                <h3>{bouq.Name}</h3>
                <h4>{bouq.Price}€</h4>
                <h7>{bouq.$createdAt}</h7>                
            </div>
            );
});



return (
  <div>
    {bouquetList}
  </div>  
);

}
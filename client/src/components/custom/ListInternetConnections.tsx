import React from 'react'
//import InternetType from "../../pages/Internet/NewInternet";
import type { InternetType } from '../../pages/Internet/Internet';
import Internet from '../../pages/Internet/Internet';
import MainInternetCard from './MainInternetCard';

const ListInternetConnections = ({
  connections,
}: {
  connections: InternetType[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        {connections.map((connection) => ( <MainInternetCard key={connection._id} connection={connection} />))}
      </div>
    </div>
  );
};

export default ListInternetConnections
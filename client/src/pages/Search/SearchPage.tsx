import { Search } from 'lucide-react';
import React, { use } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('term');
    //console.log(searchParams.get('term')); // This will log the search term from the URL
  return (
    <div>
      <div className="w-full bg-gray-300 p-4">
        <h2 className="font-xl font-semibold">Seatch results</h2>
      </div>

      <div className="w-full p-8 border-b-2 bg-white flex justify-center items-center">
        <form className="w-[80%] flex border-2 border-gray-300 rounded-full  p-4 ">
          <input
            type="text"
            name="search"
            placeholder="Search device, ticket..."
            defaultValue={searchTerm || ""}
            className="flex-1 placeholder-gray-400 focus:outline-none"
          />
          <button className='text-gray-600' type="submit"><Search/></button>
        </form>
      </div>
    </div>
  );
}

export default SearchPage
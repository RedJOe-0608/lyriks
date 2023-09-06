import React from 'react';
import { ArtistCard, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () =>{
const {data, isFetching } = useGetTopChartsQuery();

    if(isFetching) return <Loader title="Fetching Top Charts.." />

return (
<div className='flex flex-col'>
    <h2 className='text-white text-left font-bold text-3xl mb-8'>Top Artists 
    </h2>
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((track) => (
         <ArtistCard key={track.key} track={track} />

        ))}
    </div>

</div>

)

}

export default TopArtists;
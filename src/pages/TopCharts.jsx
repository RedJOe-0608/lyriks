import React from 'react';
import { useSelector } from 'react-redux';
import { Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () =>{
const {activeSong, isPlaying} = useSelector((state) => state.player);
    // console.log(country);
const {data, isFetching } = useGetTopChartsQuery();

    if(isFetching) return <Loader title="Fetching Top Charts.." />

return (
<div className='flex flex-col'>
    <h2 className='text-white text-left font-bold text-3xl mb-8'>Discover Top Charts 
    </h2>
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song,i) => (
            <SongCard
            song={song}
            i={i}
            key={song.key}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
            />

        ))}
    </div>

</div>

)

}

export default TopCharts;

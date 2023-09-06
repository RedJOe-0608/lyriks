import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () =>{
const [country, setCountry] = useState('');
const [loading, setLoading] = useState(true);
const {activeSong, isPlaying} = useSelector((state) => state.player);
    // console.log(country);
const {data, isFetching } = useGetSongsByCountryQuery(country);
    useEffect(() =>{
        //at_N6kNbjCOaRvaHSbbqSPT3qnFzjYTG
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_N6kNbjCOaRvaHSbbqSPT3qnFzjYTG`).then((res) => setCountry(res?.data?.location?.country)).catch((err) => console.log(err))
    },[country])

    if(isFetching &&loading) return <Loader title="Loading songs around you.." />

return (
<div className='flex flex-col'>
    <h2 className='text-white text-left font-bold text-3xl mb-8'>Around You <span className='font-bold text-white'>{country}</span>
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

export default AroundYou;

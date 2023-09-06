import { Error, Loader, SongCard  } from "../components";
import {genres} from '../assets/constants';
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";

const Discover = () =>{
    const dispatch = useDispatch();
    const {isPlaying,activeSong} = useSelector((state) => state.player);

    const {data, isFetching, error} = useGetTopChartsQuery();
    // console.log(isFetching);

    if(isFetching) return <Loader title='Loading Songs..' />
    if(error) return <Error />
    const genreTitle = 'Pop';
// console.log(genres);
return (
<div className="flex flex-col">
    <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
    <h2 className="text-white text-left text-3xl font-bold">Discover {genreTitle}</h2>
    <select
    onChange={() =>{}}
    value=""
    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 "
    >
        {genres.map((genre) =>{
            return (
                <option key={genre.value} value={genre.value}>{genre.title}</option>
            )
        })}
    </select>
    </div>
    <div className="w-full flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song,i) =>{
           return (
                <SongCard
                isPlaying={isPlaying}
                activeSong={activeSong}
                key={song.key}
                song={song}
                data={data}
                i={i}

                />
            )
        })}
    </div>
</div>

)
}


export default Discover;

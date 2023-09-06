import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => 
{
    const dispatch = useDispatch();
    const { activeSong, isPlaying} = useSelector((state) =>{
        console.log(state);
        return state.player;
    })
    const {songid} = useParams();
    // console.log(songid);
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid});
    const {data, isFetching: isFetchingRelatedSongs} = useGetSongsRelatedQuery({songid});
    console.log(songData);
    if(isFetchingRelatedSongs || isFetchingSongDetails) {
        return <Loader title="Searching Song Details..." />
    }

    const handlePauseClick = () => {
        dispatch(playPause(false));
      }
      const handlePlayClick = (song,i) => {
        dispatch(setActiveSong({song, i, data}))
        dispatch(playPause(true));
      }

    return (

        <div className="flex flex-col">
            <DetailsHeader artistId='' songData={songData} />
            <div className="mb-10">

            <h2 className="text-white text-3xl font-bold"> Lyrics: </h2>
            <div className="mt-5 ">
                {songData?.sections[1].type==='LYRICS' ?
                songData?.sections[1].text.map((lyric,i) =>{
                    return (
                        <p key={i} className="text-gray-400 mb-2 text-base">{lyric}</p>
                    )
                }) : 'Sorry... Lyrics for this song cannot be rendered.'}
            </div>
            </div>
                <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                
                />
        </div>
    )
}


export default SongDetails;

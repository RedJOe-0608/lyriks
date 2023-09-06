import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => 
{

    const { activeSong, isPlaying} = useSelector((state) =>{
        console.log(state);
        return state.player;
    })
    const {id} = useParams();
    // console.log(songid);
    const {data: artistData, isFetching: isFetchingArtistDetails} = useGetArtistDetailsQuery({id});
    console.log(artistData);
    if(isFetchingArtistDetails) {
        return <Loader title="Searching Artist Details..." />
    }

    return (

        <div className="flex flex-col">
            <DetailsHeader artistId={id} artistData={artistData} />
            
                <RelatedSongs
                data={Object.values(artistData?.songs)}
                artistId={id }
                isPlaying={isPlaying}
                activeSong={activeSong}
                
                />
        </div>
    )
}


export default ArtistDetails;
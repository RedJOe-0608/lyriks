import SongBar from "./SongBar";

const RelatedSongs = ({data,isPlaying,activeSong,handlePauseClick,handlePlayClick,artistId}) => (
  <div className="flex flex-col">
    <h1 className="text-white text-3xl font-bold">Related Songs</h1>
    <div className="flex flex-col w-full mt-6">
      {data?.map((song,i) =>{
        return (
          <SongBar
          key={`${song.key} - ${artistId}`}
          i={i}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          artistId={artistId}
          />
        )
      })}
    </div>
  </div>
);

export default RelatedSongs;

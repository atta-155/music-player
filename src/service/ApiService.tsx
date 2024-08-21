import { Album, Track } from "../models/ViewModel";
import Api from "./Api";

export default class ApiService {
    constructor() {
    }

    baseUrl = process.env.REACT_APP_BASE_URL!!;
    api = new Api({ baseUrl: this.baseUrl });

    getRecentlyPlaySongs = async (): Promise<Track[]> => {

        return this.api.getRecentlyPlaySongs().then(res => {
            let data: Track[] = res.map(item => {
                return {
                    id: item.idTrack,
                    title: item.strTrack,
                    artist: item.strArtist,
                    duration: millisecondsToMinutesSeconds(item.intDuration)
                }
            })
            return data;
        })
    }

    getRecommendedSongs = async (): Promise<Album[]> => {
        
        return this.api.getRecommendedSongs().then(res => {
            let data: Album[] = res.map(item => {
                return {
                    title: item.strAlbum,
                    artist: item.strArtist,
                    thumbImg: item.strAlbumThumb
                }
            })
            return data;
        })
    }

    
    getCurrentPlay = async (trackId: string): Promise<Track> => {
        return this.api.getCurrentPlay(trackId).then(res => {
            let data: Track = {
                    id: res.idTrack,
                    title: res.strTrack,
                    artist: res.strArtist,
                    duration: millisecondsToMinutesSeconds(res.intDuration)
                }
            
            return data;
        })
    }

}


function millisecondsToMinutesSeconds(milliseconds: number) {
    // Calculate total seconds
    const totalSeconds = Math.floor(milliseconds / 1000);
    
    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    // Format the result as a string
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
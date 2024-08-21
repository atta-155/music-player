import React from "react";
import { Track } from "../models/ViewModel";
import { AlbumDTO, TrackDTO } from "../models/RestModel";

interface ApiProps {
    baseUrl: string;
}

export default class Api extends React.Component<ApiProps> {
    constructor(props: ApiProps) {
        super(props);
    }
    apikey = process.env.REACT_APP_API_KEY;

    getRecentlyPlaySongs = async (): Promise<TrackDTO[]> => {
        const url = this.props.baseUrl + this.apikey + "/track.php?m=2115888";
        try {
            const response = await fetch(url);
            const data= await response.json();
            const tracks: TrackDTO[] = data.track.slice(0,4);
            return tracks;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    getRecommendedSongs = async (): Promise<AlbumDTO[]> => {
        const url = this.props.baseUrl + this.apikey + "/searchalbum.php?s=daft_punk";

        try {
            const response = await fetch(url);
            const data= await response.json();
            const albums: AlbumDTO[] = data.album.slice(0,3);
            return albums;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    getCurrentPlay = async (trackId: string): Promise<TrackDTO> => {
        const url = this.props.baseUrl + this.apikey + "/track.php?h="+trackId;

        try {
            const response = await fetch(url);
            const data= await response.json();
            const track: TrackDTO = data.track[0];
            return track;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

}
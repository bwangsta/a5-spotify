import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ArtistData } from "../data/artist-data";
import { AlbumData } from "../data/album-data";
import { TrackData } from "../data/track-data";
import { ResourceData } from "../data/resource-data";
import { ProfileData } from "../data/profile-data";
import { TrackFeature } from "../data/track-feature";
import { Location } from "@angular/common";

@Injectable({
    providedIn: "root",
})
export class SpotifyService {
    expressBaseUrl: string = "http://localhost:8888";
    link: string;

    constructor(private http: HttpClient, private _location: Location) { }

    private sendRequestToExpress(endpoint: string): Promise<any> {
        //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
        //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
        //update the return to instead return a Promise with the data from the Express server
        let promise = this.http.get(this.expressBaseUrl + endpoint).toPromise();

        return Promise.resolve(promise);
    }

    back() {
        this._location.back();
    }

    forward() {
        this._location.forward();
    }

    aboutMe(): Promise<ProfileData> {
        //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
        return this.sendRequestToExpress("/me").then((data) => {
            return new ProfileData(data);
        });
    }

    searchFor(category: string, resource: string): Promise<ResourceData[]> {
        //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
        //Make sure you're encoding the resource with encodeURIComponent().
        //Depending on the category (artist, track, album), return an array of that type of data.
        //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
        let resourceArray: ResourceData[] = [];

        resource = encodeURIComponent(resource);
        return this.sendRequestToExpress(`/search/${category}/${resource}`).then((data) => {
            if (category === "artist") {
                data["artists"]["items"].forEach((element) => {
                    resourceArray.push(new ArtistData(element));
                });
            } else if (category === "album") {
                data["albums"]["items"].forEach((element) => {
                    resourceArray.push(new AlbumData(element));
                });
            } else if (category === "track") {
                data["tracks"]["items"].forEach((element) => {
                    resourceArray.push(new TrackData(element));
                });
            }

            return resourceArray;
        });
    }

    getArtist(artistId: string): Promise<ArtistData> {
        //TODO: use the artist endpoint to make a request to express.
        //Again, you may need to encode the artistId.
        artistId = encodeURIComponent(artistId);

        return this.sendRequestToExpress(`/artist/${artistId}`).then((data) => {
            return new ArtistData(data);
        });
    }

    getRelatedArtists(artistId: string): Promise<ArtistData[]> {
        //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
        let artistArray: ArtistData[] = [];

        artistId = encodeURIComponent(artistId);
        return this.sendRequestToExpress(`/artist-related-artists/${artistId}`).then((data) => {
            data["artists"].forEach((element) => {
                artistArray.push(new ArtistData(element));
            });

            return artistArray;
        });
    }

    getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
        //TODO: use the top tracks endpoint to make a request to express.
        let tracksArray: TrackData[] = [];

        artistId = encodeURIComponent(artistId);
        return this.sendRequestToExpress(`/artist-top-tracks/${artistId}`).then((data) => {
            data["tracks"].forEach((element) => {
                tracksArray.push(new TrackData(element));
            });

            return tracksArray;
        });
    }

    getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
        //TODO: use the albums for an artist endpoint to make a request to express.
        let albumsArray: AlbumData[] = [];

        artistId = encodeURIComponent(artistId);
        return this.sendRequestToExpress(`/artist-albums/${artistId}`).then((data) => {
            data["items"].forEach((element) => {
                albumsArray.push(new AlbumData(element));
            });

            return albumsArray;
        });
    }

    getAlbum(albumId: string): Promise<AlbumData> {
        //TODO: use the album endpoint to make a request to express.
        albumId = encodeURIComponent(albumId);

        return this.sendRequestToExpress(`/album/${albumId}`).then((data) => {
            return new AlbumData(data);
        });
    }

    getTracksForAlbum(albumId: string): Promise<TrackData[]> {
        //TODO: use the tracks for album endpoint to make a request to express.
        let tracksArray: TrackData[] = [];

        albumId = encodeURIComponent(albumId);
        return this.sendRequestToExpress(`/album-tracks/${albumId}`).then((data) => {
            data["items"].forEach((element) => {
                tracksArray.push(new TrackData(element));
            });

            return tracksArray;
        });
    }

    getTrack(trackId: string): Promise<TrackData> {
        //TODO: use the track endpoint to make a request to express.
        trackId = encodeURIComponent(trackId);

        return this.sendRequestToExpress(`/track/${trackId}`).then((data) => {
            return new TrackData(data);
        });
    }

    getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
        //TODO: use the audio features for track endpoint to make a request to express.
        let featuresArray: TrackFeature[] = [];

        trackId = encodeURIComponent(trackId);
        return this.sendRequestToExpress(`/track-audio-features/${trackId}`).then((data) => {
            for (const feature of TrackFeature.FeatureTypes) {
                featuresArray.push(new TrackFeature(feature, data[feature]));
            }

            return featuresArray;
        });
    }
}

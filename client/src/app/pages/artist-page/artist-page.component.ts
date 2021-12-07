import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";
import { SpotifyService } from "src/app/services/spotify.service";
import { PredictionEvent } from "src/app/prediction-event";

@Component({
    selector: "app-artist-page",
    templateUrl: "./artist-page.component.html",
    styleUrls: ["./artist-page.component.css"],
})
export class ArtistPageComponent implements OnInit {
    artistId: string;
    artist: ArtistData;
    relatedArtists: ArtistData[];
    topTracks: TrackData[];
    albums: AlbumData[];
    gesture: string;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.artistId = this.route.snapshot.paramMap.get("id");
        //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
        this.spotifyService.getArtist(this.artistId).then((data) => {
            // gets artist data from spotify
            this.artist = data; // sets the retrieved data to this.artist
            this.spotifyService.link = this.artist.url;
        });

        this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
            this.relatedArtists = data;
        });

        this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
            this.albums = data;
        });

        this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
            this.topTracks = data;
        });

        let artistURI = "https://open.spotify.com/embed/artist/" + this.artistId;
        document.querySelector("#musicPlayer").setAttribute("src", artistURI);
    }

    prediction(event: PredictionEvent) {
        this.gesture = event.getPrediction();
        if (this.gesture === "Two Closed Hands") {
            window.location.href = this.spotifyService.link;
        } else if (this.gesture === "Swiping Right") {
            this.spotifyService.back();
        } else if (this.gesture === "Swiping Left") {
            this.spotifyService.forward();
        }
        else if (this.gesture === "Hand Pointing") {
            let topTrackId = this.topTracks[0].id;
            window.location.href = "track/" + topTrackId;
        }
    }
}

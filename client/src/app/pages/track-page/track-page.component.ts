import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";
import { TrackFeature } from "../../data/track-feature";
import { SpotifyService } from "src/app/services/spotify.service";
import { PredictionEvent } from "src/app/prediction-event";

@Component({
    selector: "app-track-page",
    templateUrl: "./track-page.component.html",
    styleUrls: ["./track-page.component.css"],
})
export class TrackPageComponent implements OnInit {
    trackId: string;
    track: TrackData;
    audioFeatures: TrackFeature[];
    gesture: string;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.trackId = this.route.snapshot.paramMap.get("id");
        //TODO: Inject the spotifyService and use it to get the track data and it's audio features
        this.spotifyService.getTrack(this.trackId).then((data) => {
            this.track = data;
            this.spotifyService.link = this.track.url;
        });

        this.spotifyService.getAudioFeaturesForTrack(this.trackId).then((data) => {
            this.audioFeatures = data;
            console.log(this.audioFeatures);
        });

        let trackURI = "https://open.spotify.com/embed/track/" + this.trackId;
        document.querySelector("#musicPlayer").setAttribute("src", trackURI);
    }

    // prediction(event: PredictionEvent) {
    //     this.gesture = event.getPrediction();
    //     if (this.gesture === "Two Closed Hands") {
    //         window.location.href = this.spotifyService.link;
    //     }
    //     else if (this.gesture === "Hand Pinching") {
    //         window.location.href = "/";
    //     }
    // }
}

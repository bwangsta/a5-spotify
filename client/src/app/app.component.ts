import { Component } from '@angular/core';
import { PredictionEvent } from "./prediction-event";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    gesture: String = "";
    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void { }

    prediction(event: PredictionEvent) {
        this.gesture = event.getPrediction();
        if (this.gesture === "Two Closed Hands") {
            window.location.href = this.spotifyService.link;
        } else if (this.gesture === "Closed Hand") {
            window.location.href = "http://localhost:8888/login";
        } else if (this.gesture === "Swiping Right") {
            this.spotifyService.back();
        } else if (this.gesture === "Swiping Left") {
            this.spotifyService.forward();
        }
        // else if (this.gesture === "Hand Pointing") {
        //     let topTrackId = this.topTracks[0].id;
        //     window.location.href = "track/" + topTrackId;
        // }
        else if (this.gesture === "Hand Pinching") {
            window.location.href = "/";
        }
    }
}

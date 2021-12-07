import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../../prediction-event";
import { SpotifyService } from "src/app/services/spotify.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  constructor(private spotifyService: SpotifyService, private _location: Location) {}

  ngOnInit(): void {}

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    if (this.gesture === "Two Closed Hands") {
      window.location.href = this.spotifyService.link;
    } else if (this.gesture === "Open Hand") {
      window.location.href = "http://localhost:8888/login";
    } else if (this.gesture === "Swiping Right") {
      this._location.back();
    } else if (this.gesture === "Swiping Left") {
      this._location.forward();
    }
  }
}

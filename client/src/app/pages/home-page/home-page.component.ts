import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../../prediction-event";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {}

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    if (this.gesture === "Two Closed Hands") {
      window.location.href = this.spotifyService.link;
    }
  }
}

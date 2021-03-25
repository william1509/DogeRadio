import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from 'src/app/services/music-player/music-player.service';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

    constructor(public musicPlayerService: MusicPlayerService) { }

    ngOnInit(): void {
    }
    public PlayClicked(): void {
        this.musicPlayerService.playState = !this.musicPlayerService.playState;
        var button = document.getElementById('play-button') as HTMLButtonElement;
        if (this.musicPlayerService.playState) {
            button.style.backgroundImage = 'url(\'../../../assets/pause-button.png\')';
            this.musicPlayerService.audioPlayerElement.play();

        } else {
            button.style.backgroundImage = 'url(\'../../../assets/play-button.png\')';
            this.musicPlayerService.audioPlayerElement.pause();
        }
    }
    public TimeChanged(): void {
        let slider = document.getElementById('slider-progress') as HTMLInputElement; 
        let currentTime = (parseInt(slider.value) / 1000) * this.musicPlayerService.audioPlayerElement.duration; 
        this.musicPlayerService.audioPlayerElement.currentTime = currentTime;
    }
    public VolumeChanged(event: Event): void {
        this.musicPlayerService.audioPlayerElement.volume = parseInt((event.target as HTMLInputElement).value) / 100;
    }

}

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
        if (this.musicPlayerService.playState) {
            this.musicPlayerService.buttonLogo = 'pause';
            this.musicPlayerService.audioPlayerElement.play();

        } else {
            this.musicPlayerService.buttonLogo = 'play_arrow';
            this.musicPlayerService.audioPlayerElement.pause();
        }
    }
    public NextClicked(): void {
        this.musicPlayerService.PlayNext();
    }
    public PreviousNext(): void {
        
    }

    public TimeChanged(): void {
        let slider = document.getElementById('slider-progress') as HTMLInputElement; 
        let currentTime = (parseInt(slider.value) / 1000) * this.musicPlayerService.audioPlayerElement.duration; 
        this.musicPlayerService.audioPlayerElement.currentTime = currentTime;
    }
    public VolumeChanged(event: Event): void {
        this.musicPlayerService.audioPlayerElement.volume = parseInt((event.target as HTMLInputElement).value) / 100;
    }

    public CheckIfEmptySong(): boolean {
        return this.musicPlayerService.currentSong.song_id === '';
    }
    
}

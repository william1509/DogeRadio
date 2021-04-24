import { Component, OnInit } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { MusicPlayerService } from '../../services/music-player/music-player.service';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

    public sliderVolumeValue = 50;

    constructor(public musicPlayerService: MusicPlayerService) { }

    ngOnInit(): void {
        this.sliderVolumeValue = this.musicPlayerService.audioPlayerElement.volume * 100;
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
    public PreviousClicked(): void {
        this.musicPlayerService.PlayPrevious();
    }

    public TimeChanged(event: any): void {
        let slider = event as MatSlider;
        console.log(slider)

        let currentTime = (slider.value / 1000) * this.musicPlayerService.audioPlayerElement.duration; 

        if(isNaN(currentTime)) {
            return;
        }
        this.musicPlayerService.audioPlayerElement.currentTime = currentTime;
    }
    
    public VolumeChanged(event: any): void {
        this.musicPlayerService.audioPlayerElement.volume = ((event as MatSlider).value) / 100;
    }

    public GetCurrentSong(): string {
        if(this.musicPlayerService.currentSong.song_id === '') {
            return 'No song playing';
        }
        return this.musicPlayerService.currentSong.title;
    }

    public ToggleMute(): void {
        this.musicPlayerService.ToggleMute();
    }

    public ToggleMaxVolume(): void {
        this.musicPlayerService.ToggleMaxVolume();
    }
    
}

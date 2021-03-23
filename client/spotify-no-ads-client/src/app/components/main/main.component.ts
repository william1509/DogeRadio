import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { MusicPlayerService } from 'src/app/services/music-player/music-player.service';
import { Video } from 'src/app/services/Video';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
    constructor(public musicGetterService: MusicGetterService, public musicPlayerService: MusicPlayerService) {
        
    }

    ngOnInit(): void {
        this.musicPlayerService.audioPlayerElement = document.getElementById('player') as HTMLAudioElement;
    }
    

    

    public VolumeChanged(event: Event): void {
        this.musicPlayerService.audioPlayerElement.volume = parseInt((event.target as HTMLInputElement).value) / 100;
    }



    public PlayClicked(): void {
        this.musicPlayerService.playState = !this.musicPlayerService.playState;
        var button = document.getElementById('play-button') as HTMLButtonElement;
        if(this.musicPlayerService.playState) {
            button.style.backgroundImage = 'url(\'../../../assets/pause-button.png\')';
            this.musicPlayerService.audioPlayerElement.play();

        } else {
            button.style.backgroundImage = 'url(\'../../../assets/play-button.png\')';
            this.musicPlayerService.audioPlayerElement.pause();
        }
    }

    public AudioEnded(): void {
        var button = document.getElementById('play-button') as HTMLButtonElement;
        button.style.backgroundImage = 'url(\'../../../assets/play-button.png\')';
        this.musicPlayerService.playState = false;
    }

    public TimeUpdate(): void {
        var progressSlider = document.getElementById('slider-progress') as HTMLInputElement;
        const currentProgress = Math.round((this.musicPlayerService.audioPlayerElement.currentTime / this.musicPlayerService.audioPlayerElement.duration) * 1000).toString();
        progressSlider.value = currentProgress;
    }

    public TimeChanged(): void {
        let slider = document.getElementById('slider-progress') as HTMLInputElement; 
        let currentTime = (parseInt(slider.value) / 1000) * this.musicPlayerService.audioPlayerElement.duration; 
        this.musicPlayerService.audioPlayerElement.currentTime = currentTime;
    }

}

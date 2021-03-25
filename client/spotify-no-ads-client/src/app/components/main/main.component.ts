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



}

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
        this.musicPlayerService.audioPlayerElement.volume = 0.5;
        this.musicGetterService.GetPlaylists();
    }

    public AudioEnded(): void {
        this.musicPlayerService.buttonLogo = 'play_arrow';
        this.musicPlayerService.playState = false;
        this.musicPlayerService.PlayNext();
    }

    public TimeUpdate(): void {
        const currentProgress = Math.round((this.musicPlayerService.audioPlayerElement.currentTime / this.musicPlayerService.audioPlayerElement.duration) * 1000);
        this.musicPlayerService.sliderMusicProgression = currentProgress;
    }
}

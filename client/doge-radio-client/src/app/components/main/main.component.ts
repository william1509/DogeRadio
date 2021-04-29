import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { MusicPlayerService } from '../../services/music-player/music-player.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
    constructor(public backendService: BackendService, public musicPlayerService: MusicPlayerService) {
        
    }

    ngOnInit(): void {
        this.musicPlayerService.audioPlayerElement = document.getElementById('player') as HTMLAudioElement;
        this.musicPlayerService.audioPlayerElement.volume = 0.5;
        this.backendService.GetPlaylists();
    }

    public AudioEnded(): void {
        this.musicPlayerService.buttonLogo = 'play_arrow';
        this.musicPlayerService.playState = false;
        this.musicPlayerService.previousSongs.enqueue(this.musicPlayerService.songQueue.head);

        this.musicPlayerService.PlayNext();
    }

    public TimeUpdate(): void {
        const currentProgress = Math.round((this.musicPlayerService.audioPlayerElement.currentTime / this.musicPlayerService.audioPlayerElement.duration) * 1000);
        this.musicPlayerService.sliderMusicProgression = currentProgress;
    }
}

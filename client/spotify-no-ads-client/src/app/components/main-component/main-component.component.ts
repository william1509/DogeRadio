import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { Video } from 'src/app/services/Video';

@Component({
    selector: 'app-main-component',
    templateUrl: './main-component.component.html',
    styleUrls: ['./main-component.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponentComponent implements OnInit {
    public keyword: string;
    private playState: boolean;
    private audioPlayerElement!: HTMLAudioElement;
    public currentSongName: string;
    constructor(public musicGetterService: MusicGetterService) {
        this.currentSongName = "No song playing";
        this.keyword = "";
        this.playState = false;
    }

    ngOnInit(): void {
        this.audioPlayerElement = document.getElementById('player') as HTMLAudioElement;
    }
    public ButtonClicked(): void {
        if(this.keyword != '') {
            this.musicGetterService.SearchForSong(this.keyword);
        }
    }

    public SongClicked(video_id: string, songTitle: string) {
        this.musicGetterService.DownloadFromServer(video_id).subscribe(response => {
            console.log('RESPONSE' + response);
            var data_url = URL.createObjectURL(response);
            this.audioPlayerElement.setAttribute('src', data_url);
            var button = document.getElementById('play-button') as HTMLButtonElement;
            var progressSlider = document.getElementById('slider-progress') as HTMLInputElement;
            progressSlider.value = '1';
            this.currentSongName = songTitle;
            button.style.backgroundImage = 'url(\'../../../assets/pause-button.png\')';
            this.playState = true;
            this.audioPlayerElement.play();

        });
    }

    public VolumeChanged(event: Event): void {
        this.audioPlayerElement.volume = parseInt((event.target as HTMLInputElement).value) / 100;
    }

    public VerifyInput(event: Event): void {
        let kEvent = event as KeyboardEvent
        if(kEvent.key == 'Enter') {
            this.musicGetterService.SearchForSong(this.keyword);
        }
    }

    public PlayClicked(): void {
        this.playState = !this.playState;
        var button = document.getElementById('play-button') as HTMLButtonElement;
        if(this.playState) {
            button.style.backgroundImage = 'url(\'../../../assets/pause-button.png\')';
            this.audioPlayerElement.play();

        } else {
            button.style.backgroundImage = 'url(\'../../../assets/play-button.png\')';
            this.audioPlayerElement.pause();
        }
    }

    public AudioEnded(): void {
        var button = document.getElementById('play-button') as HTMLButtonElement;
        button.style.backgroundImage = 'url(\'../../../assets/play-button.png\')';
        this.playState = false;
    }

    public TimeUpdate(): void {
        var progressSlider = document.getElementById('slider-progress') as HTMLInputElement;
        const currentProgress = Math.round((this.audioPlayerElement.currentTime / this.audioPlayerElement.duration) * 1000).toString();
        progressSlider.value = currentProgress;
    }

    public GetPlaylists(): void {
        this.musicGetterService.GetPlaylists().subscribe(response => {
            console.log("hello");
        });
    }

    public TimeChanged(): void {
        let slider = document.getElementById('slider-progress') as HTMLInputElement; 
        let currentTime = (parseInt(slider.value) / 1000) * this.audioPlayerElement.duration; 
        this.audioPlayerElement.currentTime = currentTime;
    }

}

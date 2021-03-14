import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';

@Component({
    selector: 'app-main-component',
    templateUrl: './main-component.component.html',
    styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {
    public keyword: string;
    private playState: boolean;
    private audioPlayerElement!: HTMLAudioElement;
    constructor(public musicGetterService: MusicGetterService) {
        
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
        //this.musicGetterService.songs.push(new Video("lol", "lol", "lol", "WOWOOW", "TITLELELE", "tofday", "wow", "fefs", "XqZsoesa55w", "dsadsa"));
        // this.musicGetterService.songs.push(new Video("lol", "lol", "lol", "WOWOOW", "54534543", "tofday", "wow", "fefs", "dfsadsa", "dsadsa"));
    }

    public SongClicked(video_id: string) {
        this.musicGetterService.DownloadFromServer(video_id);
        var button = document.getElementById('play-button') as HTMLButtonElement;
        button.style.backgroundImage = 'url(\'../../../assets/pause-button.png\')';
        this.audioPlayerElement.play();
    }

    public VolumeChanged(event: Event): void {
        var player = document.getElementById('player') as HTMLAudioElement;
        player.volume = parseInt((event.target as HTMLInputElement).value) / 100;
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

}

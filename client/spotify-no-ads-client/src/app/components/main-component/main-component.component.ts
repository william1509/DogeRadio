import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { Video } from '../../services/Video'

@Component({
    selector: 'app-main-component',
    templateUrl: './main-component.component.html',
    styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {
    @ViewChild('player') audioPlayer!: ElementRef;
    public keyword: string;
    constructor(public musicGetterService: MusicGetterService) {
        this.keyword = "";
    }

    ngOnInit(): void {

    }
    public ButtonClicked(): void {
        this.musicGetterService.SearchForSong(this.keyword);
        //this.musicGetterService.songs.push(new Video("lol", "lol", "lol", "WOWOOW", "TITLELELE", "tofday", "wow", "fefs", "XqZsoesa55w", "dsadsa"));
        // this.musicGetterService.songs.push(new Video("lol", "lol", "lol", "WOWOOW", "54534543", "tofday", "wow", "fefs", "dfsadsa", "dsadsa"));
    }

    public SongClicked(video_id: string) {
        this.musicGetterService.DownloadFromServer(video_id);

    }

    public VolumeChanged(event: Event): void {
        var player = document.getElementById('player') as HTMLAudioElement;
        player.volume = parseInt((event.target as HTMLInputElement).value) / 100;
    }

}

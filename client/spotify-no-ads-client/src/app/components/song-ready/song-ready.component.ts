import { Component, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { Video } from 'src/app/services/Video';

@Component({
    selector: 'app-song-ready',
    templateUrl: './song-ready.component.html',
    styleUrls: ['./song-ready.component.scss']
})
export class SongReadyComponent implements OnInit {
    public readySongs: Video[];
    constructor(public musicGetterService: MusicGetterService) { 
        this.readySongs = new Array<Video>();
    }

    ngOnInit(): void {
        this.musicGetterService.GetReadySongs().subscribe(response => {
            this.readySongs = response as Video[];
        })
    }

}

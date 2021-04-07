import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { ParseToVideo, Video } from 'src/app/services/Video';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
    public readySongs: Video[];
    public showSearch: boolean;
    public keyword: string;

    constructor(public musicGetterService: MusicGetterService) { 
        this.keyword = '';
        this.showSearch = false;
        this.readySongs = new Array<Video>();
    }

    ngOnInit(): void {
        this.musicGetterService.GetReadySongs().subscribe(response => {
            let vid = Object.entries(response);
            for(let i = 0; i < vid.length; i++) {
                this.readySongs.push(ParseToVideo(vid[i][1]));
            }
        })
    }

    

    public ToggleSearch(): void {
        this.showSearch = !this.showSearch;
        this.keyword = '';
    }

    public GetSongs(): Video[] {
        let filteredSongs: Video[] = [];
        if(this.keyword === '') {
            return this.readySongs;
        }
        for(let i in this.readySongs) {
            if(this.readySongs[i].title.toLowerCase().search(this.keyword.toLowerCase()) != -1) {
                filteredSongs.push(this.readySongs[i])
            }
        }
        return filteredSongs;
    }

}

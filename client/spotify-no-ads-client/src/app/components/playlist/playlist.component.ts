import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    constructor(public musicGetterService: MusicGetterService) { 

    }

    ngOnInit(): void {
    }

}

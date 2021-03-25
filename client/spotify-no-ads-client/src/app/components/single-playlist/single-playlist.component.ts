import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { Playlist } from 'src/app/services/Playlist';

@Component({
    selector: 'app-single-playlist',
    templateUrl: './single-playlist.component.html',
    styleUrls: ['./single-playlist.component.css']
})
export class SinglePlaylistComponent implements OnInit {

    public songs: string[];
    constructor(@Inject(MAT_DIALOG_DATA) public playlist: Playlist, public musicGetterService: MusicGetterService) {
        this.songs = [];
    }

    ngOnInit(): void {
        this.musicGetterService.GetSongsInPlaylist(this.playlist);
    }

}

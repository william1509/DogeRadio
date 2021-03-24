import { Component, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    constructor(public musicGetterService: MusicGetterService, public dialog: MatDialog) { 

    }

    ngOnInit(): void {
    }
    
    public CreatePlaylist(): void {
        const dialogRef = this.dialog.open(CreatePlaylistComponent);
    }

}

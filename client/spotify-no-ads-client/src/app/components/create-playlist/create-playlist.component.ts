import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';

@Component({
    selector: 'app-create-playlist',
    templateUrl: './create-playlist.component.html',
    styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<CreatePlaylistComponent>, public musicGetterService: MusicGetterService) { }

    ngOnInit(): void {
    }

    public CheckClicked(event: Event): void {
        let name = (document.getElementById('playlist-name-input') as HTMLInputElement).value;
        this.musicGetterService.CreatePlaylist(name);
    }
}

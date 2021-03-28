import { Component, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Playlist } from 'src/app/services/Playlist';
import { SinglePlaylistComponent } from '../single-playlist/single-playlist.component';

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
        const dialogRef = this.dialog.open(CreatePlaylistComponent, {
            width: '30%'
        });
    }

    public DeleteClicked(playlist: Playlist): void {
        let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this playlist ?"

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.musicGetterService.DeletePlaylist(playlist);
            }
        });
    }

    public ShowPlaylist(playlist: Playlist): void {
        const dialogRef = this.dialog.open(SinglePlaylistComponent, {
            width: '30%',
            data: playlist
        });
    }

}

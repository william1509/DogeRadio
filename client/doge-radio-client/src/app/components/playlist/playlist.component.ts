import { Component, OnInit, Type } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Playlist } from '../../services/Playlist';
import { SinglePlaylistComponent } from '../single-playlist/single-playlist.component';
import { MusicPlayerService } from '../../services/music-player/music-player.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    constructor(public backendService: BackendService, public musicPlayerService: MusicPlayerService, public dialog: MatDialog) {

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
                this.backendService.DeletePlaylist(playlist);
            }
        });
    }

    public ShowPlaylist(playlist: Playlist): void {
        const dialogRef = this.dialog.open(SinglePlaylistComponent, {
            width: '30%',
            data: playlist
        });
    }
    
    public PlayClicked(playlist: Playlist, shuffle: boolean): void {
        this.musicPlayerService.PlayPlaylist(playlist, shuffle);
    }

}

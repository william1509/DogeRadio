import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from '../../services/backend/backend.service';
import { MusicPlayerService } from '../../services/music-player/music-player.service';
import { Playlist } from '../../services/Playlist';
import { Video } from '../../services/Video';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-single-playlist',
    templateUrl: './single-playlist.component.html',
    styleUrls: ['./single-playlist.component.scss']
})
export class SinglePlaylistComponent implements OnInit {
    @ViewChild('input', { static: false }) inputRef!: ElementRef;

    public songs: Video[];
    public inputChanged: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public playlist: Playlist,
                public backendService: BackendService,
                public musicPlayerService: MusicPlayerService
    ) {
        this.songs = [];
    }

    ngOnInit(): void {
        this.backendService.GetSongsInPlaylist(this.playlist, false).subscribe(response => {
            this.songs = response;
        });

    }

    public CheckIfPlaylistEmpty(): boolean {
        return this.songs.length === 0;
    }

    public DeleteClicked(song: Video): void {
        const songIndex = this.songs.indexOf(song);
        this.songs.splice(songIndex, 1);
        this.backendService.DeleteSongFromPlaylist(song, this.playlist);
    }

    public SongClicked(song: Video): void {
        const index = this.songs.indexOf(song);
        
        let songs = this.songs.slice(index);
        this.musicPlayerService.PlaySongs(songs);
    }

    public EditTitleClicked(): void {
        let newName = (this.inputRef.nativeElement as HTMLInputElement).value;
        this.backendService.ChangePlaylistTitle(newName, this.playlist).then(response => {
            this.playlist.playlist_title = newName;
        });
    }

    public SongDropped(event: CdkDragDrop<Video[]>): void {
        moveItemInArray(this.songs, event.previousIndex, event.currentIndex);    
        this.backendService.ChangeSongOrder(this.songs, this.playlist);

    }
}

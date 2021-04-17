import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MusicPlayerService } from 'src/app/services/music-player/music-player.service';
import { Playlist } from 'src/app/services/Playlist';
import { Video } from 'src/app/services/Video';

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
        this.backendService.GetSongsInPlaylist(this.playlist).subscribe(response => {
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
        console.log(songs);
        this.musicPlayerService.PlaySongs(songs);
    }

    public EditTitleClicked(): void {
        let newName = (this.inputRef.nativeElement as HTMLInputElement).value;
        this.backendService.ChangePlaylistTitle(newName, this.playlist).then(response => {
            this.playlist.playlist_title = newName;
        });
    }
}

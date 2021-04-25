import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { MusicPlayerService } from '../../services/music-player/music-player.service';
import { Playlist } from '../../services/Playlist';
import { Video } from '../../services/Video';

@Component({
    selector: 'app-song-display',
    templateUrl: './song-display.component.html',
    styleUrls: ['./song-display.component.scss']
})
export class SongDisplayComponent implements OnInit {

    @Input()
    public song: Video;

    @Input()
    public showDetails: boolean;

    @Input()
    public showThumbnail: boolean;

    public selectedValue: string;
    public showPlaylist: boolean;

    constructor(public musicPlayerService: MusicPlayerService, public backendService: BackendService) {
        this.showDetails = true;
        this.showThumbnail = true;
        this.selectedValue = 'WOOWO';
        this.song = this.musicPlayerService.DefaultCurrentSong();
        this.showPlaylist = false

    }

    ngOnInit(): void {
    }

    public SongClicked(song: Video) {
        this.musicPlayerService.PlayNow(song);

    }
    public ToggleShowPlaylist(song: Video): void {
        this.showPlaylist = !this.showPlaylist;
    }

    public AddToQueue(song: Video): void {
        this.musicPlayerService.AddToSongsQueue([song]);
        if(this.musicPlayerService.currentSong.song_id === '') {
            this.musicPlayerService.PlayNext();
        }
        

    }

    public PlaylistClicked(playlist: Playlist, song: Video): void {
        this.ToggleShowPlaylist(song);
        this.backendService.AddSongToPlaylist(playlist, song);
    }

}

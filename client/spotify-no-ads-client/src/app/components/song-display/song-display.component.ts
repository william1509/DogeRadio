import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MusicPlayerService } from 'src/app/services/music-player/music-player.service';
import { Playlist } from 'src/app/services/Playlist';
import { Video } from 'src/app/services/Video';

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
    public showPlaylist: boolean[];

    constructor(public musicPlayerService: MusicPlayerService, public backendService: BackendService) {
        this.showDetails = true;
        this.showThumbnail = true;
        this.selectedValue = 'WOOWO';
        this.song = this.musicPlayerService.DefaultCurrentSong();
        this.showPlaylist = Array<boolean>(5);

    }

    ngOnInit(): void {
    }

    public SongClicked(song: Video) {
        this.musicPlayerService.PlayNow(song);

    }
    public ToggleShowPlaylist(song: Video): void {
        this.showPlaylist[this.backendService.searchedSongs.indexOf(song)] = !this.showPlaylist[this.backendService.searchedSongs.indexOf(song)]
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

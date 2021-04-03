import { Component, Input, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
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

    public selectedValue: string;
    public showPlaylist: boolean[];

    constructor(public musicPlayerService: MusicPlayerService, public musicGetterService: MusicGetterService) {
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
        this.showPlaylist[this.musicGetterService.searchedSongs.indexOf(song)] = !this.showPlaylist[this.musicGetterService.searchedSongs.indexOf(song)]
    }

    public AddToQueue(song: Video): void {
        this.musicPlayerService.AddToSongQueue(song);

    }

    public PlaylistClicked(playlist: Playlist, song: Video): void {
        this.ToggleShowPlaylist(song);
        this.musicGetterService.AddSongToPlaylist(playlist, song);
    }

    public test(): void {
        console.log(this.song);
    }
}

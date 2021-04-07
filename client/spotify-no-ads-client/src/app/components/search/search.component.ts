import { Component, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { MusicPlayerService } from 'src/app/services/music-player/music-player.service';
import { Playlist } from 'src/app/services/Playlist';
import { Video } from 'src/app/services/Video';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public keyword: string;
    public selectedValue: string;
    public showPlaylist: boolean[];
    constructor(public musicGetterService: MusicGetterService, public musicPlayerService: MusicPlayerService) {
        this.showPlaylist = Array<boolean>(5);
        this.keyword = "";
        this.selectedValue = 'Choose a playlist';
    }

    ngOnInit(): void {

    }
    public ButtonClicked(): void {
        if(this.keyword != '') {
            this.musicGetterService.SearchForSong(this.keyword);
        }
    }
    public SongClicked(song: Video) {
        this.musicPlayerService.PlayNow(song);
        
    }
    
    public VerifyInput(event: Event): void {
        let kEvent = event as KeyboardEvent
        if(kEvent.key == 'Enter') {
            this.musicGetterService.SearchForSong(this.keyword);
        }
    }

    public PlaylistClicked(playlist: Playlist, song: Video): void {
        this.ToggleShowPlaylist(song);
        this.musicGetterService.AddSongToPlaylist(playlist, song);
    }

    public ToggleShowPlaylist(song: Video): void {
        this.showPlaylist[this.musicGetterService.searchedSongs.indexOf(song)] = !this.showPlaylist[this.musicGetterService.searchedSongs.indexOf(song)]
    }

    public AddToQueue(song: Video): void {
        this.musicPlayerService.AddToSongsQueue([song]);

    }
}

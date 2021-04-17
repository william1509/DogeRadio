import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
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
    constructor(public backendService: BackendService, public musicPlayerService: MusicPlayerService) {
        this.showPlaylist = Array<boolean>(5);
        this.keyword = "";
        this.selectedValue = 'Choose a playlist';
    }

    ngOnInit(): void {

    }
    public ButtonClicked(): void {
        if(this.keyword != '') {
            this.backendService.SearchForSong(this.keyword);
        }
    }
    public SongClicked(song: Video) {
        this.musicPlayerService.PlayNow(song);
        
    }
    
    public VerifyInput(event: Event): void {
        let kEvent = event as KeyboardEvent
        if(kEvent.key == 'Enter') {
            this.backendService.SearchForSong(this.keyword);
        }
    }

    public PlaylistClicked(playlist: Playlist, song: Video): void {
        this.ToggleShowPlaylist(song);
        this.backendService.AddSongToPlaylist(playlist, song);
    }

    public ToggleShowPlaylist(song: Video): void {
        this.showPlaylist[this.backendService.searchedSongs.indexOf(song)] = !this.showPlaylist[this.backendService.searchedSongs.indexOf(song)]
    }

    public AddToQueue(song: Video): void {
        this.musicPlayerService.AddToSongsQueue([song]);

    }
}

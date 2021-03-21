import { Component, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { MusicPlayerService } from 'src/app/services/music-player/music-player.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public keyword: string;

    constructor(public musicGetterService: MusicGetterService, public musicPlayerService: MusicPlayerService) {
        this.keyword = "";
    }

    ngOnInit(): void {
    }
    public ButtonClicked(): void {
        if(this.keyword != '') {
            this.musicGetterService.SearchForSong(this.keyword);
        }
    }
    public SongClicked(video_id: string, songTitle: string) {
        this.musicGetterService.DownloadFromServer(video_id).subscribe(response => {
            console.log('RESPONSE' + response);
            var data_url = URL.createObjectURL(response);
            this.musicPlayerService.audioPlayerElement.setAttribute('src', data_url);
            var button = document.getElementById('play-button') as HTMLButtonElement;
            var progressSlider = document.getElementById('slider-progress') as HTMLInputElement;
            progressSlider.value = '1';
            this.musicPlayerService.currentSongName = songTitle;
            button.style.backgroundImage = 'url(\'../../../assets/pause-button.png\')';
            this.musicPlayerService.playState = true;
            this.musicPlayerService.audioPlayerElement.play();

        });
    }
    public VerifyInput(event: Event): void {
        let kEvent = event as KeyboardEvent
        if(kEvent.key == 'Enter') {
            this.musicGetterService.SearchForSong(this.keyword);
        }
    }
}

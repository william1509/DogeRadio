import { Injectable } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Queue } from 'queue-typescript';
import { MusicGetterService } from '../music-getter/music-getter.service';
import { Playlist } from '../Playlist';
import { Video } from '../Video';

@Injectable({
    providedIn: 'root'
})
export class MusicPlayerService {
    
    public currentSongName: string;
    public audioPlayerElement!: HTMLAudioElement;
    public playState: boolean;
    public songQueue: Queue<Video>;
    public buttonLogo: string;

    constructor(public musicGetterService: MusicGetterService) {
        this.currentSongName = "No song playing";
        this.buttonLogo = 'play_arrow';
        this.playState = false;
        this.songQueue = new Queue<Video>();
    }

    public PlayNext(): void {
        const nextSong = this.songQueue.head;
        if(nextSong) {
            this.PlaySong(nextSong);
        } else {
            console.log('No songs in the queue');
        }
    }

    public SongStarted(song: Video): void {
        let progressSlider = document.getElementById('slider-progress') as HTMLInputElement;
        progressSlider.value = '1';
        this.currentSongName = song.title;
        this.buttonLogo = 'pause';
        this.playState = true;
    }

    public PlayNow(song: Video): void {
        this.songQueue = new Queue<Video>();
        this.PlaySong(song);
        this.SongStarted(song);

    }

    public PlaySong(song: Video): void {
        this.musicGetterService.DownloadFromServer(song.song_id).subscribe(response => {
            let data_url = URL.createObjectURL(response);
            this.audioPlayerElement.setAttribute('src', data_url);
            this.audioPlayerElement.play();
            this.SongStarted(song);
        });
    }

    public PlayPlaylist(playlist: Playlist, shuffle: boolean): void {
        this.songQueue = new Queue<Video>();
        this.musicGetterService.SetPlaylistQueue(playlist);
        this.musicGetterService.GetSongsInPlaylist(playlist).subscribe(response => {
            let videoArray = response as Video[];
            if(shuffle) videoArray = this.ShuffleArray(videoArray);
            for(let i in videoArray) {
                this.songQueue.enqueue(videoArray[i]);
            }
            this.PlayNext();        
        });
    }


    private ShuffleArray(array: Video[]): Video[] {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
        
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
        
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    
        return array; 
    }

}

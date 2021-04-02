import { Injectable } from '@angular/core';
import { Queue } from 'queue-typescript';
import { Observable } from 'rxjs';
import { MusicGetterService } from '../music-getter/music-getter.service';
import { Playlist } from '../Playlist';
import { Video } from '../Video';

@Injectable({
    providedIn: 'root'
})
export class MusicPlayerService {
    
    public currentSong: Video;
    public audioPlayerElement!: HTMLAudioElement;
    public playState: boolean;
    public songQueue: Queue<Video>;
    public buttonLogo: string;
    public isLoading: boolean[];
    constructor(public musicGetterService: MusicGetterService) {
        this.isLoading = new Array<boolean>(5);
        this.currentSong = this.DefaultCurrentSong();
        this.buttonLogo = 'play_arrow';
        this.playState = false;
        this.songQueue = new Queue<Video>();
    }

    private DefaultCurrentSong(): Video {
        return {type: "", song_id: "", title: "", publishedTime: "", 
                            duration: "", viewCount: {text: "", short: ""}, 
                            thumbnails: [{url: "", width: 0, height: 0}], 
                            descriptionSnippet: [{text: ""}],
                            channel: {name: "", id: "", thumbnails: [{url: "", width: 0, height: 0}], link: ""},
                            accessibility: {title: "", duration: ""}, link: "", shelfTitle: ""};
    }

    public PlayNext(): void {
        this.currentSong = this.songQueue.dequeue();
        if(this.currentSong) {
            this.PlaySong(this.currentSong);
        } else {
            this.currentSong = this.DefaultCurrentSong();
            this.audioPlayerElement.src = '';
            console.log('No songs in the queue');
        }
    }

    public SongStarted(song: Video): void {
        let progressSlider = document.getElementById('slider-progress') as HTMLInputElement;
        progressSlider.value = '1';
        this.buttonLogo = 'pause';
        this.playState = true;
    }

    public PlayNow(song: Video): void {
        this.songQueue = new Queue<Video>();
        this.currentSong = song;
        this.PlaySong(song);
        this.SongStarted(song);

    }

    public PlaySong(song: Video): void {
        this.isLoading[this.musicGetterService.searchedSongs.indexOf(song)] = true;
        this.musicGetterService.DownloadFromServer(song.song_id).subscribe(response => {
            let data_url = URL.createObjectURL(response);
            this.audioPlayerElement.src = data_url;
            this.isLoading[this.musicGetterService.searchedSongs.indexOf(song)] = false;
            this.audioPlayerElement.play();
            this.SongStarted(song);
        });
    }

    public PlayPlaylist(playlist: Playlist, shuffle: boolean): void {
        this.songQueue = new Queue<Video>();
        this.musicGetterService.GetSongsInPlaylist(playlist).subscribe(response => {
            let videoArray = response as Video[];
            if(shuffle) videoArray = this.ShuffleArray(videoArray);
            for(let i in videoArray) {
                this.AddToSongQueue(videoArray[i]);
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

    public AddToSongQueue(song: Video): boolean {
        for(let vid in this.songQueue.toArray()) {
            if(this.songQueue.toArray()[vid] === song) {
                console.log('already in queue')
                return false;
            }
        }
        this.songQueue.enqueue(song);
        return true;
    }

}

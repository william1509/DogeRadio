import { Injectable } from '@angular/core';
import { Queue } from 'queue-typescript';
import { BackendService } from '../backend/backend.service';
import { Playlist } from '../Playlist';
import { ParseToVideo, Video } from '../Video';

@Injectable({
    providedIn: 'root'
})
export class MusicPlayerService {
    
    public audioPlayerElement!: HTMLAudioElement;
    public playState: boolean;
    public songQueue: Queue<Video>;
    public buttonLogo: string;
    public isLoading: boolean;
    public oldVolume: number;
    public sliderMusicProgression: number;
    public sliderMusicEnabled: boolean;
    public previousSongs: Queue<Video>;

    constructor(public backendService: BackendService) {
        this.sliderMusicEnabled = true;
        this.sliderMusicProgression = 0;
        this.isLoading = false;
        this.buttonLogo = 'play_arrow';
        this.playState = false;
        this.previousSongs = new Queue<Video>();
        this.songQueue = new Queue<Video>();
        this.oldVolume = 0;
    }

    public DefaultCurrentSong(): Video {
        return {type: "", song_id: "", title: "", publishedTime: "", 
                            duration: "", viewCount: {text: "", short: ""}, 
                            thumbnails: [{url: "", width: 0, height: 0}], 
                            descriptionSnippet: [{text: ""}],
                            channel: {name: "", id: "", thumbnails: [{url: "", width: 0, height: 0}], link: ""},
                            accessibility: {title: "", duration: ""}, link: "", shelfTitle: ""};
    }

    public PlayNext(): void {
        let previousSong = this.songQueue.dequeue();
        this.previousSongs.enqueue(previousSong);
        let nextSong = this.songQueue.head;
        if(nextSong) {
            this.PlaySong(nextSong);
        } else {
            this.audioPlayerElement.src = '';
            console.log('No songs in the queue');
        }
    }

    public SongStarted(song: Video): void {
        this.sliderMusicProgression = 0;
        this.buttonLogo = 'pause';
        this.playState = true;
    }

    public PlayNow(song: Video): void {
        this.songQueue.prepend(song);
        this.PlaySong(song);
    }

    public PlaySong(song: Video): void {
        this.isLoading = true;
        this.backendService.DownloadFromServer(song).subscribe(response => {
            let data_url = URL.createObjectURL(response);
            this.audioPlayerElement.src = data_url;
            this.isLoading = false;
            this.audioPlayerElement.play();
            this.SongStarted(song);
        });
    }

    public PlayPlaylist(playlist: Playlist, shuffle: boolean): void {
        this.songQueue = new Queue<Video>();
        this.backendService.GetSongsInPlaylist(playlist).subscribe(response => {
            let videoArray = response as Video[];
            if(shuffle) videoArray = this.ShuffleArray(videoArray);
            for(let i in videoArray) {
                let vid = ParseToVideo(videoArray[i]);
                this.AddToSongsQueue([vid]);
            }
            this.PlaySong(this.songQueue.head);       
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

    public AddToSongsQueue(songs: Video[]): void {
        for(let i in songs) {
            this.songQueue.append(songs[i], true);         
        }
    }

    public ToggleMute(): void {
        if(this.audioPlayerElement.volume == 0.0) {
            this.audioPlayerElement.volume = this.oldVolume;
        } else {
            this.oldVolume = this.audioPlayerElement.volume;
            this.audioPlayerElement.volume = 0.0;
        }
    }

    public ToggleMaxVolume(): void {
        if(this.audioPlayerElement.volume == 1.0) {
            this.audioPlayerElement.volume = this.oldVolume;
        } else {
            this.oldVolume = this.audioPlayerElement.volume;
            this.audioPlayerElement.volume = 1.0;
        }
    }

    public IsAudioPlaying(): boolean {
        return this.audioPlayerElement.ended || !(this.audioPlayerElement.readyState > 2);
    }

    public PlaySongs(songs: Video[]): void {
        this.songQueue = new Queue<Video>();
        this.AddToSongsQueue(songs);
        this.PlayNext();
    }

    public PlayPrevious(): void {
        let previousSong = this.previousSongs.dequeue();
        if(previousSong) {
            this.PlayNow(previousSong);
            return;
        }

        console.log('No previous song')
    }

 
}

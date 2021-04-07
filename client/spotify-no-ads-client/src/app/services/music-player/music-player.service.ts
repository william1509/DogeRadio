import { Injectable } from '@angular/core';
import { Queue } from 'queue-typescript';
import { MusicGetterService } from '../music-getter/music-getter.service';
import { Playlist } from '../Playlist';
import { ParseToVideo, Video } from '../Video';

@Injectable({
    providedIn: 'root'
})
export class MusicPlayerService {
    
    public currentSong: Video;
    public audioPlayerElement!: HTMLAudioElement;
    public playState: boolean;
    public songQueue: Queue<Video>;
    public buttonLogo: string;
    public isLoading: boolean;
    public oldVolume: number;
    public sliderMusicProgression: number;
    public sliderMusicEnabled: boolean;
    public previousSongs: Queue<Video>;

    constructor(public musicGetterService: MusicGetterService) {
        this.sliderMusicEnabled = true;
        this.sliderMusicProgression = 0;
        this.isLoading = false;
        this.currentSong = this.DefaultCurrentSong();
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
        this.sliderMusicProgression = 0;
        this.buttonLogo = 'pause';
        this.playState = true;
    }

    public PlayNow(song: Video): void {
        this.currentSong = song;
        this.PlaySong(song);
    }

    public PlaySong(song: Video): void {
        this.isLoading = true;
        this.musicGetterService.DownloadFromServer(song).subscribe(response => {
            let data_url = URL.createObjectURL(response);
            this.audioPlayerElement.src = data_url;
            this.isLoading = false;
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
                let vid = ParseToVideo(videoArray[i]);
                this.AddToSongsQueue([vid]);
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

    public AddToSongsQueue(songs: Video[]): void {
        for(let i in songs) {
            if(songs[i] === this.currentSong) {
                console.log('already in queue')
                return;
            } 
            for(let vid in this.songQueue.toArray()) {
                if(this.songQueue.toArray()[vid] === songs[i]) {
                    console.log('already in queue')
                    return;
                }
            }
            this.songQueue.enqueue(songs[i]);
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
            this.songQueue.prepend(this.currentSong);
            this.PlayNow(previousSong);
            return;
        }

        console.log('No previous song')
    }

 
}

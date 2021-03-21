import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MusicPlayerService {
    
    public currentSongName: string;
    public audioPlayerElement!: HTMLAudioElement;
    public playState: boolean;

    constructor() {
        this.currentSongName = "No song playing";
        this.playState = false;

    }
}

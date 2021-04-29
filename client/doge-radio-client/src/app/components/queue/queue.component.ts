import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../../services/music-player/music-player.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

    constructor(public musicPlayerService: MusicPlayerService) { }

    ngOnInit(): void {
    }

    public CheckIfQueueEmpty(): boolean {

        return this.musicPlayerService.songQueue.length === 0;
    }

}

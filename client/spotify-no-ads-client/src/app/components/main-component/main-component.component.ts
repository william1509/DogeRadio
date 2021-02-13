import { Component, OnInit } from '@angular/core';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';
import { Video } from '../../services/Video'

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  public keyword: string;
  constructor(public musicGetterService: MusicGetterService) {
    this.keyword = "";
  }

  ngOnInit(): void {
    
  }
  public buttonClicked(): void {
    this.musicGetterService.SearchForSong(this.keyword);
    // this.musicGetterService.songs.push(new Video("lol", "lol", "lol", "WOWOOW", "TITLELELE", "tofday", "wow", "fefs", "dfsadsa", "dsadsa"));
    // this.musicGetterService.songs.push(new Video("lol", "lol", "lol", "WOWOOW", "54534543", "tofday", "wow", "fefs", "dfsadsa", "dsadsa"));
    console.log(this.musicGetterService.songs);
  }

}

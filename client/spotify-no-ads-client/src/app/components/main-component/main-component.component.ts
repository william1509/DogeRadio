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
  constructor(private musicGetterService: MusicGetterService) {
    this.keyword = "Keyword";
  }

  ngOnInit(): void {
    console.log("Cool");
  }
  public buttonClicked(): void {
    this.musicGetterService.SearchForSong({name: this.keyword});
  }

}

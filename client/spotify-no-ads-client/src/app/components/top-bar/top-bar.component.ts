import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicGetterService } from 'src/app/services/music-getter/music-getter.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router, private musicGetterService: MusicGetterService) { }

  ngOnInit(): void {
  }
}

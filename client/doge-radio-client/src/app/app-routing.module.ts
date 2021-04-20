import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { QueueComponent } from './components/queue/queue.component';
import { SearchComponent } from './components/search/search.component';
import { LibraryComponent } from './components/library/library.component';

const routes: Routes = [
  { path: 'home', component: SearchComponent},
  { path: 'playlists', component: PlaylistComponent },
  { path: 'queue', component: QueueComponent },
  { path: 'ready', component: LibraryComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    { path: 'home', component: SearchComponent},
    { path: 'playlists', component: PlaylistComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

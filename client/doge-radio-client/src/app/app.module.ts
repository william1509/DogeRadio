import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { AppComponent } from './app.component';

import { MainComponent } from './components/main/main.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SearchComponent } from './components/search/search.component';  
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SinglePlaylistComponent } from './components/single-playlist/single-playlist.component';
import { MatSelectModule } from '@angular/material/select';
import { QueueComponent } from './components/queue/queue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibraryComponent } from './components/library/library.component';
import { SongDisplayComponent } from './components/song-display/song-display.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { DragDropModule } from '@angular/cdk/drag-drop'; 

import 'zone.js';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopBarComponent,
    PlaylistComponent,
    SearchComponent,
    CreatePlaylistComponent,
    AudioPlayerComponent,
    ConfirmationDialogComponent,
    SinglePlaylistComponent,
    QueueComponent,
    LibraryComponent,
    SongDisplayComponent,
    AutofocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

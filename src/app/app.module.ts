import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { GameComponent } from './pages/game/game.component';
import { AboutComponent } from './pages/about/about.component';
import { RandomComponent } from './pages/random/random.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TutorialComponent,
    GameComponent,
    AboutComponent,
    RandomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

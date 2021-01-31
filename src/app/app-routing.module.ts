import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { GameComponent } from './pages/game/game.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tutorial' },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'game', component: GameComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'tutorial' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import Edge from 'src/app/utils/edge';
import { TippyMakerService } from 'src/app/utils/tippy-maker.service';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  edges: { [key: string]: Edge; };
  yellowKey: boolean = false;
  redKey: boolean = false;
  yellowUnlocked: boolean = false;
  redUnlocked: boolean = false;
  alreadyWonTutorial: boolean = false;

  constructor(private m: TippyMakerService) { }

  ngOnInit(): void {
    this.addTippyOnHow();
    this.m.addRootElement(document.getElementById('tutorial-root'));
    this.m.edges = this.getEdgesForTutorialMaze();
    this.m.makeMaze();
  }

  private getEdgesForTutorialMazeBehindYellowLock(): { [key: string]: Edge; } {
    return {
      's00': new Edge(this.m.node('s00'), [this.m.node('s01', 'right', '🥳')]),
      's01': new Edge(this.m.node('s01'), [this.m.node('s02', 'right')]),
      's02': new Edge(this.m.node('s02'), [this.m.node('s03', 'right'), this.m.node('s12', 'bottom')]),
      's03': new Edge(this.m.node('s03'), [this.m.node('s04', 'right')]),
      's12': new Edge(this.m.node('s12'), [this.m.node('s11', 'left'), this.m.node('s22', 'bottom')]),
      's22': new Edge(this.m.node('s22'), [this.m.node('s23', 'right')]),
      's23': new Edge(this.m.node('s23'), [this.m.node('s24', 'right'), this.m.node('s13', 'top')]),
      's13': new Edge(this.m.node('s13'), [this.m.node('s14', 'right')]),
      's14': new Edge(this.m.node('s14'), [this.m.node('s15', 'right', '🟥')]),
      's15': new Edge(this.m.node('s15'), [this.m.node('s16', 'right', '🔑', this.onRedKeyClick(), this.onRedKeyClickInt)])
    };
  }

  private getEdgesForTutorialMazeBehindRedLock(): { [key: string]: Edge; } {
    return {
      's60': new Edge(this.m.node('s60'), [this.m.node('s61', 'right')]),
      's61': new Edge(this.m.node('s61'), [this.m.node('s51', 'top'), this.m.node('s62', 'right')]),
      's62': new Edge(this.m.node('s62'), [this.m.node('s52', 'top'), this.m.node('s63-2', 'right')]),
      's52': new Edge(this.m.node('s52'), [this.m.node('s42', 'top')]),
      's42': new Edge(this.m.node('s42'), [this.m.node('s41', 'left', '🏆', this.onTrophyClick(), this.onTrophyClickInt), this.m.node('s43-2', 'right')]),
    };
  }

  private getEdgesForTutorialMaze(): { [key: string]: Edge; } {
    return {
      'root': new Edge(this.m.node('root'), [this.m.node('s20', 'top', '1'), this.m.node('s31', 'right', '2'), this.m.node('s40', 'bottom', '3')]),
      // (1)
      's20': new Edge(this.m.node('s20'), [this.m.node('s10', 'top', '🟨')]),
      's10': new Edge(this.m.node('s10'), [this.m.node('s00', 'top', '🔒', this.onYellowLockClick(), this.onYellowLockClickInt)]),
      // (2)
      's31': new Edge(this.m.node('s31'), [this.m.node('s32', 'right')]),
      's32': new Edge(this.m.node('s32'), [this.m.node('s33', 'right')]),
      's33': new Edge(this.m.node('s33'), [this.m.node('s43', 'bottom'), this.m.node('s34', 'right')]),
      's34': new Edge(this.m.node('s34'), [this.m.node('s44-2', 'bottom')]),
      's43': new Edge(this.m.node('s43'), [this.m.node('s53', 'bottom')]),
      's53': new Edge(this.m.node('s53'), [this.m.node('s63', 'bottom'), this.m.node('s54', 'right')]),
      's54': new Edge(this.m.node('s54'), [this.m.node('s64', 'bottom'), this.m.node('s44', 'top'), this.m.node('s55', 'right')]),
      's44': new Edge(this.m.node('s44'), [this.m.node('s45', 'right')]),
      's45': new Edge(this.m.node('s45'), [this.m.node('s35', 'top', '🟨')]),
      's35': new Edge(this.m.node('s35'), [this.m.node('s36', 'right', '🔑', this.onYellowKeyClick(), this.onYellowKeyClickInt)]),
      's55': new Edge(this.m.node('s55'), [this.m.node('s56', 'right')]),
      's56': new Edge(this.m.node('s56'), [this.m.node('s46', 'top'), this.m.node('s66', 'bottom')]),
      's66': new Edge(this.m.node('s66'), [this.m.node('s65', 'left')]),
      // (3)
      's40': new Edge(this.m.node('s40'), [this.m.node('s50', 'bottom', '🟥')]),
      's50': new Edge(this.m.node('s50'), [this.m.node('s60', 'bottom', '🔒', this.onRedLockClick(), this.onRedLockClickInt)]),
    };
  }

  private onTrophyClick(): () => void {
    return () => {
      if (this.alreadyWonTutorial) {
        alert(`You already got your tutorial trophy, want more go play the game 😒`);
        return;
      }
      this.alreadyWonTutorial = true;
      alert(`🎉 Nice! Now you're ready for the game 😈`);
    };
  }

  private onTrophyClickInt(): void {
    // @ts-ignore
    this.textContent = '';
    setTimeout(() => {
      // @ts-ignore
      this.textContent = '🤨';
    }, 2000);
  }

  private onRedKeyClick(): () => void {
    return () => {
      // @ts-ignore
      if (!window.redKey) {
        // @ts-ignore
        window.redKey = true;
        this.redKey = true;
        console.log('picked red key');
      }
    };
  }

  private onYellowKeyClick(): () => void {
    return () => {
      // @ts-ignore
      if (!window.yellowKey) {
        // @ts-ignore
        window.yellowKey = true;
        this.yellowKey = true;
        console.log('picked yellow key');
      }
    };
  }

  private onYellowLockClick(): () => void {
    return () => {
      // @ts-ignore
      if (window.yellowKey && !this.yellowUnlocked) {
        console.log('unlocked yellow lock');
        this.yellowUnlocked = true;
        this.m.updateMaze(this.getEdgesForTutorialMazeBehindYellowLock());
      }
    };
  }

  private onRedLockClick(): () => void {
    return () => {
      // @ts-ignore
      if (window.redKey && !this.redUnlocked) {
        console.log('unlocked red lock');
        this.redUnlocked = true;
        this.m.updateMaze(this.getEdgesForTutorialMazeBehindRedLock());
      }
    };
  }

  private onYellowKeyClickInt(): void {
    // @ts-ignore
    this.textContent = '✅';
    setTimeout(() => {
      // @ts-ignore
      this.textContent = '';
    }, 750);
  }

  private onRedKeyClickInt(): void {
    // @ts-ignore
    this.textContent = '✅';
    setTimeout(() => {
      // @ts-ignore
      this.textContent = '';
    }, 750);
  }

  private onYellowLockClickInt(): void {
    // @ts-ignore
    if (window.yellowKey) {
      // @ts-ignore
      this.textContent = '✅';
      setTimeout(() => {
        // @ts-ignore
        this.textContent = '🔓';
      }, 1000);
      return;
    }
    // @ts-ignore
    this.textContent = '⛔';
    setTimeout(() => {
      // @ts-ignore
      this.textContent = '🔒';
    }, 750);
  }

  private onRedLockClickInt(): void {
    // @ts-ignore
    if (window.redKey) {
      // @ts-ignore
      this.textContent = '✅';
      setTimeout(() => {
        // @ts-ignore
        this.textContent = '🔓';
      }, 1000);
      return;
    }
    // @ts-ignore
    this.textContent = '⛔';
    setTimeout(() => {
      // @ts-ignore
      this.textContent = '🔒';
    }, 750);
  }

  // private resetMaze(): () => void {
  //   return () => {
  //     this.m.reset();
  //     // this.m.updateMaze(this.getEdgesForMaze2(), true, document.getElementById('tutorial-root'));
  //   }
  // }

  private addTippyOnHow(): void {
    tippy('#how', {
      content: `
      <ul class="u-size-medium">
        <li>mouse only - it's too easy with a phone</li>
        <li>hover through the maze</li>
        <li>make sure the entire map (4 green borders) is visible - zoom out otherwise</li>
        <li>click on 🔑, 🔒, 🏆 to interact</li>
        <li>find the trophy</li>
      </ul>
      `,
      allowHTML: true,
      maxWidth: 'none',
      hideOnClick: false,
      theme: 'dark-border',
      interactive: true,
    });
  }

}

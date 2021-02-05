import { Component, OnInit } from '@angular/core';
import Edge from 'src/app/utils/edge';
import { TippyMakerService } from 'src/app/utils/tippy-maker.service';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  edges: { [key: string]: Edge; };
  yellowKey: boolean = false;
  yellowUnlocked: boolean = false;
  alreadyWonGame: boolean = false;

  constructor(private m: TippyMakerService) { }

  ngOnInit(): void {
    // @ts-ignore
    window.yellowKey = false;
    this.m.reset();
    this.m.addRootElement(document.getElementById('game-root'));
    this.m.edges = this.getEdgesForGameMaze();
    this.m.makeMaze();
  }

  private getEdgesForGameMazeBehindYellowLock(): { [key: string]: Edge; } {
    return {
      's02': new Edge(this.m.node('s02'), [this.m.node('s01-2', 'left')]),
      's01-2': new Edge(this.m.node('s01-2'), [this.m.node('s00-2', 'left', '🏆', this.onTrophyClick(), this.onTrophyClickInt)]),
    };
  }

  private getEdgesForGameMaze(): { [key: string]: Edge; } {
    return {
      'root': new Edge(this.m.node('root'), [this.m.node('s31', 'right')]),
      's31': new Edge(this.m.node('s31'), [this.m.node('s21', 'top'), this.m.node('s32', 'right')]),
      's21': new Edge(this.m.node('s21'), [this.m.node('s20', 'left'), this.m.node('s11', 'top')]),
      's20': new Edge(this.m.node('s20'), [this.m.node('s10', 'top')]),
      's11': new Edge(this.m.node('s11'), [this.m.node('s01', 'top')]),
      's01': new Edge(this.m.node('s01'), [this.m.node('s00', 'left')]),
      's32': new Edge(this.m.node('s32'), [this.m.node('s33', 'right')]),
      's33': new Edge(this.m.node('s33'), [this.m.node('s23', 'top')]),
      's23': new Edge(this.m.node('s23'), [this.m.node('s22', 'left')]),
      's22': new Edge(this.m.node('s22'), [this.m.node('s12', 'top')]),
      's12': new Edge(this.m.node('s12'), [this.m.node('s13', 'right')]),
      's13': new Edge(this.m.node('s13'), [this.m.node('s14', 'right')]),
      's14': new Edge(this.m.node('s14'), [this.m.node('s04', 'top'), this.m.node('s15', 'right'), this.m.node('s24', 'bottom')]),
      's04': new Edge(this.m.node('s04'), [this.m.node('s03', 'left', '🟨')]),
      's03': new Edge(this.m.node('s03'), [this.m.node('s02', 'left', '🔒', this.onYellowLockClick(), this.onYellowLockClickInt)]),
      's15': new Edge(this.m.node('s15'), [this.m.node('s05', 'top')]),
      's24': new Edge(this.m.node('s24'), [this.m.node('s34', 'bottom')]),
      's34': new Edge(this.m.node('s34'), [this.m.node('s35', 'right')]),
      's35': new Edge(this.m.node('s35'), [this.m.node('s25', 'top')]),
      's25': new Edge(this.m.node('s25'), [this.m.node('s26', 'right')]),
      's26': new Edge(this.m.node('s26'), [this.m.node('s16', 'top'), this.m.node('s36', 'bottom')]),
      's16': new Edge(this.m.node('s16'), [this.m.node('s06', 'top')]),
      's06': new Edge(this.m.node('s06'), [this.m.node('s07', 'right')]),
      's07': new Edge(this.m.node('s07'), [this.m.node('s08', 'right')]),
      's36': new Edge(this.m.node('s36'), [this.m.node('s46', 'bottom'), this.m.node('s37', 'right')]),
      's37': new Edge(this.m.node('s37'), [this.m.node('s38', 'right'), this.m.node('s27', 'top')]),
      's27': new Edge(this.m.node('s27'), [this.m.node('s28', 'right')]),
      's28': new Edge(this.m.node('s28'), [this.m.node('s18', 'top'), this.m.node('s29', 'right')]),
      's18': new Edge(this.m.node('s18'), [this.m.node('s17', 'left'), this.m.node('s19', 'right')]),
      's19': new Edge(this.m.node('s19'), [this.m.node('s09', 'top')]),
      's09': new Edge(this.m.node('s09'), [this.m.node('s010', 'right')]),
      's29': new Edge(this.m.node('s29'), [this.m.node('s210', 'right'), this.m.node('s39', 'bottom')]),
      's210': new Edge(this.m.node('s210'), [this.m.node('s110', 'top')]),
      's39': new Edge(this.m.node('s39'), [this.m.node('s310', 'right'), this.m.node('s49', 'bottom')]),
      's310': new Edge(this.m.node('s310'), [this.m.node('s410', 'bottom')]),
      's49': new Edge(this.m.node('s49'), [this.m.node('s59', 'bottom')]),
      's59': new Edge(this.m.node('s59'), [this.m.node('s58', 'left'), this.m.node('s510', 'right')]),
      's58': new Edge(this.m.node('s58'), [this.m.node('s68', 'bottom')]),
      's68': new Edge(this.m.node('s68'), [this.m.node('s69', 'right')]),
      's510': new Edge(this.m.node('s510'), [this.m.node('s610', 'bottom')]),
      's46': new Edge(this.m.node('s46'), [this.m.node('s45', 'left')]),
      's45': new Edge(this.m.node('s45'), [this.m.node('s44', 'left')]),
      's44': new Edge(this.m.node('s44'), [this.m.node('s54', 'bottom')]),
      's54': new Edge(this.m.node('s54'), [this.m.node('s53', 'left'), this.m.node('s55', 'right'), this.m.node('s64', 'bottom')]),
      's53': new Edge(this.m.node('s53'), [this.m.node('s43', 'top')]),
      's55': new Edge(this.m.node('s55'), [this.m.node('s56', 'right'), this.m.node('s65', 'bottom')]),
      's65': new Edge(this.m.node('s65'), [this.m.node('s66', 'right')]),
      's66': new Edge(this.m.node('s66'), [this.m.node('s67', 'right')]),
      's67': new Edge(this.m.node('s67'), [this.m.node('s57', 'top')]),
      's57': new Edge(this.m.node('s57'), [this.m.node('s47', 'top', '🟨')]),
      's47': new Edge(this.m.node('s47'), [this.m.node('s48', 'right', '🔑', this.onYellowKeyClick(), this.onYellowKeyClickInt)]),
      's64': new Edge(this.m.node('s64'), [this.m.node('s63', 'left')]),
      's63': new Edge(this.m.node('s63'), [this.m.node('s62', 'left')]),
      's62': new Edge(this.m.node('s62'), [this.m.node('s61', 'left'), this.m.node('s52', 'top')]),
      's61': new Edge(this.m.node('s61'), [this.m.node('s60', 'left')]),
      's60': new Edge(this.m.node('s60'), [this.m.node('s50', 'top')]),
      's52': new Edge(this.m.node('s52'), [this.m.node('s51', 'left')]),
      's51': new Edge(this.m.node('s51'), [this.m.node('s41', 'top')]),
      's41': new Edge(this.m.node('s41'), [this.m.node('s40', 'left'), this.m.node('s42', 'right')]),
    };
  }

  private onTrophyClick(): () => void {
    return () => {
      if (this.alreadyWonGame) {
        alert(`I'm out of trophies, just go away now 😒`);
        return;
      }
      this.alreadyWonGame = true;
      alert(`🎉 End. 🎉 You can now go play random mazes if you wish.`);
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

  private onYellowKeyClick(): () => void {
    return () => {
      // @ts-ignore
      if (!window.yellowKey) {
        // @ts-ignore
        window.yellowKey = true;
        this.yellowKey = true;
      }
    };
  }

  private onYellowLockClick(): () => void {
    return () => {
      // @ts-ignore
      if (window.yellowKey && !this.yellowUnlocked) {
        this.yellowUnlocked = true;
        this.m.updateMaze(this.getEdgesForGameMazeBehindYellowLock());
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

  private onYellowLockClickInt(): void {
    // @ts-ignore
    if (window.yellowKey && !this.yellowUnlocked) {
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
}





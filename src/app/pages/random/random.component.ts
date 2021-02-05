import { Component, OnInit } from '@angular/core';
import Edge from 'src/app/utils/edge';
import Node from 'src/app/utils/node';
import Stack from 'src/app/utils/stack';
import { TippyMakerService } from 'src/app/utils/tippy-maker.service';
import shuffle from 'src/app/utils/shuffle';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  easy: boolean = true;
  placements: string[] = ['top', 'bottom', 'right', 'left'];
  deadEndProbability: number = 0;
  retryNumber: number = 0;
  displayError: boolean = false;
  alreadyWonGame: boolean = false;

  constructor(private m: TippyMakerService) { }

  ngOnInit(): void {
    this.alreadyWonGame = false;
    this.retryNumber = 0;
    this.addInitialTippies();
    this.remakeMazeWithDifficulty(this.easy);
  }

  private remakeMazeWithDifficulty(easy: boolean): void {
    // @ts-ignore
    this.easy = easy;
    this.alreadyWonGame = false;
    this.retryNumber = 0;
    this.m.reset();
    this.m.addRootElement(document.getElementById('random-root'));
    this.m.edges = this.generateEdgesForGameMaze(this.easy);
    this.m.makeMaze();
  }

  private generateEdgesForGameMaze(easy: boolean): { [key: string]: Edge;} {
    const edges: { [key: string]: Edge; } = {};
    const s = new Stack<{pos: string, corridorLength: number}>();
    const links: {[key: string]: {position: string, placement: string}[]} = {};
    const visited: {[key: string]: boolean} = {};
    const deadEndsPosition: string[] = [];
    let trophyPosition: string = '';
    let foundFirstDeadEnd: boolean = false;

    s.push({pos: '3,0', corridorLength: 1});
    visited['3,0'] = true;
    while (!s.empty()) {
      shuffle(s.elements);
      const element = s.pop();
      const pos = element.pos;
      const corridorLength = element.corridorLength;
      const x = Number(pos.split(',')[0]);
      const y = Number(pos.split(',')[1]);
      if (Math.random() < this.deadEndProbability + 0.02 * corridorLength) {
        foundFirstDeadEnd = true;
        deadEndsPosition.push(pos);
        continue;
      }
      const shuffledPlacements = shuffle(this.placements);
      let isDeadEnd = true;
      for (const placement of shuffledPlacements) {
        const _x = x + this.getDx(placement);
        const _y = y + this.getDy(placement);
        const _pos = `${_x},${_y}`;
        if (this.isPositionValid(_pos) && !visited[_pos]) {
          isDeadEnd = false;
          if (!links[pos]) {
            links[pos] = [];
          }
          links[pos].push({position: _pos, placement});
          visited[_pos] = true;
          s.push({pos: _pos, corridorLength: corridorLength + 1});
        }
      }
      if (isDeadEnd) {
        foundFirstDeadEnd = true;
        deadEndsPosition.push(pos);
      }
    }
    const shuffledDeadEndsPosition = shuffle(deadEndsPosition);
    for (const deadEndPosition of shuffledDeadEndsPosition) {
      const x = Number(deadEndPosition.split(',')[0]);
      const y = Number(deadEndPosition.split(',')[1]);
      if (!(x >= 2 && x <= 4 && y <= 2)) {
        trophyPosition = deadEndPosition;
        break;
      }
    }
    if (trophyPosition === '') {
      if (this.retryNumber === 0) {
        console.log('no valid dead ends for trophy, trying again');
        this.retryNumber += 1;
        return this.generateEdgesForGameMaze(easy);
      }
      if (this.retryNumber === 1) {
        console.log('no valid dead ends for trophy, placing on random cell');
        for (let yy = 9; trophyPosition === '' && yy >= 0; yy -= 1) {
          for (let i = 0; trophyPosition === '' && i <= 5; i += 1) {
            let xx = Math.floor(Math.random() * 7);
            let pos = `${xx},${yy}`;
            if (links[pos]) {
              trophyPosition = pos;
            }
          }
        }
        if (trophyPosition === '') {
          console.log('no valid random cell for trophy, generating maze again..');
          this.retryNumber += 1;
          return this.generateEdgesForGameMaze(easy);
        }
      }
      if (this.retryNumber === 2) {
        console.log('still no valid cells for trophy, display error message');
        this.displayError = true;
        return {};
      }
    }
    this.retryNumber = 0;

    // this.logChildren(links, '3,0');

    for (const k in links) {
      const dadId = k === '3,0' ? 'root' : `s${k.replace(',', '')}`;
      const children = links[k];
      const childrenNodes: Node[] = [];
      children.forEach(child => {
        let _child: Node;
        if (child.position === trophyPosition) {
          _child = this.m.node(`s${child.position.replace(',', '')}`, child.placement, '🏆', this.onTrophyClick(), this.onTrophyClickInt);
        } else {
          _child = this.m.node(`s${child.position.replace(',', '')}`, child.placement);
        }
        childrenNodes.push(_child);
      });
      const edge = new Edge(this.m.node(dadId), childrenNodes);
      edges[dadId] = edge;
    }
    return edges;
  }

  private logChildren(links, id, level = 0) {
    // log maze texture
    let spaces = '';
    for (let i = 0; i < level; i ++) {
      spaces += ' ';
    }
    console.log(`${spaces}${id}:`);
    if (links[id] !== undefined) {
      for (let link of links[id]) {
        this.logChildren(links, link.position, level + 1);
      }
    }
  }

  private onTrophyClick(): () => void {
    return () => {
      if (this.alreadyWonGame) {
        alert(`Reset the maze, no more trophies here 😒`);
        return;
      }
      this.alreadyWonGame = true;
      localStorage.setItem('trophies', `${Number(localStorage.getItem('trophies')) + 1}`);
      this.remakeMazeWithDifficulty(this.easy);
      alert(`Woo 🎊🎊🎊\nThe maze has been reset. Play more!\n\n🏆 x ${localStorage.getItem('trophies') ? localStorage.getItem('trophies') : 0}`);
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

  private getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private getDy(placement: string) {
    switch (placement) {
      case 'top':
        return 0;
      case 'bottom':
        return 0;
      case 'right':
        return 1;
      case 'left':
        return -1;
    }
  }

  private getDx(placement: string) {
    switch (placement) {
      case 'top':
        return -1;
      case 'bottom':
        return 1;
      case 'right':
        return 0;
      case 'left':
        return 0;
    }
  }

  private isPositionValid(pos: string) {
    const x = Number(pos.split(',')[0]);
    const y = Number(pos.split(',')[1]);
    return x >= 0 && x <= 6 && y >= 0 && y <= 9;
  }

  private addInitialTippies(): void {
    this.addTippyOnHeader();
    this.addTippiesOnDifficulty();
  }

  private addTippyOnHeader(): void {
    tippy('#random-header', {
      content: `
      <span class="u-size-medium">No 🔑, no 🔒, one 🏆. Find it.</span>
      `,
      allowHTML: true,
      maxWidth: 'none',
      hideOnClick: false,
      theme: 'dark-border',
      interactive: true,
      placement: 'bottom',
    });
  }

  private addTippiesOnDifficulty(): void {
    const difElem = document.getElementById('random-difficulty')
    const easyElement = document.createElement('span');
    easyElement.textContent = `🐣`;
    easyElement.addEventListener('click', this.onDifficultyChange(true, easyElement));
    const hardElement = document.createElement('span');
    hardElement.textContent = `💪`;
    hardElement.addEventListener('click', this.onDifficultyChange(false, hardElement));

    const easyTippy = tippy(difElem, {
      content: easyElement,
      allowHTML: true,
      maxWidth: 50,
      hideOnClick: false,
      theme: 'dark-border',
      interactive: true,
      interactiveBorder: 15,
      placement: 'right',
    });

    const hardTippy = tippy(easyElement, {
      content: hardElement,
      allowHTML: true,
      maxWidth: 50,
      hideOnClick: false,
      theme: 'dark-border',
      interactive: true,
      interactiveBorder: 15,
      placement: 'right',
    });

    // @ts-ignore
    easyTippy.popper.querySelector('.tippy-box').style.height = '50px';
    // @ts-ignore
    easyTippy.popper.querySelector('.tippy-box').style.width = '50px';
    // @ts-ignore
    easyTippy.popper.querySelector('.tippy-box').style['font-size'] = '20px';
    // @ts-ignore
    hardTippy.popper.querySelector('.tippy-box').style.height = '50px';
    // @ts-ignore
    hardTippy.popper.querySelector('.tippy-box').style.width = '50px';
    // @ts-ignore
    hardTippy.popper.querySelector('.tippy-box').style['font-size'] = '20px';
  }

  private onDifficultyChange(easy: boolean, element: HTMLElement): () => void {
    return () => {
      element.textContent = '⏳';
      this.remakeMazeWithDifficulty(easy);
      element.textContent = '✅';
      setTimeout(() => {
        element.textContent = easy ? '🐣' : '💪';
      }, 500);
    };
  }
}

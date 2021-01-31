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
  key: boolean = false;

  constructor(private m: TippyMakerService) { }

  ngOnInit(): void {
    this.addTippyOnHow();
    this.m.addRootElement(document.getElementById('tutorial-root'));
    this.m.edges = this.getEdgesForMaze();
    this.m.makeMaze();
  }

  private getNewEdge(): {[key: string]: Edge} {
    return {
      's5': new Edge(this.m.node('s5'), [this.m.node('s7', 'right', '😍', this.resetMaze())]),
    };
  }

  private getEdgesForMaze(): { [key: string]: Edge; } {
    return {
      'root': new Edge(this.m.node('root'), [this.m.node('s1')]),
      's1': new Edge(this.m.node('s1'), [this.m.node('s2', 'top', '^')]),
      's2': new Edge(this.m.node('s2'), [this.m.node('s3', 'top', '^')]),
      's3': new Edge(this.m.node('s3'), [this.m.node('s4', 'right', '😁', this.addEdge(), this.clickOnSmileyInt), this.m.node('s5', 'top', '😎')]),
      // 's4': new Edge(this.m.node('s4'), [this.m.node('s6')]),
      // 's6': new Edge(this.m.node('s6'), [this.m.node('s7', 'left')]),
      // 's7': new Edge(this.m.node('s7'), [this.m.node('s8', 'bottom')]),
    }
  }

  private getEdgesForMaze2(): { [key: string]: Edge; } {
    return {
      'root': new Edge(this.m.node('root'), [this.m.node('s1', 'bottom', 'path2')]),
      's1': new Edge(this.m.node('s1'), [this.m.node('s2', 'bottom', '^')]),
      's2': new Edge(this.m.node('s2'), [this.m.node('s3', 'bottom', '^')]),
    }
  }

  private clickOnSmileyInt(): void {
    // @ts-ignore
    this.textContent = '🤣';
  }

  private addEdge(): () => void {
    return () => {
      this.m.updateMaze(this.getNewEdge());
    };
  }

  private resetMaze(): () => void {
    return () => {
      this.m.reset();
      this.m.updateMaze(this.getEdgesForMaze2(), true, document.getElementById('tutorial-root'));
    }
  }

  private addTippyOnHow(): void {
    tippy('#how', {
      content: `
      <ul class="u-size-medium">
        <li>mouse only - it's too easy with a phone</li>
        <li>hover through the maze</li>
        <li>make sure the entire map (4 green borders) is visible - zoom out otherwise</li>
        <li>click to interact</li>
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

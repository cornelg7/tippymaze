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

  constructor(private m: TippyMakerService) { }

  ngOnInit(): void {
    this.addTippyOnHow();
    this.m.addRootElement(document.getElementById('tutorial-root'));
    this.m.setEdges(this.getEdgesForMaze());
    this.m.makeMaze();
  }

  private getEdgesForMaze(): { [key: string]: Edge; } {
    return {
      'root': new Edge(this.m.node('root'), [this.m.node('s1')]),
      's1': new Edge(this.m.node('s1'), [this.m.node('s2')]),
      's2': new Edge(this.m.node('s2'), [this.m.node('s3')]),
      's3': new Edge(this.m.node('s3'), [this.m.node('s4', 'right', '😁'), this.m.node('s5', 'top', '😎')]),
    }
  }

  private addTippyOnHow(): void {
    tippy('#how', {
      content: `
      <ul class="u-size-medium">
        <li>only mouse - too easy with phone</li>
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

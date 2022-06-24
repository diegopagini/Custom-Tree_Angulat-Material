import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ACTIVITY_SOURCE } from './mock';
import { FlatNode, Unit, Node } from './models/index.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() source: Unit[] = ACTIVITY_SOURCE.result;

  private _transformer = (node: Node, level: number) => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level,
    selected: node.selected,
    id: node.id,
    display: node.display,
    difficulty: node.difficulty,
  });
  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit(): void {
    this.dataSource.data = this.source;
  }

  onNodeChange(node): void {
    node.selected = !node.selected;
  }

  checkAll(selection: boolean): void {
    this.dataSource.data = this.dataSource.data.map((unit) => ({
      ...unit,
      children: unit.children?.map((chapter) => ({
        ...chapter,
        children: chapter.children?.map((taks) => ({
          ...taks,
          selected: selection,
        })),
      })),
    }));

    if (selection) this.treeControl.expandAll();
    if (!selection) this.treeControl.collapseAll();
  }

  spandAll(selection: boolean): void {
    if (selection) this.treeControl.expandAll();
    if (!selection) this.treeControl.collapseAll();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}

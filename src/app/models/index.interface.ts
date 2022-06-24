export interface Difficulty {
  id: number;
  name: string;
  selected?: boolean;
}
export interface Display {
  id: number;
  name: string;
  selected?: boolean;
}
export interface Exercise {
  name: string;
  checked: boolean;
  value: string;
}

export interface Node {
  name: string;
  id?: number;
  selected?: boolean;
  display?: Display[];
  difficulty?: Difficulty[];
  children?: Node[];
}

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  selected?: boolean;
}
export interface Unit {
  name: string;
  id: number;
  level?: number;
  expandable?: boolean;
  children: Chapter[];
}

export interface Chapter {
  name: string;
  id: number;
  level?: number;
  children: Task[];
}

export interface Task {
  name: string;
  id: number;
  level?: number;
  selected: boolean;
}

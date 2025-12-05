export enum TreeState {
  SCATTERED = 'SCATTERED',
  TREE_SHAPE = 'TREE_SHAPE'
}

export interface ParticleData {
  // Vectors stored as arrays [x, y, z] for memory efficiency if needed, 
  // or we just calculate on the fly in the component.
  // Here we primarily define the configuration props.
  count: number;
  color: string;
  size: number;
  spread: number;
}

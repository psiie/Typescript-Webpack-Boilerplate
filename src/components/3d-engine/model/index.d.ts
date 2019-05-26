export type XYZ = Array<number>;
export type Vertices = Array<number>;
export type Face = Array<number>;
export type Faces = Array<Face>;

export interface ObjectJson {
  materials: Array<any>,
  meshes: Array<{
    faces: Faces,
    materialindex: number,
    name: string,
    vertices: Vertices,
  }>,
  rootnode: {
    name: string,
    transformation: Array<number>,
    meshes: Array<any>
  },
  flags: any,
}

export type ObjectVertices = Array<Vertices>;
interface Object3D {
  vertices: ObjectVertices,
  faces: Faces,
}

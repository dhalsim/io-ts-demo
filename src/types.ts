// TAGS
export type PRIMITIVE_TYPES =
  | 'StringType'
  | 'NumberType'
  | 'BigIntType'
  | 'BooleanType';

export type REFINEMENT_TYPE = 'RefinementType';

export type INTERFACE_TYPE = 'InterfaceType';

export type PARTIAL_TYPE = 'PartialType';

export type COMPLEX_TYPES = INTERFACE_TYPE | PARTIAL_TYPE;

export type INTERSECTION_TYPE = 'IntersectionType';

export type UNION_TYPE = 'UnionType';

export type KEYOF_TYPE = 'KeyofType';

export type COMBINATORY_TYPES = INTERSECTION_TYPE | UNION_TYPE;

export type ALL_TYPES =
  | PRIMITIVE_TYPES
  | COMPLEX_TYPES
  | REFINEMENT_TYPE
  | COMBINATORY_TYPES
  | KEYOF_TYPE;

// TYPES
export type AllTypes =
  | PrimitiveType
  | CombinatoryType
  | InterfaceType
  | PartialType
  | RefinementType
  | KeyOfType;

export interface PrimitiveType {
  name: string;
  _tag: PRIMITIVE_TYPES;
  _desc?: string;
}

export interface KeyOfType {
  name: string;
  keys: { [key: string]: null };
  _tag: 'KeyofType';
  _desc?: string;
}

export interface CombinatoryType {
  name: string;
  types: AllTypes[];
  _tag: COMBINATORY_TYPES;
  _desc?: string;
}

export interface InterfaceType {
  name: string;
  props: { [key: string]: AllTypes };
  _tag: INTERFACE_TYPE;
  _desc?: string;
}

export interface PartialType {
  name: string;
  props: { [key: string]: AllTypes }[];
  _tag: PARTIAL_TYPE;
  _desc?: string;
}

export interface RefinementType {
  name: string;
  type: PrimitiveType;
  _tag: REFINEMENT_TYPE;
  _desc?: string;
}

export const withDesc = (desc: string) => (iots: any) => ({
  ...iots,
  _desc: desc
});

export const isInterfaceType = (ty: AllTypes): ty is InterfaceType =>
  ty._tag === 'InterfaceType';

export const isPartialType = (ty: AllTypes): ty is PartialType =>
  ty._tag === 'PartialType';

export const isComplexType = (
  ty: AllTypes
): ty is InterfaceType | PartialType =>
  isInterfaceType(ty) || isPartialType(ty);

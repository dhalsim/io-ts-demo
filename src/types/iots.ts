import * as t from 'io-ts';

export interface GenerableProps {
  [key: string]: Generable;
}

export type GenerableInterface = t.InterfaceType<GenerableProps>;
export type GenerablePartials = t.PartialType<GenerableProps>;
export type GenerableRecord = t.DictionaryType<Generable, Generable>;
export type GenerableRefinement = t.RefinementType<Generable>;
export type GenerableArray = t.ArrayType<Generable>;
export type GenerableUnion = t.UnionType<Array<Generable>>;
export type GenerableIntersection = t.IntersectionType<Array<Generable>>;
export type GenerableTuple = t.TupleType<Array<Generable>>;
export type GenerableReadonly = t.ReadonlyType<Generable>;
export type GenerableReadonlyArray = t.ReadonlyArrayType<Generable>;
export type GenerableRecursive = t.RecursiveType<Generable>;
export type Generable =
  | t.StringC
  | t.NumberC
  | t.BooleanType
  | GenerableInterface
  | GenerableRefinement
  | GenerableArray
  | GenerablePartials
  | GenerableRecord
  | GenerableUnion
  | GenerableIntersection
  | GenerableTuple
  | GenerableReadonly
  | GenerableReadonlyArray
  | t.LiteralType<any>
  | t.KeyofType<any>
  | GenerableRecursive
  | t.UndefinedType;

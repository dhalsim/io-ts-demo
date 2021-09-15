export interface StringSchema {
  type: 'string';
  enum?: Array<string>;
}

export interface NumberSchema {
  type: 'number';
}

export interface BooleanSchema {
  type: 'boolean';
}

export interface ObjectSchema {
  type: 'object';
  properties: { [key: string]: JSONSchema };
  required?: Array<string>;
}

export interface ArraySchema {
  type: 'array';
  items: JSONSchema;
  required?: Array<string>;
}

export type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ObjectSchema
  | ArraySchema;

import { Iots, Swagger } from './types/index';

function toSwaggerProperties(props: Iots.GenerableProps) {
  return Object.entries(props)
    .map(([propName, prop]) => {
      return {
        [propName]: toSwagger(prop)
      };
    })
    .reduce((acc, elem) => ({ ...elem, ...acc }), {});
}

export function toSwagger(iots: Iots.Generable): Swagger.JSONSchema {
  switch (iots._tag) {
    case 'StringType': {
      const result: Swagger.StringSchema = {
        type: 'string'
      };

      return result;
    }
    case 'KeyofType': {
      const result: Swagger.StringSchema = {
        type: 'string',
        enum: Object.keys(iots.keys)
      };

      return result;
    }
    case 'NumberType': {
      const result: Swagger.NumberSchema = {
        type: 'number'
      };

      return result;
    }
    case 'BooleanType': {
      const result: Swagger.BooleanSchema = {
        type: 'boolean'
      };

      return result;
    }
    case 'RefinementType': {
      return toSwagger(iots.type);
    }
    case 'ArrayType': {
      const result: Swagger.ArraySchema = {
        type: 'array',
        items: toSwagger(iots.type)
      };

      return result;
    }
    case 'InterfaceType': {
      const result: Swagger.ObjectSchema = {
        type: 'object',
        properties: toSwaggerProperties(iots.props),
        required: Object.keys(iots.props)
      };

      return result;
    }
    case 'PartialType': {
      const result: Swagger.ObjectSchema = {
        type: 'object',
        properties: toSwaggerProperties(iots.props)
      };

      return result;
    }
    case 'IntersectionType': {
      // TODO: continue here

      if (iots.types.length !== 2) {
        throw new Error(
          `We only support 2 element intersection type, but it was: ${iots.types.length}`
        );
      }

      // if both are primitive types:
      // Positive + t.Int -> underlying types are number -> select one
      // t.partial + t.type -> underlying types are object -> merge
      const [first, second] = iots.types;

      switch (first._tag) {
        case 'StringType':
        case 'NumberType':
        case 'BooleanType':
        case 'RefinementType':
          return toSwagger(first);
        case 'KeyofType':
          throw new Error(`doesn't support it yet ${first._tag}`);
        case 'ArrayType':
          throw new Error(`doesn't make sense: ${first._tag}`);
        case 'IntersectionType':
          throw new Error(`doesn't support it yet ${first._tag}`);
        case 'InterfaceType':
        case 'PartialType': {
          if (
            !(second._tag === 'InterfaceType' || second._tag === 'PartialType')
          ) {
            throw new Error(
              `We only support InterfaceType or InterfaceType together, but was: ${first._tag} and ${second._tag}`
            );
          }

          const result: Swagger.ObjectSchema = {
            type: 'object',
            properties: {
              ...toSwaggerProperties(first.props),
              ...toSwaggerProperties(second.props)
            },
            required: iots.types
              .filter(
                (t): t is Iots.GenerableInterface => t._tag === 'InterfaceType'
              )
              .flatMap((t) => Object.keys(t.props))
          };

          return result;
        }
        default:
          throw new Error(`doesn't support it yet: ${first._tag}`);
      }
    }
    default:
      throw new Error(`toSwagger: ${iots._tag} not found`);
  }
}

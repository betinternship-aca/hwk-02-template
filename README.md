# homework 02

please edit files in solutions folder to provider following functionality

  - *toPrimitiveApi*
    Please have the following functions: `setPrimitive` and `changePrimtive`, and provide the following functionality: both of them should get two arguments: object and primitiveValue. after calling setPrimitive with an object and a primitive it should change object so it's `valueOf` will return that primitive. setPrimitive shouldn't set different `valueOf` methods on different objects, should define a pseudo-private not enumerable property which name contoins symbols not allowed in identifiers and some random part. `changePrimitive` should just change the the return value of `valueOf` method to it's second argument's value. It also shouldn't change the valueOf method and should differ from `setPrimitive`.

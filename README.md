# DeepStrictTypes

**DeepStrictTypes** extends TypeScript utility types, enabling safe operations like `Omit` and `Pick` on nested objects or arrays by specifying the keys to be inferred. This allows for more strict and accurate type checks.

## DeepStrictObjectKeys

`DeepStrictObjectKeys<T>` extracts all nested keys from an object `T`, preserving the structure of the nested object and returning the types of the keys. This is useful when you need to handle specific keys safely at deeper levels of an object.

```typescript
type Example = {
    user: {
        name: string;
        address: {
            city: string;
            zip: number;
        };
    };
};

// Result: "user" | "user.name" | "user.address" | "user.address.city" | "user.address.zip"
type Keys = DeepStrictObjectKeys<Example>;
```

## DeepStrictOmit

DeepStrictOmit<T, K> creates a new type by excluding properties corresponding to the key K from object T, while preserving the nested structure. This type allows precise omission of keys even in deeply nested objects.

```ts
type Example = {
    user: {
        name: string;
        age: number;
    };
};

// Result: { user: { age: number; } }
type Omitted = DeepStrictOmit<Example, "user.name">;
```

## DeepStrictPick

DeepStrictPick<T, K> creates a new type by selecting only the properties corresponding to the key K from object T, while preserving the nested structure. It allows safely selecting specific keys even from deep objects.

```ts
type Example = {
    user: {
        name: string;
        age: number;
    };
};

// Result: { user: { name: string; } }
type Picked = DeepStrictPick<Example, "user.name">;
```

## DeepStrictUnbrand

DeepStrictUnbrand<T> removes branding from type T and applies it even to deeply nested objects. This makes handling complex branded types simpler by removing the branding for more straightforward use.

```ts
type BrandedType = { brand: number & { type: "won" } };

// Result: { value: number; }
type Unbranded = DeepStrictUnbrand<BrandedType>;
```

## SubTypes for implementation

### ElementOf

ElementOf<T> extracts the type of elements from an array type T. This is useful to explicitly define the element type of an array and perform operations on that element.

```ts
type ArrayExample = string[];

// Result: string
type ElementType = ElementOf<ArrayExample>;
```

### Equal

Equal<A, B> evaluates whether types A and B are the same and returns true or false. This is used to validate whether two types are identical.

```ts
type A = { a: number };
type B = { a: number };

// Result: true
type AreEqual = Equal<A, B>;
```

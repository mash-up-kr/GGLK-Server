# GGLK Server Error Types

## Error Response Payload

type 레벨로 제공됩니다. `ErrorResponsePayload`를 import 해주면 됩니다.

```typescript
export type ErrorResponsePayload = {
  statusCode: number;
  errorCode: string;
  message: string;
  timestamp: Date;
};
```

## Errors

각 Module별 Error Type Key들은 `(Module Name)ModuleKey` 형식으로 정의되어있습니다.

- `GlobalErrorKey`
- `AuthModuleKey`
- `UserModuleKey`

전체 Error Type의 경우에는 `ModuleErrors`에 저장되어있습니다.Key는 위에서 정의된 Key들을 사용하며, 각각의 value paylod는 아래와 같습니다.

```typescript
// Error Payload
{
  errorCode: string;
  statusCode: number;
}
```

```typescript
// Module Errors Definition
{
    [UserModuleKey.USER_NOT_FOUND]: {
        errorCode: 'G2001',
        statusCode: HttpStatus.NOT_FOUND,
    }
    ...
}
```

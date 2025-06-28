# 깔깔룩위원회 Node.js팀

## Dev Docker

File change 바로 컨테이너에 반영됩니다. 별도로 다시 빌드하지 마세요

```
yarn docker:dev:up
```

## Development

1. Database Migration

Database 변경사항 발생시 Migration 파일 생성해주세요

```
yarn migration:generate
```

2. Run app

start, dev start시에 모두 생성된 마이그레이션 파일을 적용합니다.

```
yarn start

// or

yarn start:dev
```

3. Revert migration in case

만약 마이그레이션 롤백이 필요하면 revert하면 됩니다.

```
yarn migration:revert
```

### bash

```bash
# 0. 환경 설정
git clone https://github.com/mash-up-kr/GGLK-Server.git
cd GGLK-Server
yarn install

# 1. 도커 실행
docker-compose up -d
docker ps # 컨테이너 이름 및 상태 확인

# 2. 도커 접속
docker exec -it postgres psql -U postgres
```

### sql

```sql
-- 3. Postgres DB 생성
CREATE DATABASE gglk;

-- 4. 종료
\q
```

## Error Types Package

```
npm i @mashup-node/gglk-error-types

// or

yarn add @mashup-node/gglk-error-types
```

## Document Route

- Swagger: `/docs`
- ReDoc: `/redoc`

## 구성원

<table>
    <tr align="center">
        <td><B>주병호<B></td>
        <td><B>최재영<B></td>
        <td><B>이미나<B></td>
        <td><B>윤준호<B></td>
    </tr>
    <tr align="center">
        <td>
            <img src="https://github.com/Ho-s.png?size=100">
            <br>
            <a href="https://github.com/Ho-s"><I>Ho-s</I></a>
        </td>
        <td>
            <img src="https://github.com/Choi-JY1107.png?size=100">
            <br>
            <a href="https://github.com/Choi-JY1107"><I>Choi-JY1107</I></a>
        </td>
        <td>
          <img src="https://github.com/chsjen492.png?size=100" width="100">
            <br>
            <a href="https://github.com/chsjen492"><I>chsjen492</I></a>
        </td>
        <td>
          <img src="https://github.com/J-Hoplin.png?size=100">
            <br>
            <a href="https://github.com/J-Hoplin"><I>J-Hoplin</I></a>
        </td>
    </tr>
</table>

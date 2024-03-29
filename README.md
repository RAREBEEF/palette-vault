# **Palette Vault**

<a href="https://palettevault.netlify.app">Palette Vault</a>  
<a href="https://github.com/RAREBEEF/palette-vault">Github repository</a>  

React와 Redux, TypeScript, Firebase를 이용하여 팔레트를 저장할 수 있는 웹사이트를 만들어 보았다.

<br/>

---

# 구현 기능
## 1. 팔레트 생성
![](https://velog.velcdn.com/images/drrobot409/post/b703e93f-2c67-4a5a-9114-a40808477eb1/image.png)
HEX 혹은 RGB 값을 직접 입력하거나 color picker를 통해 팔레트에 색상을 추가할 수 있다. 

색상의 값은 전부 HEX로 저장하도록 하였으며, RGB 값을 직접 입력했을 경우에도 HEX로 변환할 수 있도록 커스텀 훅을 만들어서 사용하였다.

이렇게 생성된 팔레트는 Firebase에 아래와 같은 구조로 저장된다.

```js
{
	author: "소고기는레어"
    colors: [
    	"#012345",
        "#234567",
        "#6789AB"
    ],
	createdAt: 1658706969175,
	creator: "7WRM3*************8U6QC2",
	name: "My palette 1"
}
```

- author : 팔레트 등록자의 닉네임
- colors : 색상 배열
- createdAt : 생성일시
- creator : 등록자의 uid
- name : 팔레트 제목

<br />

## 2. 쿼리 커서
![](https://velog.velcdn.com/images/drrobot409/post/d0914520-34af-43d3-9573-87ed17b7dfe0/image.png)

매번 최초 로드 시에 저장된 모든 팔레트를 요청할 경우 데이터가 늘어나면 늘어날 수록 최초 로드 소요 시간도 늘어날 수 밖에 없다. 

이를 방지하기 위해 쿼리 커서를 구현하였고, 팔레트를 12개씩 끊어서 필요할 때 마다 불러올 수 있도록 하였다. 

다만 쿼리 커서를 적용하니 왜인지 실시간 업데이트 수신 대기가 작동하지 않았다. 따라서 업데이트를 지속적으로 수신하는 대신 한 번만 데이터를 불러오고, 이후부터는 사용자가 팔레트를 추가하거나 삭제하는 등 데이터에 변동이 생길 때만 다시 데이터를 불러오도록 하여 실시간 업데이트를 수신하는 것처럼 보이도록 하였다.

<br />

## 3. 복사
![](https://velog.velcdn.com/images/drrobot409/post/6c1dbe15-6201-4cb0-bbad-c9225eb3c056/image.png)

원하는 색상을 클릭하면 해당 색상이 클립보드에 복사되도록 하였다. 
또한 하단에 "복사됨" 이라는 알림을 출력하여 사용자에게 색상이 복사 되었음을 알리도록 하였다.

<br/>

## 4. PWA
![](https://velog.velcdn.com/images/drrobot409/post/ad591166-a041-446f-9689-57c9565979e3/image.png)

크롬으로 웹사이트에 접속 시 웹사이트가 크롬의 PWA 기준에 부합하면 접속 시 설치 버튼이 출력되고 `beforeinstallprompt` 이벤트의 호출이 가능해지는데, 이러한 크롬의 기준에 부합하도록 앱을 업데이트하였다.  
아직 온전한 PWA라고 하기에는 푸시알림도 없고 오프라인에서도 작동하지 않지만 우선은 설치가 가능하도록 한다는 점에 초점을 맞춘 업데이트이다. 

install 페이지를 새롭게 추가하여 앱의 설치를 유도하였다. 
크롬 브라우저와 같이 `beforeinstallprompt` 를 지원하는 브라우저의 경우 해당 이벤트로 설치 여부를 체크하여 install 페이지로 자동 리디릭션 되도록 하였고 safari처럼 지원하지 않을 경우 디스플레이 모드의 `standalone` 여부를 체크하여 네비게이션바에 설치 페이지 이동 버튼을 추가하였다. 

또한 모바일 환경의 `standalone` 에서는 네비게이션바의 위치를 하단으로 옮기고 스타일에 변경점을 줘서 사용자가 앱을 사용하고 있다는 느낌을 받을 수 있도록 하였다. 

아쉬운 점은 안드로이드 기기가 없는 관계로 더 다양한 환경에서 의도대로 작동하는지 테스트 해보지 못한 점이다.

<br/>

---

# 스타일
## 1. 테마 색상
[Palette Vault 테마 색상](https://palettevault.netlify.app/palette/mjScVjhD4kYkZ53t9N1J)
#F87060
#808080
#FFFFFF

<br />

## 2. 로고
![](https://velog.velcdn.com/images/drrobot409/post/f7000b1c-cbc5-46aa-b928-c2922e76e9a7/image.png)

<br />

## 3. 기타 스크린샷
![](https://velog.velcdn.com/images/drrobot409/post/205f8c92-1339-48ae-8071-bfbd81a28106/image.png)
![](https://velog.velcdn.com/images/drrobot409/post/3250f2ed-3d44-43a8-9281-789b740e2ff4/image.png)
![](https://velog.velcdn.com/images/drrobot409/post/fe9480df-f44b-4895-a166-f7640ce26398/image.png)
![](https://velog.velcdn.com/images/drrobot409/post/34f96022-2b07-416e-aea3-5a2916169e9b/image.png)




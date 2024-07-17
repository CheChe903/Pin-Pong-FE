# **Pin-Pong**

## Preview

![PinPongIcon.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/78f4f196-5d37-4101-951a-98ec39214c63/PinPongIcon.png)

### **정녕 이게 당신의 최선입니까…?**

**질문하고 싶을 땐 핀 꽂으러 가기**

여러분들은 코딩하면서 내가 작성한 코드가
정말 최고의 성능을 갖고, 리팩터링이 필요없는 코드일까 궁금하신 적 있지 않으신가요?

Github에 올린 내 코드를 다른 사람들에게 공유하고 질문하며 이를 통해 코드 질문을 할 수 있도록 도와주는 웹 서비스인 ***PinPong***을 이용해보세요!

## Team

[문재혁](https://www.notion.so/33b18ac1964b4a479b065ad57798aa83?pvs=21) https://github.com/Kiriiin

[김진영](https://www.notion.so/090059d40682472ab23f226c982c9602?pvs=21) https://github.com/KimJinYeongZ

## TechStack

### FrontEnd

- React

### BackEnd

- Spring Boot
- Cloud : AWS

## Details

**로그인 / 로그아웃**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/1431af30-31e1-480c-aa4f-3a3d6717209e/Untitled.png)

[Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/72b052c0-e00b-4dd3-a9ec-8723463253f8/Untitled.qt)

- Github API를 이용해 사용자의 Github 계정으로 로그인
- Github Id 와 Github Image를 불러옴
- 첫 로그인 시 기본 핀 5개 지급
- 매일 출석 핀 1개 지급

**메인 / 질문**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d522c4c3-1d2f-4819-a30a-7e28d264fc65/Untitled.png)

[Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/20a50955-d798-47a9-bbf1-b11a421051d5/Untitled.qt)

- 사용자들이 올린 질문 글 목록
- 작성자 Github ID, Github Image, 질문 글에 사용된 기술 스택, 채택 여부, 좋아요 개수도 함께 표시
- “내 태그로 글 보기” 클릭 시 내가 설정한 기술 스택을 가진 질문 글들만 표시되도록 필터링 가능

**핀 꽂으러 가기**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/79081cba-2ed9-4cf8-8c53-52815573abd8/Untitled.png)

[Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/def14c56-da95-4908-9afe-253789abc90d/Untitled.qt)

- 사용자의 핀을 1개 소모하여 질문 글을 작성할 수 있음
- 질문 글에 맞는 기술 스택을 추가할 수 있음
- 질문하고 싶은 사용자의 Pull Request주소를 입력하면 해당하는 Commit 들의 코드를 불러옴
- 질문하고 싶은 내용을 작성한 후 핀 꽂기 클릭
- 좋은 질문이라고 생각하는 글에 좋아요를 누를 수 있음

**댓글 작성**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/ba46d3e2-f8e5-4cd4-ac8e-cff45de1c876/Untitled.png)

[Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/55d3d423-bba9-4c40-9beb-9cc35b706255/Untitled.qt)

- 댓글 작성을 통해 질문 글에 댓글을 달 수 있음
- 작성자가 사용자의 댓글이 가장 유익했다고 생각하는 댓글 하나를 채택할 수 있음
- 채택된 댓글의 작성자는 채택이 되면 핀 10개 지급
- 질문 글에 채택된 댓글이 있으면 채택된 글로 변경됨

**랭킹**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/14899c8e-91c3-4b47-95e3-a6004c4d32df/Untitled.png)

- 핀 개수가 많은 순으로 랭킹 표시
- 랭킹을 표시함으로써 사용자들의 답변 장려

**마이페이지**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/40049820-5bc5-459a-8784-06a3015ed4b1/Untitled.png)

- 사용자 Github ID와 Image, 사용자가 쓴 질문 글 표시
- 사용자가 관심 있거나 사용 가능한 기술 스택 지정 가능
- 사용자가 현재 갖고 있는 핀 개수 표시


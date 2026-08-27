# 🌤️ Weather Dashboard

> 이번 과제는 UI/CSS를 AI 도구 없이 직접 HTML·CSS로 작성하며 진행했고, 그 과정에서 Vue의 반응형 시스템, watch/computed 동작 방식 등 프레임워크 자체의 기본 동작 원리를 깊이 이해하는 데 중점을 뒀습니다.

## 목차

1. [개요](#개요)
2. [주요 기능](#주요-기능)
3. [구현](#구현)
4. [상세 내용](#상세-내용)
5. [트러블슈팅](#트러블슈팅)

## 개요

- **배포링크**: [https://skala-vue-homework.vercel.app](https://skala-vue-homework.vercel.app)
- **데이터 소스**: [OpenWeatherMap API](https://openweathermap.org/api) (현재 날씨 `/weather`, 5일 예보 `/forecast`)
- **폴더 구조**

  ```
  src/
  ├─ api/          # axios 인스턴스, OpenWeatherMap API 호출 함수
  ├─ components/   # 화면을 구성하는 재사용 컴포넌트
  ├─ composables/  # 단위 변환 등 공통 로직 (useGetTemp)
  ├─ router/       # Vue Router 설정
  ├─ stores/       # Pinia 스토어 (weatherStore, configStore)
  └─ views/        # 라우트에 매핑되는 페이지 컴포넌트
  ```

## 주요 기능

| 기능           | 설명                                       | 스크린샷 |
| -------------- | ------------------------------------------ | -------- |
| 메인 대시보드  | 도시 검색 + 지역 필터 + 날씨 카드 리스트   | `!사진`  |
| 검색 결과 없음 | 검색어와 일치하는 도시가 없을 때 안내 문구 | `!사진`  |
| 상세 페이지    | 도시별 실시간 기온/상태 + 5일 예보         | `!사진`  |
| 단위 전환      | 상단 UnitToggler로 섭씨 ↔ 화씨 전환        | `!사진`  |
| 서비스 소개    | About 페이지                               | `!사진`  |

## 구현

과제 요구사항과 실제 구현 위치를 매핑한 표입니다.

### 1) 렌더링 & 바인딩

| 요구사항                                   | 구현 위치                                                                  | 비고                                           |
| ------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------- |
| `v-for` + `:key` 로 날씨 카드 반복 렌더링  | `WeatherHomeView.vue` `v-for="city in filteredWeatherList" :key="city.id"` |                                                |
| 기온 기준 조건부 라벨 (`v-if`/`v-else-if`) | `WeatherCard.vue` `weatherLevel` computed + 템플릿 분기                    | 25도 대신 20/28도, 3단계(hot/good/cool)로 확장 |
| 검색 input 양방향 바인딩 + 한글 입력       | `SearchBar.vue` `:value`/`@input` → `update-query` emit                    |                                                |

### 2) 이벤트 처리

| 요구사항                          | 구현 위치                                                      | 비고                                                            |
| --------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| 카드 클릭 → 상태바 문구 갱신      | `WeatherHomeView.vue` `setSelected`, `watch(selectedCityInfo)` |                                                                 |
| 상세보기 버튼 클릭 시 버블링 차단 | `WeatherCard.vue` `@click.stop="emit('click-detail', city)"`   |                                                                 |
| 상세보기 동작                     | `WeatherHomeView.vue` `showDetail` → `router.push`             | 요구사항의 `alert` 대신 라우팅으로 대체 (아래 라우팅 항목 참고) |

### 3) 반응형 상태 관리

| 요구사항                                                     | 구현 위치                                                              | 비고                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------- |
| `searchQuery`, `selectedCityInfo`, `weatherList` 반응형 상태 | `WeatherHomeView.vue`                                                  | `weatherList`는 `weatherStore.cityList` 사용      |
| `filteredWeatherList` computed                               | `WeatherHomeView.vue`                                                  | 검색어 + 지역 필터(`filteredByRegion`) 2단 필터링 |
| `watch(selectedCityInfo)`                                    | `WeatherHomeView.vue`                                                  | 상태바 문구 변경 시 콘솔 로그                     |
| `watchEffect(searchQuery)`                                   | `WeatherHomeView.vue`                                                  | 타이핑마다 콘솔 로그                              |
| 검색 결과 없음/원본 출력 분기                                | `WeatherHomeView.vue` 템플릿 `v-if="filteredWeatherList.length === 0"` |                                                   |
| 본인 추가 상태/Watcher                                       | `selectRegion` ref + `filteredByRegion` computed + 전용 `watchEffect`  | 지역 카테고리 필터 기능                           |

### 4) 컴포넌트 분리

| 요구사항                                 | 구현 위치                                                  | 비고                                                                       |
| ---------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| `WeatherParent.vue` (반응형 데이터 유지) | `views/WeatherParent.vue`                                  | 실습용, 실제 라우팅은 `WeatherHomeView.vue`가 대체                         |
| `BaseDashboardCard.vue` (slot 공통 카드) | `components/exercise/BaseDashboardCard.vue`                | `title` prop + `<slot />`                                                  |
| `SearchBar.vue` (props/emits)            | `components/exercise/SearchBar.vue`                        | `searchQuery`, `selectRegion` props / `update-query`, `update-region` emit |
| `WeatherCard.vue` (props/emits)          | `components/exercise/WeatherCard.vue`                      | `city`, `selected` props / `select-card`, `click-detail` emit              |
| `<style scoped>` 분리                    | 각 컴포넌트 파일                                           |                                                                            |
| 추가 컴포넌트                            | `UnitToggler.vue`, `WeatherForecast.vue`, `MainHeader.vue` | 단위 전환 UI, 5일 예보, 상단 네비게이션                                    |

### 5) 라우팅

| 요구사항                                     | 구현 위치                                                     | 비고                                                        |
| -------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Catch-all Route                              | `router/index.js` `path: '/:pathMatch(.*)*'` → `NotFoundView` |                                                             |
| 라우터 지연 로딩                             | `router/index.js`                                             | 각 라우트 `component: () => import(...)` 로 code-split 적용 |
| Navigation Bar (`RouterLink`)                | `MainHeader.vue`                                              | `/`, `/about` 탭                                            |
| 메인 콘텐츠 영역 (`RouterView`)              | `App.vue`                                                     |                                                             |
| `WeatherHomeView.vue` (`/`)                  | `views/WeatherHomeView.vue`                                   | 상세보기 시 `alert` 대신 `router.push('/weather/' + id)`    |
| `WeatherDetailView.vue` (`/weather/:cityId`) | `views/WeatherDetailView.vue`                                 | `onMounted` 시점에 `route.params.cityId`로 데이터 매칭      |
| `WeatherAboutView.vue` (`/about`)            | `views/WeatherAboutView.vue`                                  | 소개 + 대시보드로 돌아가기                                  |
| 본인 추가 View                               | `TODO`                                                        |                                                             |

### 6) 상태관리(Pinia) & 단위 전환

| 요구사항                   | 구현 위치                                                         | 비고                                                                    |
| -------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `UnitToggler.vue` 배치     | `MainHeader.vue`                                                  | Navigation Bar 옆                                                       |
| 메인/상세 페이지 단위 적용 | `WeatherCard.vue`, `WeatherDetailView.vue`, `WeatherForecast.vue` | `useGetTemp` composable(`convert`, `getSymbol`)로 중복 제거             |
| 본인 추가 Store/State      | `stores/weatherStore.js`                                          | `cityList`, `isLoading`, `error`, `loadWeather`/`loadAllWeather` action |

### 7) 외부 연동

| 요구사항                   | 구현 위치                             | 비고                                          |
| -------------------------- | ------------------------------------- | --------------------------------------------- |
| OpenWeatherMap 실시간 날씨 | `api/weather.js` `getWeather`         | `/weather` 엔드포인트                         |
| OpenWeatherMap 기능 확장   | `api/weather.js` `getTimeLineWeather` | `/forecast` 엔드포인트, 5일 예보에 사용       |
| UI 라이브러리 적용         | `element-plus`                        | `WeatherForecast.vue`의 `el-skeleton` 로딩 UI |

### 8) 코드 품질 & 배포

| 요구사항             | 구현 위치                                           | 비고                 |
| -------------------- | --------------------------------------------------- | -------------------- |
| ESLint 점검          | `npm run lint`                                      | 실행 결과 첨부 예정  |
| API 키 환경변수 처리 | `.env` (`VITE_API_KEY`), `.gitignore`에 `.env` 포함 |                      |
| Build                | `npm run build`                                     |                      |
| Hosting              | Vercel                                              | 배포 URL은 상단 참고 |

## 상세 내용

### ESLint 점검

`npm run lint`(oxlint + eslint) 실행 결과 에러 0건을 확인했습니다.

`!사진`

### Forecast API를 활용한 5일 예보 / 오늘 시간대 예보 구현

OpenWeatherMap의 `/forecast`는 5일치 데이터를 3시간 간격으로 내려주기 때문에, 화면에서 필요로 하는 두 가지 뷰(오늘 시간대별 예보, 5일간 일별 요약)를 만들려면 응답을 그대로 쓰지 않고 별도의 집계 로직이 필요합니다.

- **오늘 시간대 예보**: `dt_txt`가 오늘 날짜인 항목만 추려내는 `todayForecast` computed
- **5일 일별 요약**: `dt_txt`의 날짜(`YYYY-MM-DD`)를 key로 3시간 단위 데이터를 그룹핑한 뒤, 그룹별 최고/최저 기온(`temp_max`/`temp_min`)을 계산하고 대표 날씨는 정오(`12:00:00`) 데이터를 우선 사용하는 `dailySummary` computed (`WeatherForecast.vue`)
- **UTC → 로컬 시간 변환**: OpenWeatherMap이 내려주는 `dt`는 UTC 기준 Unix timestamp라 그대로 쓰면 시간대가 어긋나므로, `toLocalTimeStr`에서 `new Date(dt * 1000)`으로 변환 후 `getHours()`/`getMinutes()`로 로컬 시간 기준 "오전/오후 N시" 문자열을 만들어 표시 (`WeatherForecast.vue`)

`!사진`

### 외부 UI 라이브러리(Element Plus) 적용

위 `todayForecast`, `dailySummary` 두 집계 함수는 API 응답을 받은 뒤 연산을 거쳐야 화면에 표시할 수 있어서, 데이터가 준비되기 전까지 빈 화면이 노출되는 구간이 생깁니다. 이 구간에 Element Plus의 `el-skeleton`을 적용해 로딩 중임을 알리고, 데이터가 채워질 때 레이아웃이 갑자기 밀리는 현상을 방지했습니다 (`WeatherForecast.vue`의 `isLoading` 상태와 연동).

`!사진`

## 트러블슈팅

### watch(props.city, cb)가 값 변경을 못 잡는 문제

```js
const props = defineProps({
  city: { type: Object, required: true },
})
watch(
  () => props.city,
  async (newCity) => {
    if (!newCity || !newCity.en_name) return
    isLoading.value = true
    const resData = await getTimeLineWeather(newCity.en_name)
    forecastList.value = resData.list
    isLoading.value = false
  },
  { immediate: true },
)
```

`/components/exercise`에서 위와같은 코드를 작성할 때, `watch(props.city,()=>{})`형식으로 넣었었는데, 이와 같은 경우 watch가 생각보다 제대로 작동하지 않았었다. city의 경우 부모 컴포넌트에서 params를 받은 ref객체 넘겨주는데 왜 안될까? 에 대한 고민을 했었다.

부모 컴포넌트는 `city`를 `ref('')`로 초기화해두고, `onMounted` 시점에 실제 값으로 바꿔주는 구조였다.

```js
const city = ref('')
onMounted(() => {
  city.value = cityList.find((item) => item.id === cityId.value)
})
```

`:city="city"`로 넘기면 ref는 자동으로 언랩되기 때문에, 자식 입장에서 `props.city`는 처음엔 빈 문자열(`''`)이다. `watch(props.city, cb)`는 watch를 호출하는 그 줄이 실행되는 순간에 `props.city` 값을 딱 한 번 평가해서 꺼내오는데, 그 시점 값이 `''`이니 결국 `watch('', cb)`를 부른 것과 같아진다. 이 순간부터 watch는 `props.city`라는 반응형 소스와의 연결이 끊긴 채, 고정된 문자열 `''`만 감시 대상으로 들고 있게 된다.

이후 `onMounted`에서 `city.value`가 실제 도시 객체로 바뀌면 `props.city` 자체는 최신값으로 잘 갱신된다. 문제는 watch가 그거랑 상관없이 처음에 꺼내놓은 옛날 값(`''`)만 들여다보고 있어서 변화를 전혀 못 잡아낸다는 것.

`watch(() => props.city, cb)`처럼 getter로 감싸면 이 문제가 해결된다. 함수는 watch 호출 시점에 바로 실행되는 게 아니라, watch가 감지 주기마다 그 함수를 다시 실행해서 "지금 이 순간의 props.city"를 매번 새로 읽어오기 때문에, 값이 `''` → 객체로 통째로 바뀌는 것도 놓치지 않고 잡아낸다. props처럼 부모에서 값 자체가 재할당될 수 있는 경우엔 props처럼 부모에서 값 자체가 재할당될 수 있는 변수는 watch에 값 자체를 직접 넘기지 말고, 항상 `() => props.xxx`처럼 콜백(getter) 형태로 감싸서 넘겨주는 게 안전하다.

---

### Vercel 배포가 Blocked로 뜨는 문제 (git author 이메일 불일치)

!사진

vercel.json을 추가하고 push했는데, 같은 브랜치인데도 이전 커밋(`7a75ecf`)은 Blocked, 최신 커밋(`f182967`)은 Ready로 뜨는 상황이 발생했다.

원인은 git author 이메일이었다. `git config --global user.email`을 설정하기 전에 만든 커밋은 GitHub 계정에 연결 안 된 이메일로 기록돼 있었고, Vercel은 GitHub App 연동으로 "이 커밋을 만든 사람이 배포 권한이 있는지"를 author 이메일 기준으로 판단하다보니 예전 커밋은 Blocked로 막힌 것으로 보인다. 이후 `git commit --amend --reset-author`로 author 이메일을 GitHub 계정 이메일과 맞춘 뒤엔 정상적으로 Ready로 배포됐다.

!사진

---

### vue store와 react zustand의 차이에 대한 고찰

React는 컴포넌트가 어떤 값을 실제로 썼는지 자동으로 추적하는 메커니즘이 없다. 그래서 Zustand로 store를 만들어도, selector 없이 `useStore()`로 전체를 구독하면 store 안의 아무 값이나 하나만 바뀌어도 그 store를 구독 중인 컴포넌트는 전부 리렌더링된다. 그래서 `useStore((state) => state.count)`처럼 selector로 "나는 이 값만 볼래"를 개발자가 직접 명시해야 하고, 컴포넌트 렌더링과 무관하게 값만 필요할 땐 `getState()`로 구독 없이 그냥 꺼내 쓴다.

반면 Vue의 컴포넌트 렌더 함수 자체는 하나의 reactive effect라서, 렌더링되는 동안 템플릿에서 실제로 읽은 **반응형 속성만 Proxy의 get 트랩에 걸려 자동으로 의존성이 등록이 된다는 사실을 알게 되었다.** Pinia store도 이 위에서 동작하기 때문에, `store.count`를 쓴 컴포넌트는 count가 바뀔 때만, `store.name`을 쓴 컴포넌트는 name이 바뀔 때만 리렌더링되고 서로한테 영향을 안 준다.

React/Zustand는 selector로 구독 범위를 수동으로 좁혀야 하고, Vue/Pinia는 읽은 속성만 자동으로 추적해서 알아서 좁혀진다는 게 핵심 차이인 것을 실습 중 파악할 수 있었다.

# Notes Angular

## Paradigmas der webdevelopment

- SPA - Single Page Application
  - React Angular Vue Svelte Qwik...
  - HTMX
  - nadeel: alles moet gedownload worden
    - Angular: 230kb
    - React: 100kb
    - Svelte: 40kb
    - Blazor WebAssembly: 7MB
  - voordeel: na het laden lekker snel zijn.
    - statewijzigingen, minder request-response
    - hoog niveau aan interactie - snel feedback geven
  - hip

- SSR - Server-side rendering
  - HTMX
  - de server rendert de allereeste pagina
  - SSR is altijd complementair aan de SPA
    - Next.js Nuxt.js @angular/ssr SvelteKit SolidStart QwikCity
  - op achtergrond worden na/tijdens renderen alle interactieve bitjes en bytejes opgestuurd
    - hydration:  progressive hydration  streaming hydration
  - hip
  - complexiteit++

- SSG - Static Site Generation
  - productcatalogus  /product/148483/haarborstel.html
  - tijdens het builden - pipeline - voor elk product ga je een .html-bestand genereren
  - 11ty HUGO docusaurus
  - React Angular
  - hip

- MPA - Multi Page Application
  - traditionele webapp
  - ASP.NET MVC/Razor Pages/PHP
  - niet hip.

## Intro Angular

- uitgekomen in 2016. De opvolger van AngularJS
- gemaakt door Google

### Angular vs the world?

Angular is een echt framework met vele features:

- routing
- dependency injection
- `HttpClient` die automatisch JSON parset
- architectuur

Z'n grootste concurrenten zijn view libraries:

- Vue  2015
  - Evan You - Google
- React  2013
  - AI is hier het best bij
  - Meta
  - JSX/TSX
- Svelte
  - Rich Harris - Vercel
  - heel elegant
- Solid
  - Ryan Carniato

### Nadelen

- wat zwaarder:
  - meer kb's om te downloaden
  - steilere leercurve
- overhead: veel bestandjes
- ze zitten vol in een modernisatieslag - grote migratie
  - v14 en later
    - Angular Material => MDC
    - standalone components/directives/pipes/alles
    - signals
      - delen zijn herschreven: `@Input()` `@Output()` vs `input()` `output()`
      - signal-based forms
      - routing  httpclient
    - unittesten: karma/jasmine deprecated, v21 Vitest
    - end-to-end testen: Protractor  Playwright    /Cypress

## Project aanmaken

Even dit aanmaken:

- index.html
- styling
  - SCSS Tailwind
- unittesten
  - Vitest
- end-to-end testen
  - Playwright (auto-waiting)   Cypress    Selenium (oudstgediende)
  - installeren en configureren
- TypeScript
  - installeren en configureren
- buildtool
  - Vite webpack
  - installeren en configureren
- linting
  - ESLint

Makkelijker: de Angular CLI

```sh
pnpm install --global @angular/cli
```

Geeft deze commando's:

```sh
ng new <projectnaam>
ng build
ng test
ng serve # start een webserver en deployt jouw app daarop
ng generate whatever mijnnaam
```

## Stylingsysteem

- Bootstrap
  - vroeger wel leuk. en handig.
  - alle Bootstrap-sites lijken op elkaar.
  - veel `<div>`jes
- SCSS
  - Niks mis mee, an sich
  - Iedere keer weer een suf functioneel naampje voor HTML-elementen bedenken is beetje irritant `.jouw-class { }`
  - wil nog wel eens conflicten opleveren omdat een class op meerdere plekken gedefinieerd wordt en tegenstrijdige stylingregels heeft
- Tailwind
  - de moderne keuze
  - geen dode CSS in je bundle
  - in 1 oogopslag zichtbaar welke styling op een element zit
  - het is een design system
    - a11y  accessibility i18n internationalization l10n localization k8s kubernetes
    - Qua a11y heb je dat `bg-slate-300` met `hover:bg-slate-700` er al voor zorgt dat je weet dat er genoeg contrast is voor kleurenblinden

  ```html
  <div class="hover:bg-red-900 hover:dit hover:dat hover:zus hover:zo) flex justify-content p-5 m-3"></div>
  ```

## Pipes

- filters van Vue
- `| ...`
- soort formatter in je HTML

```html
{{ naampje | ding }}
```

Default pipes:

- `async`
- `date`
- `number`
- `percentage`
- `lowercase`
- `uppercase`
- `titlecase`
- `currency`

## Signals

Angular's reactive primitive

- reactiviteit - "reify something" - kunnen reageren

Signal functions:

- `signal()` - reactieve value definiëren  `.set()` `.update()`
- `computed()` - berekenen / afleiden van andere signals
- `linkedSignal()` - `computed()` met `.set()`/`.update()`
- `input()`
- `output()`
- `form()`
- `httpResource()` - signal-wrapper om de HttpClient
- `resource()` - async Promises
- `rxResource()` - async Observables

## modern Angular development

- signals
  - fine-grained DOM updates - performance 👍
  - simpelere reactiviteit
  - ruimen zichzelf op.
- zoneless
- standalone
- changedetectionstrategy `OnPush`
  - minder magie
  - observables: `markForCheck()`  `detectChanges()`  `await fixture.whenStable()`
  - signals 👍
- Testing Library voor integratietesten

waarom signals:

- Observables
  - komen uit RxJS (library) en zorgt daarmee voor meer kb's in je bundle
  - onleesbaar
    - complex genoeg
  - debugbaarheid is een dingetje
  - testbaarheid, zeker wanneer meerdere streams gecombineerd worden, kan wat irritant zijn
  - niet vergeten om op te ruimen.  `.unsubscribe()` / `| async`/ `takeUntil()`

## Forms

Momenteel 3 smaken:

- Reactive forms
- Template-driven forms
- Signal-based forms
  - Momenteel nog experimental. Zelf zit ik in het kamp van "gebruik maar", want bij een kleine breaking change pas ik liever een eventuele methodenaam aan dan dat ik een Reactive form ga omsleutelen. Maar vel daar zelf een oordeel over. [ng-tips zegt ook nog consider not using](https://ngtips.com/form#signal-forms).
- `valid()` is niet altijd gelijk aan `!invalid()` in verband met async validators die nog pending zijn

### Reactive

- unittesten is makkelijker
- custom validators zijn makkelijker
  ```ts
  function validateVoorMe(control: AbstractControl) {

  }
  ```
- is type-safer (niet perfect type-safe) dan template-driven
  - `form.value` is wat irritant qua nullability `Partial<T>`

```ts
new FormGroup({
  username: new FormControl('', Validators.required)
});
```

### Template-driven

- type-safety is wat minder want alles staat in de template
- herkenbaar aan `[(ngModel)]` - "banana in a box" syntax
- custom validators gaan dmv directive (niet mega-ingewikkeld, maar wel iets meer dan een simpele function)

```html
<input [(ngModel)]="newProduct.title" required pattern="..." mijnCustomValidator>
```

 `[(ngModel)]` is een combinatie van `value` binden en reageren op `input` event:

```html
<input [value]="..." (input)="">
```

## Components

`OnPush`-instelling geeft aan: ik hoef niet continu mee te doen met change detection

wanneer sowieso wel:

- wanneer een `input()` verandert
- wanneer er een event optreedt binnenin het component
- wanneer een signalwaarde verandert
- of expliciet - `markForCheck()`

## Integratietesten

- iets aan het integreren
- bij frontend is dat vaak HTML renderen

Angular komt zelf ook met integratietest-ondersteuning:

```ts
let fixture = TestBed.configureTestingModule(...).createComponent();
fixture.nativeElement.querySelector() // HTML raadplegen
```

Echter is dit wat primitief. Het is "gewoon" de HTML querien. Ook events aftrappen -werkt wel-:

```ts
button.dispatchEvent(new CustomEvent('click'));   
```

Maar het is een hele chirurgische, technische operatie. Het houdt geen rekening met of de knop gedisabled is, überhaupt zichtbaar is, niet volop aan het animeren is.

Testing Library probeert dit alles beter te doen. Focust op het gebruikersperspectief. Selecteert elementen op een accessible manier. Triggert events enkel als dat "kan" en simuleert cursor-bewegingen voordat de klik gebeurt.

Verder:

- Testing Library prefereert meer integratietests over unittests, want integratietests geven meer vertrouwen dat "het hele systeem werkt" terwijl ze nog steeds relatief snel te maken/te runnen zijn.
- geen stricte AAA- meer Arrange-(Act-Assert)*
  - tests lezen vaak als een user story
- qua mocken: mock what you don't own.
  - Browser APIs, HTTP-requests, etc.
	- mock for practical reasons, but not for convenience
    - code die 12 seconden duurt om uit te voeren, mag gemockt worden

## Dependency injection

- inject dependencies
- afhankelijkheid los definiëren
- low coupling, high cohesion
- service beschikbaar maken:
  - registreren in `providers` array van `app.config.ts` (oude manier)
  - middels `{ providedIn: 'root' }`
    - betere, moderne manier. helpt met het optimaliseren van je bundle.
- service injecteren:
  - via constructor: heeft minder de voorkeur want bijzondere TypeScript-syntax, maar ook dat steeds meer Angular-onderdelen functies worden ipv classes.
  - `inject(JouwService)`

## Backendcommunicatie

Opties:

- `fetch().then(x => x.json())`
  - werkt met Promises
  - doet niks met types
  - gooit geen error bij 400/401/403/404/...
- `HttpClient`
  - Angular's ding
  - typesafety-ig   `this.http.get<Product[]>()`
  - gooit wat meer errors
  - werkt via Observables
    - Makkelijk met signals te gebruiken d.m.v. `httpResource()`
      - [helaas wel enkel bedoeld voor GET-requests](https://angular.dev/guide/http/http-resource)
        >TIP: Avoid using httpResource for mutations like POST or PUT. Instead, prefer directly using the underlying HttpClient APIs.
      - nog wel experimental
  - parset JSON
  - ondersteunt interceptors
    - request: logging / headers (Auth)
    - response: logging / "2025-06-24T12:12:07Z"  => DateResponseInterceptor / ErrorInterceptor
  - bij het testen kun je de `HttpTestingController` gebruiken om HTTP-requests te onderscheppen
  - met `OnPush` moet je hier of `markForCheck()` gebruiken om de data daadwerkelijk zichtbaar te krijgen. (of `|async` gebruiken, die dat voor je doet)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/angular/overview) is ook een overweginkje waard. Hij is nog experimental, maar:
  - is wel compleet signal-gebaseerd
  - bruikbaar voor GET, POST, PUT, DELETE en PATCH
  - komt meteen met `isLoading()` metadata signals
  - heeft caching ingebouwd en query invalidation
  - ondersteunt pagination en infinite queries

### Hoe ververs ik mijn lijst na een POST/PUT/DELETE?

1. De response van de POST gebruik om mijn lokale array bij te werken
   - voordeel: meer in sync met server. request ging goed. je hebt een id id, paginering/sortering niet.
   - voordeel: het is relatief snel.
   - nadeel: het duurt wel langer dan optie #2
   - alternatief: de server niet 1 bijgewerkte entity terug laten geven, maar de hele lijst.
   - nog een alternatief: client redirecten naar waar toegevoegde entity staat.
2. Meteen je lokale array bijwerken
   - heb je geen id
   - 2 waarheden - niet in sync met de server. paginering/sortering
   - voordeel: (gebruiksvriendelijkheid mits je het goed doet)++
   - nadeel: moeite. achteraf ID bijwerken.
   - heeft een naam: optimistic UI
3. De hele lijst opnieuw ophalen / pagina refreshen
   - nadeel: traagst. dubbele request. server maximaal belast.
   - voordeel: meest in sync, afhankelijk van hoe snel backend shizzle verwerkt
   - voordeel: vaak het gemakkelijkst te implementeren  `.getAll()`

## Routing - SPA

1. routes definieren   /home ==> HomeComponent
2. `<router-outlet />`
3. alles opsplitsen  <== meeste tijd.

Router features:

- lazy loading
- route guards - checken of jij wel naar een pagina MAG
- route resolvers - data   /product/1245
- child routes
- nu in signals graag
- params zijn uitleesbaar door `ActivatedRoute` te laten injecteren of middels de nieuwere `withComponentInputBinding()` en dan een `input()`-signal te gebruiken

## Asynchroniteit

- `Promise`: wrapper om async procesje - altijd 1 resultaat (HTTP request)
  - `fetch('api/products')`
- `Observable`: wrapper om async procesje - meerdere resultaten (stream)

## Advanced testing

- Testing Library voor integratietesten hebben we al gezien 👍
- Functies mocken met `vi.fn()`
  - TypeScript utility `Pick<>` kan handig zijn bij grote interfaces te mocken
    ```ts
    let navigateServiceMock: Mocked<Pick<NavigateService, 'next' | 'previous'>>;
    ```
- `vi.useFakeTimers();` met `vi.advanceTimersByTime(2000);` helpt bij het testen van async code
  - ⚠️ dit is een globale instelling, zie hieronder
- `vi.setSystemTime()` helpt met het testen van code die de huidige datum/tijd gebruiken
  - ⚠️ idem globale instelling, zie hieronder

Globale instellingen resetten met een globale `afterEach()`:

```ts
afterEach(() => {
	vi.clearAllTimers();
	vi.useRealTimers();
	vi.restoreAllMocks();
});
```

## Change detection

- Het proces van veranderende data ===> DOM doorvoeren
- unidirectional top-down dirty-checking   `{{name}}`
  - reeete-inefficient?
    - behoorlijk snel. ze doen er wel moeite voor, o.a. met branch prediction
  - mogelijk zorgen signals ervoor dat dit mechanisme geheel komt te vervallen. Maar da's nog wel eventjes weg.
  - je kan een `provideCheckNoChangesConfig({ exhaustive: true }),` opnemen in de `app.config.ts` zodat Angular in development mode (zie browser console) change detection 2 keer runt. Dit om te checken dat je geen data aanpast gedurende het databindingproces. Zo wel, dan krijg je een `ExpressionChangedAfterItHasBeenCheckedError`
    - deze error komt meestal door data-aanpassingen op een ongepaste moment (vanuit template of bijv. in `ngAfterViewInit()`). Maar ik heb hem ook wel eens gehad toen ik vanuit een directive `inputElement.focus()` aanriep.
- ~10.000 databindingexpressies is OK
  - klinkt veel, maar als je wat onbezorgd te werk gaat kun je er relatief makkelijk aan komen. Denk aan een `<crud-grid>` met inline editmogelijkheden, 8 expressies per cel x 7 kolommetjes x 50 rijen tikt al aardig aan.
- `markForCheck()` geeft aan dat een component weer mee wil doen in een change detection cycle

JavaScript is single-threaded. Een trage cycle betekent een vastlopende UI.

### Zone.js

Wat Zone.js doet:

```ts
let originalTimeout = window.setTimeout;
window.setTimeout = (callback, ms) => {
  originalTimeout(() => {
    callback();
    runChangeDetection();
  }, ms);
};
```

Zone.js patcht async APIs en dient als **trigger voor een change detection cycle**

## Coole links

- [Rx Playground](https://softwaremill.com/learn-reactive-programming-with-rx-playground/), toffe visualizatie van RxJS-operators
- [ngx-oneforall](https://github.com/love1024/ngx-oneforall?tab=readme-ov-file), geinige utilities
  - zeer nieuw, zeer weinig downloads, overweeg om eventueel "gewoon" even naar de repo te gaan en stukjes code te kopieren naar jullie codebase
- [Angular DevTools](https://chromewebstore.google.com/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh), kan helpen met debuggen van bijv. dataflow in componenten

## Vervolgstappen na deze training

Jullie gaan ongetwijfeld deel uitmaken van de migratie van oud naar modern Angular. Afhankelijk van wat er op je project gebruikt wordt zijn dit dan interessante verdiepingsslagen:

- Angular gewoon meer ervaren
- RxJS
- tests - Karma/Jasmine, Vitest, Testing Library, ng-mocks
- End-to-end testen (tip: Playwright)
- Tailwind
- Angular Material en CDK

Voor wanneer Angular meer geland is:

- state management libraries - [NgRx](https://ngrx.io/)/[NGXS](https://www.ngxs.io/)
- TanStack Query/Table


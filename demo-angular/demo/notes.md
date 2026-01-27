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
  - Ryan Cavanaugh

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
  - alles Bootstrap-sites lijken op elkaar.
  - veel `<div>`jes
- SCSS
  - Niks mis mee an sich
  - Iedere keer weer een suf functioneel naampje voor HTML-elementen bedenken is beetje irritant `.jouw-class { }`
  - wil nog wel eens conflicten opleveren omdat een class op meerdere plekken gedefinieerd wordt en tegenstrijdige stylingregels heeft
- Tailwind
  - de moderne keuze
  - geen dode CSS in je bundle
  - in 1 oogopslag zichtbaar welke styling op een element zit
  - het is een design system
    - a11y  accessibility i18n internationalization l10n localization k8s kubernetes
    - `bg-slate-300` met `hover:bg-slate-700` zorgt er al voor dat je weet dat er genoeg contract is voor kleurenblinden

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

- `signal()` - reactieve value definier  `.set()` `.update()`
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

waarom signals:

- Observables
  - komen uit RxJS (library) en zorgt daarmee voor meer kb's in je bundle
  - onleesbaar
    - complex genoeg
  - debugbaarheid is een dingetje
  - testbaarheid, zeker wanneer meerdere streams gecombineerd worden, kan wat irritant zijn
  - niet vergeten om op te ruimen.  `.unsubscribe()` / `| async`/ `takeUntil()`


## Forms







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

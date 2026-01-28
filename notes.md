# Notes

## Node / Deno / Deno

Node
- 2009
- Ryan Dahl

Deno
- 2020
- hetzelfde, maar wel anders
- TypeScript out-of-the-box
- `deno run --allow-read C:\Temp --allow-net bla.ts`
- compatibiliteit met npm packages
  - sinds v2 WEL

bun
- 2022
- performance
- $$$

npm
- apart bedrijf
- kondigde in 2019 aan een commercialisatieslag te willen doen
- inmiddels overgenomen door Microsoft

## Coole Emmet-completions

- `!` is een standaard HTML-templateje
- `form>ol>li*4>label[for="input-"]+input[id="input-"]` is een geinig formuliertje:
  ```html
  <form action="">
      <ol>
          <li><label for="input-"></label><input type="text" id="input-"></li>
          <li><label for="input-"></label><input type="text" id="input-"></li>
          <li><label for="input-"></label><input type="text" id="input-"></li>
          <li><label for="input-"></label><input type="text" id="input-"></li>
      </ol>
  </form>
  ```

## Overloading?

jQuery heeft soort van overloads:

```ts
$('div') // alle divs selecteren
$(function() { }); // DOM ready function
$('<div>') // nieuw element maken
```

En hoe dat werkt: veel `if` en checken wat je meegeeft als parameter.

## Datumlibraries

- moment
  - (al jaren) in maintenance mode
- dayjs
  - niet treeshakeable
- luxon
  - geen TS types
- date-fns
  - 👍
- temporal-polyfill: voor als je `Date` gewoon los wil laten en met de [nieuwe `Temporal` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) wil werken

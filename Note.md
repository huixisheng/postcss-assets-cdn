yo postcss-plugin

```
    Root {
      raws: { semicolon: false, after: '' },
      type: 'root',
      nodes:
       [ Rule {
           raws: [Object],
           type: 'rule',
           nodes: [Array],
           parent: [Circular],
           source: [Object],
           selector: '.a' } ],
      source:
       { input:
          Input {
            css:
             '.a { \n    display: block;\n    background: url(\'/assets/alipay.png\')\n}',
            file:
             '/Users/huixisheng/Coding/packages/postcss-assets-cdn/__tests__/fixtures/sample.css' },
         start: { line: 1, column: 1 } } }

  console.log lib/index.js:31
    Result {
      processor: Processor { version: '6.0.23', plugins: [ [Function] ] },
      messages: [],
      root:
       Root {
         raws: { semicolon: false, after: '' },
         type: 'root',
         nodes: [ [Rule] ],
         source: { input: [Input], start: [Object] } },
      opts:
       { from:
          '/Users/huixisheng/Coding/packages/postcss-assets-cdn/__tests__/fixtures/sample.css' },
      css: undefined,
      map: undefined,
      lastPlugin:
       { [Function]
         postcssPlugin: 'postcss-assets-cd
```

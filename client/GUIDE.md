# Guide

## Install
[Create next app](https://nextjs.org/docs/pages/api-reference/create-next-app)
- Typescript -> YES
- Tailwind -> YES
- Eslint -> YES
- src -> YES
- App router -> YES
- Default alias -> YES


## .nvmrc
18.15

## .editorconfig
```ini
# editorconfig.org

root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
indent_style = tab
indent_size = 4
trim_trailing_whitespace = false

[Dockerfile]
indent_style = tab
indent_size = 4

[Makefile]
indent_style = tab
indent_size = 4
```

## ENV [Go to page](https://env.t3.gg/docs/nextjs)
We strongly recommend to use [env.t3.gg](https://env.t3.gg/docs/nextjs) to manage your environment variables.

- Create `src/env.mjs` file with the configuration

- Rename your next.config.js to next.config.mjs and import the env file

```js
// next.config.mjs
import('./src/env.mjs');
```


## Eslint
Remember to restart typescript and eslint servers from your VSCode after adding any plugin

### Add `.eslintignore`
```
/.next
/node_modules
/public
```

### Add Typescript plugin recommended [Go to page](https://typescript-eslint.io/getting-started/)

```
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

### Add Prettier [Go to page](https://www.npmjs.com/package/eslint-plugin-prettier)
```
pnpm add -D prettier
pnpm add -D eslint-plugin-prettier
pnpm add -D eslint-config-prettier
```

### Add Prettier Tailwind [Go to page](https://www.npmjs.com/package/eslint-plugin-tailwindcss)

```
pnpm add -D prettier-plugin-tailwindcss
```

```js
// .pretierrc.js
const config = {
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
```


Custom rules

```json
{

  "rules": {
    "no-console": [1, { "allow": ["info", "error", "debug"] }],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "react**",
            "group": "builtin"
          },
          {
            "pattern": "@react**",
            "group": "builtin"
          },
          {
            "pattern": "next",
            "group": "builtin",
            "position": "after"
          },
          {
            "pattern": "next/**",
            "group": "builtin",
            "position": "after"
          },
          {
            "pattern": "node_modules/**",
            "group": "builtin"
          },
          {
            "pattern": "@/env.mjs",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/lib/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/store",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/store/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/services/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@/types/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/app/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/constants/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/hooks/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/containers/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/components/**",
            "group": "internal"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"]
      }
    ]
  }
}
```

## UI components

[ShadcnUI](https://ui.shadcn.com/docs/installation/next)

```
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button
```

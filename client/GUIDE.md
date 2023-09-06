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

Create a .env.example file with the following content:

```
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_URL=http://localhost:$PORT
NEXT_PUBLIC_API_URL=http://0.0.0.0:1337/api
NEXT_PUBLIC_GA_TRACKING_ID=UA-000000-01
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
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

```bash
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

### Add Prettier [Go to page](https://www.npmjs.com/package/eslint-plugin-prettier)
```bash
pnpm add -D prettier
pnpm add -D eslint-plugin-prettier
pnpm add -D eslint-config-prettier
```

### Add Prettier Tailwind [Go to page](https://www.npmjs.com/package/eslint-plugin-tailwindcss)

```bash
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

```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button
```


## Next auth [go to page](https://next-auth.js.org/getting-started)

```bash
pnpm add next-auth
```

Create custom pages. Note that I need to disable lastpass on localhost due to an hydration error with next 13


## Fonts
next/fonts
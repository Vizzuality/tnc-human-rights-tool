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

## Eslint
Remember to restart typescript and eslint servers from your VSCode after adding any plugin

Add `.eslintignore`
```
/.next
/node_modules
/public
```

Add Typescript plugin recommended [Go to page](https://typescript-eslint.io/getting-started/)

```
pnpm add --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

Add Prettier [Go to page](https://www.npmjs.com/package/eslint-plugin-prettier)
```
pnpm add --save-dev --save-exact prettier
pnpm add --save-dev eslint-plugin-prettier
pnpm add --save-dev eslint-config-prettier
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



# next-nostr-starter-kit

[![MIT License](https://img.shields.io/github/license/alan2207/bulletproof-react)](https://github.com/unllamas/react-starter-kit/blob/main/LICENSE)

## 🤓 Tech Stack

- [NextJS](https://nextjs.org/) for web app
- [Tailwind](https://tailwindcss.com/) for style
- [Shadcn](https://ui.shadcn.com/) for UI components

## 🚀 Get Started

Prerequisites:

- Node v18+
- PNPM v8+

To set up the app execute the following commands.

```bash
git clone https://github.com/unllamas/next-nostr-starter-kit.git
cd ...
```

### Installation

```bash
pnpm install
```

##### `pnpm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `pnpm build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://vitejs.dev/guide/static-deploy) for more information.

## 🗄️ Project Structure

Most of the code lives in the `src` folder and looks something like this:

```sh
src
├── app
│   └── index.(css)
│   └── layout.(tsx)
│   └── page.(tsx)
│   └── login
│       └── page.(tsx)
├── components
│   └── layouts
│   └── ui
├── config
│   └── constants
├── features
│   └── home
│   └── login
├── hooks
│   └── use-user.(tsx)
└── lib
    └── utils.(tsx)
```
# Zapcito

![Zapcito](./assets/banner.jpg)

[![MIT License](https://img.shields.io/github/license/unllamas/zapcito)](https://github.com/unllamas/zapcito/blob/main/LICENSE)
![Stars](https://badgen.net/github/stars/unllamas/zapcito/?color=yellow)

A tiny framework to create fast [Nostr](https://nostr.com/) clients andwith lightning payments.

## 🤓 Tech Stack

- [NextJS](https://nextjs.org/) for web app
- [Tailwind](https://tailwindcss.com/) for style
- [Shadcn](https://ui.shadcn.com/) for UI components
- [LaWallet](https://lawallet.io/) for lightning payments

## 🚀 Get Started

Prerequisites:

- Node v18+
- PNPM v8+

To set up the app execute the following commands.

```bash
git clone https://github.com/unllamas/zapcito.git
cd ...
```

### Installation

```bash
pnpm install
```

##### `pnpm dev`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `pnpm build`

## 🔐 Environment Variables


Create `.env` file:

```sh
# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY='Optional'
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY='Optional'

# Payment
SIGNER_RANDOM_PRIV_KEY='Random private key in hex format'
```

## 🗄️ Project Structure

Most of the code lives in the `src` folder and looks something like this:

```sh
src
├── app
│   └── login
│   └── layout.(tsx)
│   └── page.(tsx)
├── components
│   └── layouts         # Folder for different layouts
│   └── ui              # Atomic components
├── config
│   └── constants.(tsx)
│   └── payment.(tsx)
├── features
│   └── home
│   └── login
│   └── zap
├── hooks
│   └── use-auth.(tsx)
│   └── use-profile.(tsx)
├── lib
│   └── database.(tsx)
│   └── utils.(tsx)
├── store
│   └── use-auth-store.(tsx)
├── types
└── index.(css)
```

If you want to create a `feature`, we recommend following the same general structure:

```sh
features
└── example
    └── components      # Example folder
    └── config          # Example folder
    └── hooks           # Example folder
    └── index.(tsx)
```

## 📋 Roadmap

- [x] Database Structure
    - [x] Auth
    - [x] Profiles
- [ ] Auth system
    - [ ] Generate new private key
    - [x] Login with private key
    - [ ] Login with extension
    - [x] Autologin
- [x] Generate invoices
    - [x] Pay with extension
- [ ] Profile
    - [x] Get profile
    - [ ] Edit profile
- [ ] Events
    - [ ] Get events
    - [ ] Get filtered events
    - [ ] Publish event
    - [ ] Edit event
- [ ] Relays
    - [ ] Add or remove relays

### Supports NIP's 

- [x] NIP-01: Basic protocol flow description

## License

**Zapcito** is open-source software licensed under the MIT license.

## 🩷 Donations

If you'd like to support the development of **Zapcito**, please consider donating to the developer.

- ⚡ Zap sats to [dios@lawallet.ar](dios@lawallet.ar)

## 💌 Contact

If you have any questions or concerns about **Zapcito**, please contact the developer at [npub1em3g0wcfjz5we0gaaelw07fcyqys3fwg42qykw774mvgala424rsl26ytm](https://njump.me/npub1em3g0wcfjz5we0gaaelw07fcyqys3fwg42qykw774mvgala424rsl26ytm).
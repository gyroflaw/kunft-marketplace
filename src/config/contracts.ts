import { Chain } from './chain'

export default {
  marketplace: {
    [Chain.MAINNET]: {
      contractPackageHash:
        'hash-6db1ff432a74c4191eda03327b31c5875efa93891404456e30c3dc1a7b91148e',
      versions: [
        'hash-293a3700d587190b4a425dcbfb5ac04bf28680d65775bee72269a1478b19ce75',
      ],
    },
    [Chain.TESTNET]: {
      contractPackageHash:
        'hash-7d7896b8e0f04f6c54904f834427be1fe8b0f5acdadb27e32c44051e35cb193c',
      versions: [
        'hash-be553ebfaa152c3dc1185c2265b440bea33d5aee3160f0d30524d1034a196dd2',
        'hash-4b0ae77a1bcb114293580dc0996d7ea35fd121e9086f93ea0a71e2f75ab5e0b3',
        'hash-11e2aa302b64ef51057e1507fc7f496f9472443a404d2aa8293b8e997d8cf125',
        'hash-d0546132ab1e8524bd920dc22a37e83defc3b388cb910f03958f40bad13ddcb1',
        'hash-447714147d97a4fe469326bf7b80a34bc693c7593850e5c6350dd2536b5a5f1d',
      ],
    },
  },
}

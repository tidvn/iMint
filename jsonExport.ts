type AppBuildJson = {
    kind: 'app'
    storage: 'arweave' | 'aws' | 'ipfs' // backend for storing published content
    name: string // 32 character limit for seed constraints
    version: string // Semantic version of the xNFT
    description: string // 40 character maximum
    longDescription?: string // optional longer form description
    website: string
    installAuthority?: string // Base-58 public key
    installVault?: string // Base-58 public key
    price?: number // Installation price in SOL
    supply?: number // Number of installations to allow (unset/undefined is infinite)
    tag?: 'none' | 'defi' | 'game' | 'nfts' // Defaults to 'none'
    royaltiesPercentage?: number
    programIds?: string[] // List of program public keys that are used
    props?: any,
    contact: string // Generic field for entering a method of contact
    entrypoints: {
      // Relative paths to the platform's code entrypoint files
      default: {
        android?: string
        ios?: string
        web?: string
      }
      [entry: string]: {
        android?: string
        ios?: string
        web?: string
      }
    }
    icon: {
      // Relative paths to the asset file
      sm?: string
      md?: string
      lg?: string
    }
    screenshots?: string[] // Relative paths to asset files
    splash?: {
      src: string // Relative path to asset file
      height: number
      width: number
    }[]
  }

  const data : AppBuildJson= {
    kind: 'app',
    storage: 'ipfs',
    name: "Ai Mint NFT",
    version: "0.3.1" ,
    description: "Easy Mint NFT With AI Generate Image",
    website: "https://github.com/tidvn/iMint",
    installAuthority: "9XNHHJDXixJzvwvT4ooFLfq1B1fW1815A1HuhksnGBtN",
    price: 0 ,
    tag: 'nfts',
    royaltiesPercentage: 5,
    contact: "https://github.com/tidvn/iMint",
    entrypoints: {
      default: {
        web: "./web-build/index.html",
      }
    },
    icon: {
      md: "./assets/cover.jpg"
    },
    screenshots: [
        "./assets/Screenshot/photo_1.jpg",
        "./assets/Screenshot/photo_2.jpg",
        "./assets/Screenshot/photo_3.jpg"
      ],
  }
  const fs =require('fs')
  fs.writeFileSync("xnft.json",JSON.stringify(data))
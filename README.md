## NFT Marketplace Template

This template is designed to be used within the [Dappify](http://dappify.com "Dappify") ecosystem.

#### Configurable Properties

1. Landing Page Background Image
```
type: layout,
key: backgroundUrl,
value: <image_url>
```

2. NFT Categories. Must configure one property per category as follows
```
type: category,
key: <category_name>,
value: <category_image_url>
```

3. NFT Creator link. It enables the header navbar button "Create" and links to the specified URL to allow users to mint.
```
type: action,
key: create,
value: <minter_app_url>
```

#### Author
Dappify

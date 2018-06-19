# ETH/IPFS Blog system

This is a simple blog application that is a proof of concept of connecting Ethereum's smart contracts to JSON database stored on IPFS. The communication is based on [Oraclize](http://oraclize.it) service.  

# How to run?

### Prepare a blog contract

First you have to deploy a contract. 

Here is an example how to deploy to [Rinkeby](https://www.rinkeby.io/) testnet via [infura](https://infura.io/) node.

Set your mnemonic in `wallet-config.json`.

Run migrations:

```
 truffle migrate --network rinkeby-infura --reset
```

You should see the address of the contract:

```
Blog: 0x461192ab19b0a963a77fdc8dea5ee9ac4287ff31
```

We have to set this address in `app/blog/config/blog.json` file.

### Install IPFS

You have to have your own IPFS node that will store the database. Installation process is described [here](https://ipfs.io/docs/install/).

After installation we can run the daemon:

```apple js
ipfs daemon
```

### Run the server

Install npm dependencies:

```
npm install
```

and run the server

```bash
./node_modules/.bin/parcel app/index.html
```

### Prepare blogposts

Each blogpost is stored in JSON object that consists of two attributes: title and content.

Let's prepare two blogposts.

```bash
echo '{"title":"Title of the first post", "content": "This is the awesome content!"}' > post_1.json
echo '{"title":"Title of the second post", "content": "This is the most awesome content!"}' > post_2.json
```

And we have to add them to IPFS as follows:

```bash
ipfs add post_1.json; ipfs add post_2.json
```

You should see two hashes (addresses) of the files:

```
added QmU2yr8CQfrd26Yghjx2xGdg8ZdmRKRSwcD7eBgpvL91xf post_1.json
added QmRPdMo8HEoSWSPXg1NxvLPcDNdL7YocvhXdYHjGQaXmfC post_2.json
```

You should be able to read the files by `ipfs cat` command or by a public gateway:

```bash
ipfs cat QmU2yr8CQfrd26Yghjx2xGdg8ZdmRKRSwcD7eBgpvL91xf

{"title":"Title of the first post", "content": "This is the awesome content!"}
```

```bash
curl http://ipfs.io/ipfs/QmU2yr8CQfrd26Yghjx2xGdg8ZdmRKRSwcD7eBgpvL91xf

{"title":"Title of the first post", "content": "This is the awesome content!"}
```

Keep the hashes for the next step.

Now we can add our blogposts using following command:

```
node scripts/add-blog-post.js <FILE_ADDRESS>

```

In our case:

```bash

node scripts/add-blog-post.js QmU2yr8CQfrd26Yghjx2xGdg8ZdmRKRSwcD7eBgpvL91xf
node scripts/add-blog-post.js QmRPdMo8HEoSWSPXg1NxvLPcDNdL7YocvhXdYHjGQaXmfC

```

Then you should see the link to your blog

```
Your blog is available here:
http://localhost:1234/#/u/0x351944e0d307d536737de4c6f07382548437fb53
```

Now we can open the link above and check if our blog works properly.

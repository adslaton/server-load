server-stress
================

Uses [async][async] and [http-utility][http-utility] to place stress on a sever.

## How to use

For best results define only one host and one path per terminal process.

### Edit `cfg/index.js`

```javascript
//Define cfg
cfg = {
    hosts: [
        {
            host: 'localhost',
            port: '8080'
        }
    ],
    paths: [
        '/useful'
    ],
    requests: 10000
};
```

### Run the process

`npm start`



[async]: https://www.npmjs.org/package/async
[http-utility]: https://www.npmjs.org/package/http-utility

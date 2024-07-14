const Koa = require('./koa');

const app = new Koa();

app.use((ctx) => {
  // console.log(ctx.req.url);
  // console.log(ctx.request.req.url);
  // console.log(ctx.request.url);
  // console.log(ctx.path);
  ctx.body = '';
  // ctx.response.body = 'hi';
  // console.log(ctx.body);
});

// app.use((req, res) => {
//   res.end('hello world');
// });

// app.on('error', (error) => {
//   console.log('error >>> ', error);
// });

app.listen(3001, () => console.log(3001));

import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  // eslint-disable-next-line import/extensions
  console.log(`API running on ${port}`);
});

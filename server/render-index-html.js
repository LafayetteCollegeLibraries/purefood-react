module.exports = ({app, helmet}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    ${helmet.meta.toString()}
    ${helmet.title.toString()}
    <!-- <link rel="icon" type="image/png" href="favicon.png"> -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <div id="app" className="container-fluid">
      ${app}
    </div>
    <script src="/bundle.js"></script>
  </body>
</html>
`.trim()
module.exports = async (req, res) => {
  const { code } = req.query;
  const provider = 'github';

  let status, content;

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.access_token) {
      status = 'success';
      content = JSON.stringify({ token: data.access_token, provider });
    } else {
      status = 'error';
      content = JSON.stringify({ message: data.error_description || 'Authentication failed' });
    }
  } catch (err) {
    status = 'error';
    content = JSON.stringify({ message: err.message });
  }

  const message = `authorization:${provider}:${status}:${content}`;

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage('${message}', e.origin);
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:${provider}', '*');
  })();
</script>
</body>
</html>`);
};

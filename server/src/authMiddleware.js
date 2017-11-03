import admin from 'firebase-admin'

if (process.env.FIREBASE_AUTH_ENABLED === 'true') {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

export default (req, res, next) => {
  if (process.env.FIREBASE_AUTH_ENABLED !== 'true') {
    next();
    return;
  }
  
  const token = req.get('X-Firebase-Token');
  
  if (!token) {
    res.status(401).send('Missing X-Firebase-Token')
    return;
  }

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      if (decodedToken.email_verified && decodedToken.email.endsWith(process.env.FIREBASE_AUTH_EMAIL_WHITELIST)) {
        next();
      } else {
        res.status(403).send("Forbidden")  
      }
    })
    .catch(() => {
      res.status(401).send("Couldn't verify token")
    })
}

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c3c150e26f788bda293c8149138f1234'),
  },
});

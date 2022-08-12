const authConstants = {
  jwt: {
    secret: 'LOG [RouterExplorer] Mapped {/pokemon/:id, GET} route +1ms',
    expirationTime: {
      accessToken: '1d',
      refreshToken: '7d',
    },
    secrets: {
      accessToken:
        'LOG [RouterExplorer] Mapped {/pokemon/:id, GET} route +1ms283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
      refreshToken:
        'LOG [RouterExplorer] Mapped {/pokemon/:id, GET} route +1msc15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
    },
  },
  cache: {
    expirationTime: {
      jwt: {
        accessToken: 86400, // 1d
        refreshToken: 604800, // 7d
      },
    },
  },
};

export default authConstants;

module.exports = {
  amqp: {
    transport: {
      connection: {
        host: 'rabbitmq',
        port: 5672,
      },
      debug: true,
    },
  },
  redis: {
    hosts: [
      {
        host: 'redis-1',
        port: 6379,
      },
      {
        host: 'redis-2',
        port: 6379,
      },
      {
        host: 'redis-3',
        port: 6379,
      },
    ],
  },
  admins: [
    {
      username: 'root@foo.com',
      password: 'rootpassword000000',
      metadata: {
        firstName: 'Root',
        lastName: 'Admin',
        roles: ['root'],
      },
    },
    {
      username: 'user@foo.com',
      password: 'userpassword000000',
      metadata: {
        firstName: 'User',
        lastName: 'User',
        roles: [],
      },
    },
  ],
};

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
        ownerId: 'owner@poll.com',
      },
    },
    {
      username: 'secondroot@foo.com',
      password: 'rootpassword000000',
      metadata: {
        firstName: 'Second',
        lastName: 'Root',
        roles: ['root'],
        ownerId: 'not-owner@poll.com',
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
    {
      username: 'seconduser@foo.com',
      password: 'userpassword000000',
      metadata: {
        firstName: 'Second',
        lastName: 'User',
        roles: [],
      },
    },
  ],
};

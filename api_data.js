define({ "api": [
  {
    "type": "http.post",
    "url": "<prefix>.polls.answers.create",
    "title": "Create the answer for the poll",
    "version": "1.0.0",
    "name": "polls_answers_create",
    "group": "PollsAnswers",
    "description": "<p>Broadcast <code>pollAnswerCreated</code> event with <code>Answer</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "position",
            "defaultValue": "0",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "defaultValue": "{}",
            "description": "<p>Meta of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/answers/create.js",
    "groupTitle": "PollsAnswers"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.answers.delete",
    "title": "Delete the answer for the poll",
    "version": "1.0.0",
    "name": "polls_answers_delete",
    "group": "PollsAnswers",
    "description": "<p>Broadcast <code>pollAnswerDeleted</code> event with <code>Answer</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Success metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"success\""
            ],
            "optional": false,
            "field": "meta.status",
            "description": "<p>Response status</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/answers/delete.js",
    "groupTitle": "PollsAnswers"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.answers.update",
    "title": "Update the answer for the poll",
    "version": "1.0.0",
    "name": "polls_answers_update",
    "group": "PollsAnswers",
    "description": "<p>Broadcast <code>pollAnswerUpdated</code> event with <code>Answer</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "defaultValue": "{}",
            "description": "<p>Meta of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/answers/update.js",
    "groupTitle": "PollsAnswers"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.archive",
    "title": "Archive the contest",
    "version": "1.0.0",
    "name": "polls_contest_archive",
    "group": "PollsContest",
    "description": "<p>Broadcast <code>pollContestArchived</code> event with <code>Contest</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/archive.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.create",
    "title": "Create a contest",
    "version": "1.0.0",
    "name": "polls_contest_create",
    "group": "PollsContest",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "defaultValue": "{}",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "onlyFollowers",
            "defaultValue": "false",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "hasQuestions",
            "defaultValue": "false",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "nWinners",
            "defaultValue": "1",
            "description": "<p>Number of winners</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/create.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.delete",
    "title": "Delete the contest",
    "version": "1.0.0",
    "name": "polls_contest_delete",
    "group": "PollsContest",
    "description": "<p>Broadcast <code>pollContestDeleted</code> event with <code>Contest</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Success metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"success\""
            ],
            "optional": false,
            "field": "meta.status",
            "description": "<p>Response status</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/delete.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.end",
    "title": "End the contest",
    "version": "1.0.0",
    "name": "polls_contest_end",
    "group": "PollsContest",
    "description": "<p>Broadcast <code>pollContestEnded</code> event with <code>Contest</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "answerId",
            "defaultValue": "-1",
            "description": "<p>Identificator of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/end.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.get",
    "url": "<prefix>.polls.contest.get",
    "title": "Get the contest",
    "version": "1.0.0",
    "name": "polls_contest_get",
    "group": "PollsContest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>undefined</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/get.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.get",
    "url": "<prefix>.polls.contest.list",
    "title": "Get list of contests",
    "version": "1.0.0",
    "name": "polls_contest_list",
    "group": "PollsContest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "filter",
            "defaultValue": "{}",
            "description": "<p>Filter of query</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "filter.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Unknown",
            "optional": true,
            "field": "filter.state",
            "description": "<p>State of contest</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "page",
            "defaultValue": "{}",
            "description": "<p>Pagination options</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "1 - ∞",
            "optional": true,
            "field": "page.number",
            "defaultValue": "1",
            "description": "<p>Number of page</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "1 - 20",
            "optional": true,
            "field": "page.size",
            "defaultValue": "20",
            "description": "<p>Number of results</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "allowedValues": [
              "\"id\"",
              "\"-id\"",
              "\"state\"",
              "\"-state\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "[\"-id\"]",
            "description": "<p>Fields for sorting, transformed from sort property of query , e.g. ?sort=-id,state</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Collection response metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count of results</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.page",
            "description": "<p>Page of results</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.pageSize",
            "description": "<p>Size of page</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.pageCount",
            "description": "<p>Count of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Collection of contest Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/list.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.start",
    "title": "Start/resume the contest",
    "version": "1.0.0",
    "name": "polls_contest_start",
    "group": "PollsContest",
    "description": "<p>Broadcast <code>pollContestStarted</code> event with <code>Contest</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/start.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.stop",
    "title": "Stop the contest",
    "version": "1.0.0",
    "name": "polls_contest_stop",
    "group": "PollsContest",
    "description": "<p>Broadcast <code>pollContestStoped</code> event with <code>Contest</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/stop.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.subscribe",
    "title": "Subscribe to contest",
    "version": "1.0.0",
    "name": "polls_contest_subscribe",
    "group": "PollsContest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.contestId",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.subCount",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/subscribe.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.unsubscribe",
    "title": "Unsubscribe contest",
    "version": "1.0.0",
    "name": "polls_contest_unsubscribe",
    "group": "PollsContest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Success metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"success\""
            ],
            "optional": false,
            "field": "meta.status",
            "description": "<p>Response status</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/unsubscribe.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.contest.update",
    "title": "Update the contest",
    "version": "1.0.0",
    "name": "polls_contest_update",
    "group": "PollsContest",
    "description": "<p>Broadcast <code>pollContestUpdated</code> event with <code>Contest</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "nWinners",
            "defaultValue": "1",
            "description": "<p>Number of winners</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "defaultValue": "{}",
            "description": "<p>Meta of the contest</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Contest response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"contest\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.prize",
            "description": "<p>Prize of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.onlyFollowers",
            "description": "<p>If contest is available just for followers</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.attributes.hasQuestions",
            "description": "<p>If contest has a poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations",
            "description": "<p>Relations of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.users",
            "description": "<p>Users relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Unknown[]",
            "optional": false,
            "field": "data.relations.users.data",
            "description": "<p>Users of no questions contest undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.relations.poll.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.relations.poll.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relations.poll.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/contest/update.js",
    "groupTitle": "PollsContest"
  },
  {
    "type": "http.get",
    "url": "<prefix>.polls.users.answers",
    "title": "Get users answers of the poll",
    "version": "1.0.0",
    "name": "polls_users_answers",
    "group": "PollsUsers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": true,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>undefined</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "meta.answers",
            "description": "<p>undefined undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.answers.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.answers.votesCount",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "meta.answers.userAnswered",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>undefined Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/users/answers.js",
    "groupTitle": "PollsUsers"
  },
  {
    "type": "http.get",
    "url": "<prefix>.polls.users.list",
    "title": "Get list of users for an answer",
    "version": "1.0.0",
    "name": "polls_users_list",
    "group": "PollsUsers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": true,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "page",
            "defaultValue": "{}",
            "description": "<p>Pagination options</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "1 - ∞",
            "optional": true,
            "field": "page.number",
            "defaultValue": "1",
            "description": "<p>Number of page</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "1 - 100",
            "optional": true,
            "field": "page.size",
            "defaultValue": "100",
            "description": "<p>Number of results</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "allowedValues": [
              "\"userId\"",
              "\"-userId\"",
              "\"createdAt\"",
              "\"-createdAt\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "[\"createdAt\"]",
            "description": "<p>Fields for sorting, transformed from sort property of query , e.g. ?sort=-id,state</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Collection response metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count of results</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.page",
            "description": "<p>Page of results</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.pageSize",
            "description": "<p>Size of page</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.pageCount",
            "description": "<p>Count of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>undefined undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"user\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>undefined</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/users/list.js",
    "groupTitle": "PollsUsers"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.archive",
    "title": "Archive the poll",
    "version": "1.0.0",
    "name": "polls_archive",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollArchived</code> event with <code>Poll</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/archive.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.create",
    "title": "Create a poll",
    "version": "1.0.0",
    "name": "polls_create",
    "group": "Polls",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "minUserAnswersCount",
            "defaultValue": "1",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "maxUserAnswersCount",
            "defaultValue": "1",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "defaultValue": "{}",
            "description": "<p>Meta of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/create.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.delete",
    "title": "Delete the poll",
    "version": "1.0.0",
    "name": "polls_delete",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollDeleted</code> event with <code>Poll</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Success metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"success\""
            ],
            "optional": false,
            "field": "meta.status",
            "description": "<p>Response status</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/delete.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.end",
    "title": "End the poll",
    "version": "1.0.0",
    "name": "polls_end",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollEnded</code> event with <code>Poll</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/end.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.get",
    "url": "<prefix>.polls.get",
    "title": "Get the poll",
    "version": "1.0.0",
    "name": "polls_get",
    "group": "Polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>undefined</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/get.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.get",
    "url": "<prefix>.polls.list",
    "title": "Get list of polls",
    "version": "1.0.0",
    "name": "polls_list",
    "group": "Polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "filter",
            "defaultValue": "{}",
            "description": "<p>Filter of query</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "filter.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Unknown",
            "optional": true,
            "field": "filter.state",
            "description": "<p>State of poll</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "page",
            "defaultValue": "{}",
            "description": "<p>Pagination options</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "1 - ∞",
            "optional": true,
            "field": "page.number",
            "defaultValue": "1",
            "description": "<p>Number of page</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "1 - 20",
            "optional": true,
            "field": "page.size",
            "defaultValue": "20",
            "description": "<p>Number of results</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "allowedValues": [
              "\"id\"",
              "\"-id\"",
              "\"state\"",
              "\"-state\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "[\"-id\"]",
            "description": "<p>Fields for sorting, transformed from sort property of query , e.g. ?sort=-id,state</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Collection response metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count of results</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.page",
            "description": "<p>Page of results</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.pageSize",
            "description": "<p>Size of page</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.pageCount",
            "description": "<p>Count of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Collection of polls Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/list.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.start",
    "title": "Start/resume the poll",
    "version": "1.0.0",
    "name": "polls_start",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollStarted</code> event with <code>Poll</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/start.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.stop",
    "title": "Stop the poll",
    "version": "1.0.0",
    "name": "polls_stop",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollStoped</code> event with <code>Poll</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/stop.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.unvote",
    "title": "Remove votes",
    "version": "1.0.0",
    "name": "polls_unvote",
    "group": "Polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Success metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"success\""
            ],
            "optional": false,
            "field": "meta.status",
            "description": "<p>Response status</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/unvote.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.update",
    "title": "Update the poll",
    "version": "1.0.0",
    "name": "polls_update",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollUpdated</code> event with <code>Poll</code> model</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "defaultValue": "{}",
            "description": "<p>Meta of the poll</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Poll response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"poll\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": true,
            "field": "data.attributes.contestId",
            "description": "<p>Identificator of contest</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.ownerId",
            "description": "<p>Identificator of owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.state",
            "description": "<p>State of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.minUserAnswersCount",
            "description": "<p>Minimum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.maxUserAnswersCount",
            "description": "<p>Maximum number of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.startedAt",
            "description": "<p>Start time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.endedAt",
            "description": "<p>End time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships",
            "description": "<p>Relations of poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers",
            "description": "<p>Answers relation</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.relationships.answers.data",
            "description": "<p>Answers of poll Response of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data",
            "description": "<p>Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.relationships.answers.data.data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.relationships.answers.data.data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/update.js",
    "groupTitle": "Polls"
  },
  {
    "type": "http.post",
    "url": "<prefix>.polls.vote",
    "title": "Vote for poll answers",
    "version": "1.0.0",
    "name": "polls_vote",
    "group": "Polls",
    "description": "<p>Broadcast <code>pollUserAnswer</code> event with collection of <code>Answer</code> with votes count</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT authorization</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer[]",
            "optional": false,
            "field": "answersIds",
            "description": "<p>Identificators of answers Identificator of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "meta.answers",
            "description": "<p>undefined undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.answers.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meta.answers.votesCount",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "meta.answers.userAnswered",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>undefined Answer response</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.id",
            "description": "<p>Identificator of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"pollAnswer\""
            ],
            "optional": false,
            "field": "data.type",
            "description": "<p>Model type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes",
            "description": "<p>undefined</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.attributes.title",
            "description": "<p>Title of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.pollId",
            "description": "<p>Identificator of the poll</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.attributes.position",
            "description": "<p>Position in list of answers</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.attributes.meta",
            "description": "<p>Meta of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.createdAt",
            "description": "<p>Creation time of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Date-time",
            "optional": false,
            "field": "data.attributes.updatedAt",
            "description": "<p>Update time of the answer</p>"
          }
        ]
      }
    },
    "filename": "../src/actions/polls/vote.js",
    "groupTitle": "Polls"
  }
] });

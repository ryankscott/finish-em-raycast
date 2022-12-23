#!/usr/bin/env node
// Dependency: This script requires Nodejs.
// Install Node: https://nodejs.org/en/download/

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Finish Em
// @raycast.packageName
// @raycast.mode silent

// Optional parameters:
// @raycast.icon ✅
// @raycast.argument1 { "type": "text", "placeholder": "Text" }

// Documentation:
// @raycast.description Create a todo item in Finish Em
// @raycast.author Ryan Scott
// @raycast.authorURL https://github.com/ryankscott

const crypto = require('crypto');

const createTodoInFinishEm = async (todoText) => {
    const result = await fetch(
        "http://localhost:4000/graphql",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:
                JSON.stringify({
                    query: `
  mutation CreateItem(
    $key: String!
    $type: String!
    $text: String!
    $projectKey: String
  ) {
    createItem(
      input: {
        key: $key
        type: $type
        text: $text
        projectKey: $projectKey
      }
    ) {
      key
    }
  }
 `,
                    variables: {
                        key: crypto.randomUUID(),
                        type: "TODO",
                        text: todoText,
                        projectKey: "0"
                    },
                }),
        });
    if (result.status != 200) {
        console.error(
            `Failed to create todo in Finish Em - ${result.message}`
        );
    }
}

var text = process.argv.slice(2)[0]
createTodoInFinishEm(text)

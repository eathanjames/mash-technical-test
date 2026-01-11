# mash-technical-test
Mash Game technical test for Vue/Typescript WebApp

Game should run using npm run dev after installing.

1. What additional features or improvements could be added to enhance the game experience?
Adding in better navigation - back button to return to previous stage without having to restart the entire game.

Adding in custom categories avoided this for now to make the final results screen easier to understand 

Adding in customisable colour schemes.

Adding in sound effects to the game.

Adding a share button to the final screen.
3. How could AI be leveraged to make the game more engaging or personalized?
Adding in a post game image or story generator to show what that 'life' would look like.

Adding in a suggestion button to generate custom options relevant to the category


4. What infrastructure would be required to support AI-enhanced functionality?
There would need to be some API level to integrate into an AI service of choice in the backend, this would need to include authentication, handling connections into the api, validating results, handling errors/exceptions and any rate limiting logic. This would also need to handle AI usage, alerts when limits are starting to be hit, any ongoing monitoring of the service to check peak times, useages etc. Adding in some level of caching depending on which AI services are required.

5. How would you ensure that any AI-generated content or recommendations are accurate and appropriate?
First would be ensuring the prompts are set up with sufficient rules in place eg.
STRICT RULES:
- Content must be appropriate for ages 8+
- NO violence, drugs, alcohol, or adult themes
- NO real people's names (celebrities, politicians, etc.)
- NO stereotypes or discriminatory content

Validating the output that the ai returns.

Using a seperate AI Agent to validate the previous results.

Storing any data returned to perform human validation and continually improve the agents.

6. If users wanted to save and revisit their previous game results, how would you design this feature?
Easiest solution would be local storage saving some of the game state to a json string.

More complex version would involve saving the game file to a database and authing the user to ensure they get their data from the database.

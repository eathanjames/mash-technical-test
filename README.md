# mash-technical-test
Mash Game technical test for Vue/Typescript WebApp

Game should run using npm run dev after installing.

Tools used:
Webstorm IDE

Made use of Claude.AI for some debugging and validating code.

1. What additional features or improvements could be added to enhance the game experience?
      Adding in better navigation - back button to return to previous stage without having to restart the entire game.
      
      Adding in custom categories avoided this for now to make the final results screen easier to understand with regards to the 'You will marry x' etc.
      
      Adding in customisable colour schemes.
      
      Adding in sound effects to the elimination round to increase the enjoyment.
      
      Adding a share button to the final screen either just sharing the results or the AI generated image if that was connected into it.

2. How could AI be leveraged to make the game more engaging or personalized?
      Adding in a post game image or story generator to show what that 'life' would look like. Potentially providing a picture to use a likeness for yourself to be in the image.
      
      Adding in a suggestion button to generate custom options relevant to the category, could also have a 'good' and 'bad' option generator.
      Eg for Kids, good could generate 3 (assuming it isn't already present) and bad could generate 10,000


3. What infrastructure would be required to support AI-enhanced functionality?
      I would have a service specifically set up as the integration into the AI API of choice, in C# I would have this as a class library within the AI Service to ensure if we wanted to utilise multiple AI connections or switch out one for another we could do without impacting relied upon systems.

   This system would handle authentication into the API, handling connections into the api, validating results, handling errors/exceptions and any rate limiting logic. This would also need to handle AI usage, alerts when limits are starting to be hit, any ongoing monitoring of the service to check peak times, useages etc. Adding in some level of caching depending on which AI services are required to ensure we aren't increasing costs unnecessarily.

5. How would you ensure that any AI-generated content or recommendations are accurate and appropriate?
      First would be ensuring the prompts are set up with sufficient rules in place eg.
      STRICT RULES:
      - Content must be appropriate for ages 8+
      - NO violence, drugs, alcohol, or adult themes
      - NO real people's names (celebrities, politicians, etc.)
      - NO stereotypes or discriminatory content
      
      Secondly validating the output that the ai returns with data sanitisation checks.
      This is a more arduous way of doing things but acts as a final barrier, having something like a known bad words/known famous people list that you can validate against.
      
      We could also use a seperate AI Agent to validate the previous results.
      
      Storing any data returned to perform human validation and continually improve the agents.

6. If users wanted to save and revisit their previous game results, how would you design this feature?
      Easiest solution would be local storage saving some of the game state to a json string.
      Eg, { Categories: [{ Category: Id, Name, Options[{ Option: Id, Value, Active, CategoryId}]}]}
      Which could be expanded if needed depending on the data within the game. 
      
      
      More complex version would involve saving the game file to a database and authing the user to ensure they get their data from the database.
      This would require the backend integration into a database, setting up the database and having some level of Authentication in the application to ensure users where only able to access their own data. 


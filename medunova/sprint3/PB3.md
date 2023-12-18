==================================================================
User Story 2.15 - 10 Points BreakDown

As a Developer, I want to search through all the sentences that
were returned from US 2.14 and find the best possible answer and
formulate a response using that answer.

==================================================================
User Story 2.15.1 - 3 Points

As a Developer, I want to formulate a response given a question
and an answer so that I may return a properly formatted response.

Method:
Given the question if it can be written in yes/no format then I
can restate the question with the answer directly before/after:
Can I take with food? -> Yes, you can take with food.
However we see the pronouns switched here so perhaps removing any
pronouns from the sentence will help and adding the pronoun 'you'
to the beginning may be best method

If it cannot be written in yes/no format then a number answer 
such as:
How often do I take this medicine? -> take this medication x
amount per day/month or so on.
Once again pronouns need to be removed this time take the 
preceeding parts.

If the answer cannot be provided then return a set string
defined by the product owner

Acceptence Criteria:
-The response is formatted so it looks like a human has
answered the question
-Formulate in an easy to interpret way
-Formulate the cannot be answered string that is provided by
the product owner

==================================================================
User Story 2.15.2 - 3 Points

As a Developer, I want to regex the question more to be able to
look for phrases/keywords that may help answer the question. This 
is to further breakdown the answer methods and help produce a 
proper answer

Method:
Phrases such as 'How many' and 'Can I' help to dictate the form
of the answer. These phrases tell us wether we need a number in
our response or answer as a 'yes' or 'no'.

This should be regexed to the point where we know what is required
to properly answer the question and we will look for specific
things in the sentence based on the regex model

Acceptence Criteria:
-The regex functions as needed, that is if the question can be
answered in a certain way such as yes/no answers we can return
that type as needed
-keywords are needed here such as can/cannot signify yes/no
answers, therfore should be referring to files with all possible
keywords

==================================================================
User Story 2.15.2 - 1 Point

As a Developer, I want to formulate a regex in order to help
breakdown the necessary components of the answer

Method:
Phrases such as 'How many' and 'Can I' help to dictate the form
of the answer. These phrases tell us wether we need a number in
our response or answer as a 'yes' or 'no'.

This should be regexed to the point where we know what is required
to properly answer the question and we will look for specific
things in the sentence based on the regex model

Acceptence Criteria:
-The regex model will help break down the answer we are looking
for into components like the inclusion of 'can' or 'cannot' for
yes or no question or search for numbers in quantatative questions

==================================================================
User Story 2.15.3 - 6 Points

As a Developer, I want to connect the regex model and scan the
returned sentences for the criteria given from the model, this
is to finalize on choosing an answer

Method:
Scan question for the appearance of the criteria given by the
regex model then return the best sentence or none if the sentence
cannot be answered

Acceptence Criteria:
-The sentence returned will have the criteria of the regex
satisfied or be None otherwise

==================================================================
User Story 3.1 Frontend - Points(4)*

As a User, I want to have an appealing and visually pleasing chat 
box that I can interact with. The chat box should be intuitive and
famillar looking as well.

Criteria of Acceptance:
- chat box to be on the right side of the page (if screen is wide enough)
- The chat box should not overlap with the main content in the middle (on all devices - responsive design)
- The chat box should have some spacing from the page sides (margins).
- The chat box's colors should mirror the page's colors: purple & white.
- chat box to have an outline or border of some sort
- product name, Medunova, to be placed somewhere on the chat window. Perhaps in a header.
- search bar and buttons to not only be intuitive, but memorable.
- search bar to have something more catchy than "Search questions here" as a prompt when the search bar is empty

==================================================================
User Story 3.2 Frontend - Points(2)*

As the User, I want to know who is saying what in the chat. 
Criteria of Acceptance:
- new and existing messages sent by the chat to have the name Medunova attached to them, as well as the User's name
- new and existing chat messages to have colored bubbles, like the blue, green, and grey of text message bubbles.
- All sizes of messages work with the text bubbles and do not cause visual issues.
- change chat box to have recent messages at bottom instead of top

==================================================================
User Story 3.3 Frontend/Backend - Points(5)

As a developer, I need the User's information to display their name
in chat messages and their other information for various other 
functions. As such, I need to retrieve their account data to use it.

Criteria of Acceptance:
- At all instances the user is mentioned, the User's account name must be used
- Any valid information from the User's account, such as age or medicines being taken, must be retrieved so it can be used/displayed as needed
- If information cannot be retrieved (for some reason) we must fail gracefully, i.e not show error messsages

==================================================================
User Story 3.4 Frontend - Points(1)

As the Owner, I want some disclaimers to be communicated to the 
user. I want a disclaimer for no data found(a) and a disclaimer
for succesful results.

(a) "Please contact your local pharmacist", or something similar

(b) "Based on the monograph, we see that..."

Criteria of Acceptance:
- Either have (b) show up when the chat is instantiated or have it as fine print on the chat visual
- Have (a) appear when no answers can be found by the engine

==================================================================
User Story 3.5 Frontend - Points(5)

As a user, I want to be able to get my conversation with the chat
emailed to me for future reference. It would be nice if this can
be done through a button on the chat bar.

Criteria of Acceptance:
- There must be a working button on the chat visual that sends a copy to the User's email when pushed
- The email must contain only the text of the chat, not any code, formatting, or style
- The email must be sent intact - i.e no cutoffs and with all of its contents unaltered

==================================================================
User Story 3.6 Frontend - Points(2)*

As a User, I want a search bar at the bottom of the page where I
can ask questions about my medication. This search field differs 
from the chat bar attached to the chat box.

Note: we already have one, but, the current search bar is an 
ajax plugin, the Owner wants to minimize dependencies 
Also it doesn't function *exactly* how we want it to
i.e make our own

==================================================================
User Story 3.7 Frontend - Points(2)*
As the owner I want the chat box to pop up only after the user makes 
an initial search in the original search bar located at the bottom of the page.

Acceptance Criteria:
- When the post is initially loaded, the chat box should not be visible.
- The chat box should appear only after an initial search is passed through (i.e. text is entered into the search bar AND the search button is clicked.)

==================================================================
User Story 3.71 Frontend - Points(1)*

As a User, I want to use the search bar at the bottom first, then
when the chat box appears, I want a search bar attached to the chat 
for ease of use. Both of them have to work.
Acceptance Criteria:
- connect search bar(s) to the back end so full functionality is achieved (messages can be displayed)
- both search bars are able to accept input and make searches (the functionality discused above)
- have two search bars, at the bottom and attached to the chat 

===================================================================
User Story 2.5 Backend - 5 Points

As a User, I want to be able to email myself a log of the questions
so that I may refer to them later
Method:
-Make backend emailing system work, then incorporate a button for
the backend code to be called upon
Acceptance Criteria:
- The backend emailing system works with any email service 


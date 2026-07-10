Hi!

Welcome to my Google Keep Clone. A Project I've made whilst undergoing my studies at Zaio: Institute of Technology.

To explain what my app does we'll start with the layout and how that informs the javascript functionality.

The UI and design had to match Google Keep. 

1) The side bar - includes a hover feature in which the menu slides to reveal the button descriptors.

2) The default form - on click it reveals the form menu with an footer containing interactive buttons. 
   This form enables the user to type in a text which adds a note to the body of the page.
   A click event on mouse out/clicking the close button reverts it back to its default state.
   
3) The note - Each note created has it's own unique ID, allowing them to be stored in the localStorage. 
   This prevents notes from erasing once the page reloads. On hover it reveals the footer containing interactive buttons. 
   On click it opens -

4) The Modal - which dominates the screen.
   The modal allows the user to make changes to the note content. 
   A click event on mouse out/clicking the close button closes the modal and updates the note's content
   Clicking on the archive button virtually deletes the note, removing it from the body.

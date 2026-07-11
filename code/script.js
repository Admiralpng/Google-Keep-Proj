class Note {
    constructor(id, title, text){
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App {
  constructor() {
    
    JSON.parse(localStorage.getItem([]));

    this.notes = JSON.parse(localStorage.getItem("notes")) || {};
    this.$selectedNoteID = "";
    
    this.$activeForm = document.querySelector(".active-form")
    this.$inactiveForm = document.querySelector(".inactive-form")
    this.$noteTitle = document.querySelector("#note-title")
    this.$noteText = document.querySelector("#note-text")
    this.$notes = document.querySelector(".notes")
    this.$form = document.querySelector("#form")
    this.$modal = document.querySelector(".modal")
    this.$modalForm = document.querySelector("#modal-form")
    this.$modalTitle = document.querySelector("#modal-title")
    this.$modalText = document.querySelector("#modal-text")
    this.$closeBtn = document.querySelector(".close-btn")
    this.$sidebar = document.querySelector(".sidebar")
    this.$miniSideBar = true;

    this.addEventListeners()
    this.displayNotes();
  }


  addEventListeners(){
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.closeModal(event);
      this.openModal(event);
      this.archiveHandler(event)
    });

    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
    });
    
    // form
    this.$form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      this.closeForm();
      this.addNote({title,text});
    })
    
    // modal
    this.$closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.closeForm(event);
      this.closeModal(event)
    })

    this.$modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
    })

    // toggle sidebar

    this.$sidebar.addEventListener("mouseover", (event) => {
      this.toggleSidebar();
    })
    this.$sidebar.addEventListener("mouseout", (event) => {
      this.toggleSidebar();
    })
  }


  handleFormClick(event) {
    
    // form
    const activeFormClicked = this.$activeForm.contains(event.target);
    const inactiveFormClicked = this.$inactiveForm.contains(event.target);
    const title = this.$noteTitle.value
    const text = this.$noteText.value

    if(inactiveFormClicked)  {
      this.openForm();
    }
    else if(!inactiveFormClicked && !activeFormClicked){
      this.addNote({title,text})
      this.closeForm();
    }
  }

// form
  openForm() {
    this.$activeForm.style.display = "block";
    this.$inactiveForm.style.display = "none";
    this.$noteText.focus();
  }

  closeForm() {
    this.$activeForm.style.display = "none";
    this.$inactiveForm.style.display = "block";
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }


  openModal(){
    const $selectedNote = event.target.closest(".note");
    
    if($selectedNote && !event.target.closest(".archive")){
      this.$selectedNoteID = $selectedNote.id;
      this.$modal.classList.add("open-modal");
      this.$modalTitle.value = $selectedNote.children[1].innerHTML;
      this.$modalText.value = $selectedNote.children[2].innerHTML;
    }
    else {
      return; 
    }
  }
  closeModal(){
    const modalFormCLickedOn = this.$modalForm.contains(event.target)
    const closeBtnClickedOn = this.$closeBtn.contains(event.target)
    if((!modalFormCLickedOn || closeBtnClickedOn) && this.$modal.classList.contains("open-modal")){
      this.editNote(this.$selectedNoteID, {title: this.$modalTitle.value, text: this.$modalText.value})
      this.$modal.classList.remove("open-modal");
    }
  }


  // note
  addNote({ title, text }) {
    if (text!= ""){
      const newNote = new Note(cuid(), title, text);
      this.notes = [...this.notes, newNote];
      this.renderSN();
    }
  }

  editNote(id, { title, text }) {
    this.notes = this.notes.map((note) => {
      if (note.id == id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
    this.renderSN();

  }

  saveNotes(){
    localStorage.setItem("notes",JSON.stringify(this.notes));
  }
  renderSN(){
    this.saveNotes();
    this.displayNotes();
  }

  handleNoteMouseOver(element){
    ("mouseover", element.id);
    const $note = document.querySelector("#"+element.id);
    const $checkNote = $note.querySelector(".check-circle")
    $checkNote.style.visibility = "visible";
    const $noteFooter = $note.querySelector(".note-footer")
    $noteFooter.style.visibility = "visible";
  }
  handleNoteMouseOut(element){
    ("mouseout", element.id);
    const $note = document.querySelector("#"+element.id);
    const $checkNote = $note.querySelector(".check-circle")
    $checkNote.style.visibility = "hidden";
    const $noteFooter = $note.querySelector(".note-footer")
    $noteFooter.style.visibility = "hidden";
  }

  displayNotes() {
        this.$notes.innerHTML = this.notes.map((note) => 
        `
        <div class="note" id="${note.id}" onmouseover="app.handleNoteMouseOver(this)" onmouseout="app.handleNoteMouseOut(this)">
          <span class="material-symbols-outlined check-circle"
            >check_circle</span
          >
          <div class="title">${note.title}</div>
          <div class="text">${note.text}</div>
          <div class="note-footer">
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >add_alert</span
              >
              <span class="tooltip-text">Remind me</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >person_add</span
              >
              <span class="tooltip-text">Collaborator</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >palette</span
              >
              <span class="tooltip-text">Change Color</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >image</span
              >
              <span class="tooltip-text">Add Image</span>
            </div>
            <div class="tooltip archive">
              <span class="material-symbols-outlined hover small-icon"
                >archive</span
              >
              <span class="tooltip-text">Archive</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >more_vert</span
              >
              <span class="tooltip-text">More</span>
            </div>
          </div>
        </div>
        `)
  }
  
  archiveHandler(){
      const $selectedNote = event.target.closest(".note");
      
      if($selectedNote && event.target.closest(".archive")){
        this.$selectedNoteID = $selectedNote.id;
        this.deleteNote(this.$selectedNoteID)
      }
      else {
        return;
      }
  }
  deleteNote(id) {
      this.notes = this.notes.filter(note => note.id != id)
      this.renderSN();
  }

  // sidebar
  toggleSidebar(){
    if(this.$miniSideBar){
      this.$sidebar.style.width = "250px";
      this.$miniSideBar = false;
    }
    else{
      this.$sidebar.style.width = "80px";
      this.$miniSideBar = true;
    }
  }

}

const app = new App()
// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// Gallery dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("galleryDropdown");
  const arrow = document.getElementById("arrow");

  if (dropdown.style.display === "flex") {
    dropdown.style.display = "none";
    arrow.innerText = "▼";
  } else {
    dropdown.style.display = "flex";
    arrow.innerText = "▲";
  }
}

// =====================
// Learning Section
// =====================
let learningData = JSON.parse(localStorage.getItem("learningData")) || [];

function renderLearning() {
  const list = document.getElementById("learningList");
  list.innerHTML = "";

  learningData.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div class="item-left">
        <b>${item.topic}</b>
        <span>${item.text}</span>
        <small>${item.date}</small>
      </div>
      <button class="danger-btn" onclick="deleteLearning(${index})">Delete</button>
    `;
    list.appendChild(div);
  });

  localStorage.setItem("learningData", JSON.stringify(learningData));
}

function addLearning() {
  const topic = document.getElementById("learningTopic").value;
  const text = document.getElementById("learningText").value.trim();

  if (text === "") {
    alert("Please write your learning first!");
    return;
  }

  learningData.unshift({
    topic: topic,
    text: text,
    date: new Date().toLocaleString()
  });

  document.getElementById("learningText").value = "";
  renderLearning();
}

function deleteLearning(index) {
  learningData.splice(index, 1);
  renderLearning();
}

function clearLearning() {
  if (confirm("Clear all learning?")) {
    learningData = [];
    renderLearning();
  }
}

// =====================
// Assignments Section
// =====================
let assignmentData = JSON.parse(localStorage.getItem("assignmentData")) || [];

function renderAssignments() {
  const list = document.getElementById("assignmentList");
  list.innerHTML = "";

  assignmentData.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div class="item-left">
        <b>${item.name}</b>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="link-btn">
          Open PDF
        </a>
      </div>
      <button class="danger-btn" onclick="deleteAssignment(${index})">Delete</button>
    `;
    list.appendChild(div);
  });

  localStorage.setItem("assignmentData", JSON.stringify(assignmentData));
}

function addAssignment() {
  const name = document.getElementById("pdfName").value.trim();
  const link = document.getElementById("pdfLink").value.trim();

  if (name === "" || link === "") {
    alert("Please enter both Assignment Name and PDF Link!");
    return;
  }

  assignmentData.unshift({ name, link });

  document.getElementById("pdfName").value = "";
  document.getElementById("pdfLink").value = "";

  renderAssignments();
}

function deleteAssignment(index) {
  assignmentData.splice(index, 1);
  renderAssignments();
}

function clearAssignments() {
  if (confirm("Clear all assignments?")) {
    assignmentData = [];
    renderAssignments();
  }
}

// Load on start
renderLearning();
renderAssignments();


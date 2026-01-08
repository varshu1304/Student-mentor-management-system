document.addEventListener("DOMContentLoaded", () => {
  const mentor = JSON.parse(localStorage.getItem("mentor")); // Logged in mentor
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Section toggle logic
  const navLinks = document.querySelectorAll(".sidebar li");
  const sections = document.querySelectorAll(".content-section");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      sections.forEach(sec => sec.classList.remove("active"));
      const target = document.getElementById(link.dataset.section);
      if (target) target.classList.add("active");
    });
  });

  // Filter students assigned to this mentor
  const assignedStudents = students.filter(s => s.mid === mentor.id);

  // Render student details
  const studentList = document.getElementById("studentList");
  assignedStudents.forEach(student => {
    const card = document.createElement("div");
    card.classList.add("student-card");
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Phone:</strong> ${student.phone}</p>
      <p><strong>Department:</strong> ${student.department}</p>
      <p><strong>Courses:</strong> ${student.courses?.join(', ') || "None"}</p>
      <p><strong>Marks:</strong></p>
      <ul>
        ${student.marks?.map(mark => `<li>${mark.subject}: ${mark.marks}</li>`).join('') || "<li>No marks added</li>"}
      </ul>
      <p><strong>Feedback:</strong> ${student.feedback || "No feedback yet"}</p>
    `;
    studentList.appendChild(card);
  });

  // Post Update Logic
  const updateForm = document.getElementById("updateForm");
  updateForm.addEventListener("submit", e => {
    e.preventDefault();
    const updateText = document.getElementById("mentorUpdate").value.trim();
    if (!updateText) return;

    const updates = JSON.parse(localStorage.getItem("mentorUpdates")) || [];
    updates.push({
      mentorId: mentor.id,
      text: updateText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("mentorUpdates", JSON.stringify(updates));
    document.getElementById("mentorUpdate").value = "";
    alert("Update posted!");
  });

  // Feedback Section Display
  const feedbackList = document.getElementById("feedbackList");
  assignedStudents.forEach(student => {
    if (student.feedback) {
      const div = document.createElement("div");
      div.innerHTML = `<p><strong>${student.name}:</strong> ${student.feedback}</p>`;
      feedbackList.appendChild(div);
    }
  });

  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("mentor");
    window.location.href = "fron_page.html"; // Redirect to login page
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const viewButtons = document.querySelectorAll(".view-btn");
  const modal = document.getElementById("studentProfileModal");
  const closeModal = document.getElementById("closeModal");

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profilePhone = document.getElementById("profilePhone");
  const profileDept = document.getElementById("profileDept");

  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      profileName.textContent = button.dataset.name;
      profileEmail.textContent = button.dataset.email;
      profilePhone.textContent = button.dataset.phone;
      profileDept.textContent = button.dataset.dept;
      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Optional: Close modal if clicking outside content
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

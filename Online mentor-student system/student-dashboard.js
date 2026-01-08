// Mentor Update Form Submission
document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const updateText = this.querySelector('textarea').value;
    if (updateText.trim() !== "") {
      alert("Update sent to mentor: \n\n" + updateText);
      this.reset();
    }
  });
  
  // Chat Form Submission
  document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = this.querySelector('input').value;
    if (message.trim() !== "") {
      alert("Message sent to mentor: \n\n" + message);
      this.reset();
    }
  });
  
  // Upload Document Form
  document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = this.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      alert("File uploaded successfully: " + fileName);
      this.reset();
    } else {
      alert("Please select a file to upload.");
    }
  });
  
  // Feedback Form Submission
  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = this.querySelector('textarea').value;
    if (feedback.trim() !== "") {
      alert("Thank you for your feedback!");
      this.reset();
    }
  });
  
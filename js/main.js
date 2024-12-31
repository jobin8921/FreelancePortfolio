// Example job data
const jobs = [
    { title: "Junior Developer", location: "Remote", description: "Entry-level development role." },
    { title: "Full Stack Engineer", location: "New York, USA", description: "Full-stack developer role." },
    { title: "Frontend Developer", location: "Remote", description: "Frontend specialist needed." },
    { title: "Backend Engineer", location: "San Francisco, USA", description: "Backend development position." },
  ];
  
  // Dynamically load jobs
  const jobContainer = document.getElementById("job-container");
  
  jobs.forEach(job => {
    const jobItem = document.createElement("div");
    jobItem.className = "job-item";
    jobItem.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.description}</p>
    `;
    jobContainer.appendChild(jobItem);
  });
  
  // Filter jobs
  function filterJobs() {
    const searchValue = document.getElementById("jobSearch").value.toLowerCase();
    const filteredJobs = jobs.filter(job => 
      job.title.toLowerCase().includes(searchValue) || 
      job.location.toLowerCase().includes(searchValue)
    );
  
    jobContainer.innerHTML = "";
    filteredJobs.forEach(job => {
      const jobItem = document.createElement("div");
      jobItem.className = "job-item";
      jobItem.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
      `;
      jobContainer.appendChild(jobItem);
    });
  }
  
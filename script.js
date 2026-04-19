// 📊 Progress calculate
function getProgress(status) {
  status = status.toLowerCase();

  if (status.includes("shipped")) return 25;
  if (status.includes("transit")) return 50;
  if (status.includes("out")) return 75;
  if (status.includes("delivered")) return 100;

  return 10;
}

// 📦 Estimated delivery
function getEstimatedDate(date) {
  let d = new Date(date);
  d.setDate(d.getDate() + 3);
  return d.toDateString();
}

// 🌍 Map update
function updateMap(location) {
  let map = document.getElementById("map");
  map.src = `https://maps.google.com/maps?q=${location}&z=13&output=embed`;
}

// 🚀 Main function
function trackParcel() {
  let id = document.getElementById("trackId").value;

  fetch(`http://localhost:5000/track/${id}`)
    .then(res => res.json())
    .then(data => {

      let output = "";

      if (data.length === 0) {
        document.getElementById("result").innerHTML = "❌ No Data Found";
        return;
      }

      // ✅ Last status
      let lastItem = data[data.length - 1];
      let progress = getProgress(lastItem.status);

      // 📊 Progress bar
      output += `
        <div class="progress-container">
          <div class="progress-bar" style="width:${progress}%">
            ${progress}%
          </div>
        </div>
      `;

      // 📦 Estimated delivery
      let estDate = getEstimatedDate(lastItem.updated_at);
      output += `<p><b>Estimated Delivery:</b> ${estDate}</p>`;

      // ✅ Timeline
      data.forEach((item, index) => {

        let isDelivered = item.status.toLowerCase().includes("delivered");
        let isLast = index === data.length - 1;

        output += `
          <div class="timeline-item 
            ${isDelivered ? "done" : ""} 
            ${isLast ? "active" : ""}">
            
            <div class="dot"></div>

            <div class="content">
              <h4>${item.status}</h4>
              <p>${item.location}</p>
              <small>${new Date(item.updated_at).toLocaleString()}</small>
            </div>
          </div>
        `;
      });

      // 🌍 Map update (last location)
      updateMap(lastItem.location);

      document.getElementById("result").innerHTML = output;
    })
    .catch(err => {
      console.log(err);
      document.getElementById("result").innerHTML = "❌ Error fetching data";
    });
}
function goHome() {
  window.location.href = "home.html";
}

function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Please enter username & password ⚠️");
    return;
  }

  let expectedPassword = user + "@123";

  if (pass === expectedPassword) {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Login ❌");
  }
}

// 📦 LOAD ALL PARCELS
function loadParcels() {
  fetch("http://localhost:5000/parcels")
    .then(res => res.json())
    .then(data => {

      console.log(data); // check

      let output = "";

      data.forEach(item => {

        // ✅ YAHI ADD KARNA THA (IMPORTANT 🔥)
        if (!item.tracking_id) return;

        output += `
          <div class="parcel-row">
            <span>
              ${item.tracking_id} |
              ${item.sender_name} →
              ${item.receiver_name}
            </span>

            <button class="delete-btn"
              onclick="deleteParcel('${item.tracking_id}')">
              Delete
            </button>
          </div>
        `;
      });

      document.getElementById("list").innerHTML = output;
    });
}

// ❌ DELETE PARCEL
function deleteParcel(id) {
  let confirmDelete = confirm("Delete this parcel?");

  if (!confirmDelete) return;

  fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE"
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    loadParcels(); // reload list
  });
}
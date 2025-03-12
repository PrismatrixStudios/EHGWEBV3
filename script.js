const users = {
    "Benefactor": { password: "38996442", role: "Admin" },
    "Arbiter": { password: "38996443", role: "Admin" },
    "Harbinger": { password: "38996444", role: "Admin" },
    "Pryator": { password: "38996445", role: "Admin" },
    "ComOfficer": { password: "48996446", role: "User" },
    "ExecOfficer": { password: "48996432", role: "User" },
    "EliteMajor": { password: "48996486", role: "User" },
    "EliteCaptain": { password: "32918729", role: "User" },
    "Guardsman": { password: "19283746", role: "User" },
    "admin": { password: "admin324968", role: "Admin" }
};

let announcements = JSON.parse(sessionStorage.getItem('announcements')) || [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    if (users[userId] && users[userId].password === password) {
        sessionStorage.setItem('user', JSON.stringify(users[userId]));
        window.location.href = 'announcements.html';
    } else {
        document.getElementById('errorMessage').innerText = 'Invalid credentials';
    }
});

// On announcements.html
window.onload = function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        if (user.role === 'Admin') {
            document.getElementById('adminControls').classList.remove('hidden');
        }
        displayAnnouncements();
    } else {
        window.location.href = 'index.html';
    }
};

function displayAnnouncements() {
    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = ''; // Clear existing announcements
    announcements.forEach(announcement => {
        const announcementDiv = document.createElement('div');
        announcementDiv.className = 'announcement';
        announcementDiv.innerHTML = `
            <h2>${announcement.title}</h2>
            <p><strong>Posted by:</strong> ${announcement.postedBy}</p>
            <p><strong>Date & Time:</strong> ${announcement.date}</p>
            <p>${announcement.message}</p>
        `;
        announcementsList.appendChild(announcementDiv);
    });
}

document.getElementById('addAnnouncement').addEventListener('click', function() {
    const title = prompt("Enter announcement title:");
    const message = prompt("Enter announcement message:");
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    if (title && message) {
        const newAnnouncement = {
            title: title,
            message: message,
            postedBy: user.role === 'Admin' ? userId : user.role,
            date: new Date().toLocaleString()
        };
        announcements.push(newAnnouncement);
        sessionStorage.setItem('announcements', JSON.stringify(announcements));
        displayAnnouncements();
    }
});

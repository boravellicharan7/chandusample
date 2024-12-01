// // Your Firebase Config (replace these with your actual Firebase project credentials)
// const firebaseConfig = {
//     apiKey: "your-api-key",
//     authDomain: "your-auth-domain",
//     projectId: "your-project-id",
//     storageBucket: "your-storage-bucket",
//     messagingSenderId: "your-sender-id",
//     appId: "your-app-id"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const storage = firebase.storage();

// // Function to update the displayed username
// function updateUserName() {
//     var userName = document.getElementById('creatorName').value;
//     document.getElementById('userNameDisplay').textContent = userName || 'User';
// }

// // Auto-expand the textarea as the user types
// function autoExpand(field) {
//     if (field.scrollHeight > field.clientHeight) {
//         field.style.height = field.scrollHeight + "px";
//     }
// }

// // Function to handle the file and text upload
// function uploadContent() {
//     var userName = document.getElementById('creatorName').value;
//     var userThoughts = document.getElementById('creatorThoughts').value;
//     var contentFile = document.getElementById('contentFile').files[0];

//     if (userName && (userThoughts || contentFile)) {
//         // Create a unique file name for Firebase Storage
//         const fileName = contentFile ? contentFile.name : null;
//         const fileRef = fileName ? storage.ref('uploads/' + fileName) : null;

//         // Upload the file to Firebase Storage if a file is selected
//         if (fileRef) {
//             fileRef.put(contentFile).then(() => {
//                 console.log('File uploaded successfully');
//                 // Optionally get the download URL after upload
//                 fileRef.getDownloadURL().then((url) => {
//                     console.log('File available at:', url);
//                     saveToFirestore(userName, userThoughts, url); // Save URL to Firestore
//                 });
//             }).catch((error) => {
//                 console.error('Error uploading file:', error);
//             });
//         } else {
//             // If no file is selected, save only the text to Firestore
//             saveToFirestore(userName, userThoughts, null);
//         }
//     } else {
//         alert('Please enter your name and provide either thoughts or a file.');
//     }
// }

// // Save the text content to Firestore
// function saveToFirestore(userName, userThoughts, fileUrl) {
//     const contentRef = db.collection('content');

//     contentRef.add({
//         creatorName: userName,
//         thoughts: userThoughts,
//         fileUrl: fileUrl || null,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })
//     .then(() => {
//         console.log('Content saved to Firestore');
//         alert('Your content has been uploaded!');
//     })
//     .catch((error) => {
//         console.error('Error saving content to Firestore:', error);
//     });
// }
// Your Firebase Config (replace these with your actual Firebase project credentials)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth(); // Add authentication module

// Login function
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful:", userCredential.user);
            // Redirect to content.html
            window.location.href = "content.html";
        })
        .catch((error) => {
            console.error("Error during login:", error);
            alert("Login failed: " + error.message);
        });
}

// Example: Trigger login from a form submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    loginUser(email, password);
});

// Example: Function to update username display
function updateUserName() {
    var userName = document.getElementById("creatorName").value;
    document.getElementById("userNameDisplay").textContent = userName || "User";
}

// Auto-expand the textarea as the user types
function autoExpand(field) {
    if (field.scrollHeight > field.clientHeight) {
        field.style.height = field.scrollHeight + "px";
    }
}

// Function to handle the file and text upload
function uploadContent() {
    var userName = document.getElementById("creatorName").value;
    var userThoughts = document.getElementById("creatorThoughts").value;
    var contentFile = document.getElementById("contentFile").files[0];

    if (userName && (userThoughts || contentFile)) {
        const fileName = contentFile ? contentFile.name : null;
        const fileRef = fileName ? storage.ref("uploads/" + fileName) : null;

        if (fileRef) {
            fileRef.put(contentFile)
                .then(() => fileRef.getDownloadURL())
                .then((url) => {
                    saveToFirestore(userName, userThoughts, url);
                })
                .catch((error) => console.error("Error uploading file:", error));
        } else {
            saveToFirestore(userName, userThoughts, null);
        }
    } else {
        alert("Please enter your name and provide either thoughts or a file.");
    }
}

// Save the text content to Firestore
function saveToFirestore(userName, userThoughts, fileUrl) {
    db.collection("content")
        .add({
            creatorName: userName,
            thoughts: userThoughts,
            fileUrl: fileUrl || null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => alert("Your content has been uploaded!"))
        .catch((error) => console.error("Error saving content to Firestore:", error));
}

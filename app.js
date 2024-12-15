import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRyaysagQCtXHwo4UsmLwa5LQg1v38-xE",
    authDomain: "practice-db-de317.firebaseapp.com",
    projectId: "practice-db-de317",
    storageBucket: "practice-db-de317.firebaseapp.com",
    messagingSenderId: "792766249164",
    appId: "1:792766249164:web:94e39ad306a5bd9e9eaa69",
    measurementId: "G-Z9SM6VJ6CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Anonymous authentication
signInAnonymously(auth)
    .then(() => {
        console.log("Signed in anonymously");
    })
    .catch((error) => {
        console.error("Authentication error:", error);
    });

// Handle form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    console.log("Email==>", email)
    console.log("Subject==>", subject)
    console.log("Message==>", message)

    try {
        // Add message to Firestore
        const docRef = await addDoc(collection(db, "messages"), {
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Message sent successfully!");
        contactForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to send message. Please try again.");
    }
});

const database = firebase.database();

const saveMessage = (email, subject, message) => {
    firebase.database().ref("messages").push({
        email: email,
        subject: subject,
        message: message
    }).then(() => {
        console.log("Message saved successfully!");
    }).catch((error) => {
        console.error("Error writing to Firebase:", error);
    });
};
const testRef = firebase.database().ref("test");
testRef.set({ testKey: "testValue" })
    .then(() => console.log("Test write succeeded!"))
    .catch((error) => console.error("Test write failed:", error));







// Your web app's Firebase configuration
const firebaseConfig = {
    
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Define variables to reference each form element in login.html
const loginStatus = document.getElementById("loginStatus");
const emailHelp = document.getElementById("emailHelp");
const txtEmailLabel = document.getElementById("txtEmailLabel");
const txtEmail = document.getElementById("txtEmail");
const txtPasswordLabel = document.getElementById("txtPasswordLabel");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

// Define event listeners for the click event
btnLogin.addEventListener("click", e => {
    e.preventDefault();
    const enteredEmail = txtEmail.value;
    const enteredPassword = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(enteredEmail, enteredPassword);
    document.cookie = "validSession=true";
    promise.catch(e => alert("Could not log you in at this time. \n" + e.message));
});

btnSignup.addEventListener("click", e => {
    e.preventDefault();
    const enteredEmail = txtEmail.value;
    const enteredPassword = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(enteredEmail, enteredPassword);
    promise.catch(e => alert("We could not process your transaction at this time. \n" + e.message));
});

btnLogout.addEventListener("click", e => {
    e.preventDefault();
    firebase.auth().signOut();
    document.cookie = "validSession=false";
});

// Chack login status using Firebase method onAuthStateChange()
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("Logged in");
        btnLogout.style.display = "inline";
        emailHelp.style.display = "none";
        btnSignup.style.display = "none";
        btnLogin.style.display = "none";
        txtEmailLabel.style.display = "none";
        txtEmail.style.display = "none";
        txtPasswordLabel.style.display = "none";
        txtPassword.style.display = "none";
        loginStatus.innerHTML = `Hello ${firebaseUser.email}`;
    } else {
        console.log("Not logged in");
        btnLogout.style.display = "none";
        btnSignup.style.display = "inline";
        btnLogin.style.display = "inline";
        txtEmailLabel.style.display = "inline";
        txtEmail.style.display = "inline";
        txtPasswordLabel.style.display = "inline";
        txtPassword.style.display = "inline";
        loginStatus.innerHTML = "Login";
    }
});
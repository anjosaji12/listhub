// ─────────────────────────────────────────────
//  ListHub – firebase.js
//  Firebase initialization + Auth helpers
// ─────────────────────────────────────────────

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";

// ── Firebase Config ──────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyC3V1a9DbWJ36cI9bQGMh_JRHILOQhInmQ",
    authDomain: "listhub-683b2.firebaseapp.com",
    projectId: "listhub-683b2",
    storageBucket: "listhub-683b2.firebasestorage.app",
    messagingSenderId: "59285647650",
    appId: "1:59285647650:web:1adfe547ea4002ef4eb57b",
    measurementId: "G-M8HPL8Q0R3"
};

// ── Init ─────────────────────────────────────
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// ── Auth helpers ─────────────────────────────

/**
 * Sign up with email + password
 * Creates a user doc in Firestore with { name, email, phone, createdAt }
 */
async function signUpEmail(name, email, password, phone = '') {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        phone,
        createdAt: serverTimestamp()
    });
    return cred.user;
}

/**
 * Sign in with email + password
 */
async function signInEmail(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

/**
 * Sign in / sign up with Google popup
 */
async function signInGoogle() {
    const cred = await signInWithPopup(auth, googleProvider);
    // Create user doc if first time
    const userRef = doc(db, 'users', cred.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        await setDoc(userRef, {
            name: cred.user.displayName || '',
            email: cred.user.email || '',
            phone: '',
            createdAt: serverTimestamp()
        });
    }
    return cred.user;
}

/**
 * Sign out
 */
async function logOut() {
    await signOut(auth);
}

/**
 * Returns the currently logged-in user (or null)
 */
function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Listen to auth state changes
 */
function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

export {
    auth,
    db,
    analytics,
    signUpEmail,
    signInEmail,
    signInGoogle,
    logOut,
    getCurrentUser,
    onAuthChange
};

// ═══════════════════════════════════════════════════
//  AgroShare – Firebase Configuration
//  IMPORTANT: Replace the values below with your own
//  Firebase project credentials from:
//  https://console.firebase.google.com → Project Settings → General
// ═══════════════════════════════════════════════════

const firebaseConfig = {
    apiKey: "AIzaSyCjJW29FxmJe8ApBuy1S8eBsZgBszAT8Cw",
    authDomain: "agroshare-4b375.firebaseapp.com",
    projectId: "agroshare-4b375",
    storageBucket: "agroshare-4b375.firebasestorage.app",
    messagingSenderId: "535425186883",
    appId: "1:535425186883:web:51f64a2fad2e321722a8f6"
};

// ── Initialize Firebase ──
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

// ── Helper: get current user ──
function getCurrentUser() {
  return auth.currentUser;
}

// ── Helper: require login ──
function requireAuth(redirectTo = 'login.html') {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) resolve(user);
      else { window.location.href = redirectTo; reject(); }
    });
  });
}

// ── Helper: get user profile from Firestore ──
async function getUserProfile(uid) {
  const snap = await db.collection('users').doc(uid).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}

// ── Helper: show toast (global) ──
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = (type === 'success' ? '✅ ' : '❌ ') + msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

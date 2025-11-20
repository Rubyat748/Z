// firebase config placeholder
// ==========================================
// ZTA – Firebase Setup (FINAL)
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyB7P7DL0zypsux8x0fIf4v0UMNVR30GB_k",
    authDomain: "zta-only.firebaseapp.com",
    projectId: "zta-only",
    storageBucket: "zta-only.firebasestorage.app",
    messagingSenderId: "26521974056",
    appId: "1:26521974056:web:e3bfe3e1bb02fd60ad0c1d",
    measurementId: "G-HR9W0GJ4MT"
};

// Init Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


// ==========================================================
// LOGIN SYSTEM
// ==========================================================

async function ztaLogin(email, password) {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem("zta_user", user.user.uid);
        return { success: true, user: user.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function ztaCheckLogin() {
    return localStorage.getItem("zta_user") !== null;
}

function ztaLogout() {
    auth.signOut();
    localStorage.removeItem("zta_user");
    window.location.href = "login.html";
}



// ==========================================================
// ADMIN PASSWORD LOGIN (FOR admin-login.html)
// ==========================================================

const adminMasterPass = "89OQBSADETWNA";

function checkAdminPassword(input) {
    if (input === adminMasterPass) {
        localStorage.setItem("zta_admin", "true");
        return true;
    }
    return false;
}

function requireAdmin() {
    if (!localStorage.getItem("zta_admin")) {
        window.location.href = "admin-login.html";
    }
}



// ==========================================================
// BLOG SYSTEM (Firestore)
// ==========================================================

// ADD POST
async function addBlog(title, text, imageURL) {
    return await db.collection("blog").add({
        title: title,
        text: text,
        image: imageURL,
        date: new Date()
    });
}

// GET ALL POSTS
async function getAllBlogs() {
    const snap = await db.collection("blog")
        .orderBy("date", "desc")
        .get();
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// GET ONE POST
async function getBlogById(id) {
    const docSnap = await db.collection("blog").doc(id).get();
    if (!docSnap.exists) return null;
    return { id: id, ...docSnap.data() };
}



// ==========================================================
// IMAGE UPLOAD (Storage)
// ==========================================================

async function uploadImage(file, folder = "uploads") {
    const ref = storage.ref(`${folder}/${Date.now()}_${file.name}`);
    await ref.put(file);
    return await ref.getDownloadURL();
}



// ==========================================================
// SHOP SYSTEM
// ==========================================================

// GET PRODUCTS
async function getProducts() {
    const snap = await db.collection("products").get();
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ADD TO CART
function addToCart(productID) {
    let cart = JSON.parse(localStorage.getItem("zta_cart") || "[]");
    cart.push(productID);
    localStorage.setItem("zta_cart", JSON.stringify(cart));
}

// GET CART
function getCart() {
    return JSON.parse(localStorage.getItem("zta_cart") || "[]");
}

// CLEAR CART
function clearCart() {
    localStorage.removeItem("zta_cart");
}



// ==========================================================
// EXPOSE FUNCTIONS GLOBALLY
// ==========================================================

window.ZTA = {
    login: ztaLogin,
    checkLogin: ztaCheckLogin,
    logout: ztaLogout,

    checkAdminPassword,
    requireAdmin,

    addBlog,
    getAllBlogs,
    getBlogById,
    uploadImage,

    getProducts,
    addToCart,
    getCart,
    clearCart,

    db,
    auth,
    storage
};

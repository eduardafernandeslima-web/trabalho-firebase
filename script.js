import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyADzPCzAhqDgBNCoHVQPRa3k_8em8IYM",
  authDomain: "fenix-tcc.firebaseapp.com",
  projectId: "fenix-tcc",
  storageBucket: "fenix-tcc.firebasestorage.app",
  messagingSenderId: "750850685840",
  appId: "1:750850685840:web:edcdf7d4ed2155e549115"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "imoveis");

const input = document.getElementById('nome');
const botao = document.getElementById('salvar');
const lista = document.getElementById('lista');

async function carregar() {
    lista.innerHTML = '';
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
        const li = document.createElement('li');
        li.innerHTML = `${doc.data().nome} <button onclick="excluir('${doc.id}')">X</button>`;
        lista.appendChild(li);
    });
}

botao.onclick = async () => {
    if(input.value === '') return;
    await addDoc(colRef, { nome: input.value });
    input.value = '';
    carregar();
};

window.excluir = async (id) => {
    await deleteDoc(doc(db, "imoveis", id));
    carregar();
};

carregar();
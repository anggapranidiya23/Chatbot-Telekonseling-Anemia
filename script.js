const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let isFirstOpen = true; 

chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");

  if (isFirstOpen) {
    const salutationMessage = createChatLi("Halo! Selamat datang di layanan telekonseling anemia. Saya siap membantu Anda. Silakan lengkapi data Anda terlebih dahulu\nNama :\nUsia :\nJenis Kelamin  :", "incoming");
    
    salutationMessage.classList.add("animate");
    chatbox.appendChild(salutationMessage);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      salutationMessage.classList.remove("animate");
    }, 1000); // Waktu harus sama dengan durasi animasi

    isFirstOpen = false; // Setelah salam pertama, ubah status menjadi false
  }
});


let userMessage;
let currentStep = 1;
let userData = {
  nama: "",
  usia: "",
  jenisKelamin: "",
  hbLevel: ""
};

chatbotCloseBtn.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});


// Fungsi untuk membuat elemen chat
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing"
    ? `<p></p>`
    : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Fungsi untuk menampilkan respons chatbot
const generateResponse = () => {
  let responseMessage = "";
  const hb = parseFloat(userData.hbLevel);
  const usia = parseInt(userData.usia);
  const jenisKelamin = userData.jenisKelamin.toLowerCase();

  if (currentStep === 1) {
    responseMessage = "Selamat datang di layanan telekonseling anemia, saya akan membantu Anda. Sebelum kita memulai, silahkan lengkapi data terlebih dahulu\nNama  :\nUsia :\nJenis Kelamin  :";
  } else if (currentStep === 2) {
    responseMessage = "Terima kasih telah melengkapi data. Bagaimana saya dapat membantu Anda terkait kondisi anemia? Boleh disebutkan kadar HB Bapak/Ibu/Kakak.";
  } else if (currentStep === 3) {
    if (isNaN(usia) || isNaN(hb)) {
      responseMessage = "Mohon masukkan usia dan kadar HB yang valid.";
    } else if (usia >= 6 && usia <= 59) {
      // Anak 6-59 bulan
      if (hb >= 11) responseMessage = "Anda tidak anemia.";
      else if (hb >= 10) responseMessage = "Anda mengalami anemia ringan.";
      else if (hb >= 7) responseMessage = "Anda mengalami anemia sedang.";
      else responseMessage = "Anda mengalami anemia berat.";
    } else if (usia >= 60 && usia <= 131) {
      // Anak 5-11 tahun
      if (hb >= 11.5) responseMessage = "Anda tidak anemia.";
      else if (hb >= 11) responseMessage = "Anda mengalami anemia ringan.";
      else if (hb >= 8) responseMessage = "Anda mengalami anemia sedang.";
      else responseMessage = "Anda mengalami anemia berat.";
    } else if (usia >= 132 && usia <= 168) {
      // Anak 12-14 tahun
      if (hb >= 12) responseMessage = "Anda tidak anemia.";
      else if (hb >= 11) responseMessage = "Anda mengalami anemia ringan.";
      else if (hb >= 8) responseMessage = "Anda mengalami anemia sedang.";
      else responseMessage = "Anda mengalami anemia berat.";
    } else if (jenisKelamin === "perempuan" && usia >= 169) {
      // Perempuan dewasa
      if (hb >= 12) responseMessage = "Anda tidak anemia.";
      else if (hb >= 11) responseMessage = "Anda mengalami anemia ringan.";
      else if (hb >= 8) responseMessage = "Anda mengalami anemia sedang.";
      else responseMessage = "Anda mengalami anemia berat.";
    } else if (jenisKelamin === "laki-laki" && usia >= 169) {
      // Laki-laki dewasa
      if (hb >= 13) responseMessage = "Anda tidak anemia.";
      else if (hb >= 11) responseMessage = "Anda mengalami anemia ringan.";
      else if (hb >= 8) responseMessage = "Anda mengalami anemia sedang.";
      else responseMessage = "Anda mengalami anemia berat.";
    } else {
      responseMessage = "Usia atau jenis kelamin Anda tidak sesuai dengan kriteria WHO. Mohon masukkan data yang valid.";
    }

    responseMessage = `Berdasarkan kadar HB Anda, ${responseMessage}`;
  }

  if (responseMessage.includes("anemia berat")) {
    responseMessage += " Dengan kondisi anemia berat, segera konsultasikan ke dokter untuk penanganan lebih lanjut.";
  }

  if (responseMessage.includes("anemia sedang")) {
    responseMessage += " Disarankan untuk meningkatkan asupan gizi dan konsultasi ke dokter.";
  }

  if (responseMessage.includes("anemia ringan")) {
    responseMessage += " Jangan lupa Pemeriksaan Kesehatan secara berkala ya, istirahat yang cukup dan hindari stress.";
  }

  if (responseMessage.includes("tidak anemia")) {
    responseMessage += " Mari jaga kesehatan untuk mencegah anemia dengan rutin mengonsumsi Tablet Tambah Darah (TTD) seminggu sekali.";
  }
  

  chatbox.appendChild(createChatLi(responseMessage, "incoming"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Fungsi untuk mengolah input pengguna
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";

  // Tambahkan pesan pengguna ke chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Cek step dan olah input pengguna
  if (currentStep === 1) {
    // Tambahkan pengecekan khusus untuk input umum seperti "Halo", "Hi", dll
    if (userMessage.toLowerCase() === "halo" || userMessage.toLowerCase() === "hai") {
      setTimeout(() => {
      chatbox.appendChild(createChatLi("Halo! Selamat datang di layanan telekonseling anemia. Silakan lengkapi data Anda terlebih dahulu:\nNama:\nUsia:\nJenis Kelamin:", "incoming"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
      }, 1000);
      return;
    }

    const inputLines = userMessage.split("\n");
    if (inputLines.length >= 3) {
      userData.nama = inputLines[0].trim();
      userData.usia = inputLines[1].trim();
      userData.jenisKelamin = inputLines[2].trim().toLowerCase();

      if (!/^\d+$/.test(userData.usia)) {
        chatbox.appendChild(createChatLi("Usia harus berupa angka. Silakan input ulang.", "incoming"));
        return;
      }

      if (!["laki-laki", "perempuan"].includes(userData.jenisKelamin)) {
        chatbox.appendChild(createChatLi("Jenis kelamin harus 'laki-laki' atau 'perempuan'. Silakan input ulang.", "incoming"));
        return;
      }
      currentStep++;
    } else {
      chatbox.appendChild(createChatLi("Format input salah. Silakan input Nama, Usia, dan Jenis Kelamin masing-masing di baris baru.", "incoming"));
      return;
    }
  } else if (currentStep === 2) {
    if (!/^\d+(\.\d+)?$/.test(userMessage)) {
      chatbox.appendChild(createChatLi("Kadar HB harus berupa angka. Silakan input ulang.", "incoming"));
      return;
    }
    userData.hbLevel = userMessage;
    currentStep++;
  }

  // Tampilkan respons chatbot
  setTimeout(generateResponse, 600);
};

// Event listeners
sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); 
    chatInput.value += "\n"; 
  }
});


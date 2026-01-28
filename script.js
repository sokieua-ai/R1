/**
 * PROJECT: VERTICAL FARMING VOCABULARY HUB
 * AUTHOR: Senior Developer & English Teacher
 * LOGIC: 48 Vocab items -> 40 Quiz Questions (4 Types)
 */

// 1. DATA: 48 TỪ VỰNG CHUẨN
const vocabulary = [
    { en: "By the year", vi: "Trước năm" },
    { en: "Urban centre", vi: "Trung tâm đô thị" },
    { en: "Conservative estimates", vi: "Những ước tính dè dặt" },
    { en: "Demographics", vi: "Dân số học" },
    { en: "Current Demographic Trends", vi: "Xu hướng dân số học hiện tại" },
    { en: "Traditional farming method", vi: "Phương pháp canh tác truyền thống" },
    { en: "Raising crop", vi: "Trồng trọt" },
    { en: "To be in vogue", vi: "Đang thịnh hành" },
    { en: "To lay sth to waste", vi: "Phá hủy hoàn toàn cái gì" },
    { en: "Poor management practice", vi: "Cách quản lý yếu kém" },
    { en: "To live on sth", vi: "Sống dựa vào cái gì" },
    { en: "Indoor farming", vi: "Trồng trọt trong nhà" },
    { en: "The urgent need to do sth", vi: "Nhu cầu cấp bách làm gì" },
    { en: "An entirely new approach", vi: "Một cách tiếp cận hoàn toàn mới" },
    { en: "Cutting-edge technology", vi: "Công nghệ tiên tiến nhất" },
    { en: "Vertical farm", vi: "Trang trại dọc" },
    { en: "Horizontal farming", vi: "Canh tác theo chiều ngang" },
    { en: "Multi storey", vi: "Nhiều tầng" },
    { en: "Environmentally controlled conditions", vi: "Điều kiện môi trường được kiểm soát" },
    { en: "To be situated in", vi: "Ở đâu đó / Tọa lạc tại" },
    { en: "Proponent", vi: "Người ủng hộ" },
    { en: "Urban renewal", vi: "Cải cách đô thị" },
    { en: "Sustainable production", vi: "Sản xuất bền vững" },
    { en: "Year-round production", vi: "Canh tác quanh năm" },
    { en: "To be sacrificed for sth", vi: "Bị hy sinh cho cái gì" },
    { en: "Take sth for granted", vi: "Coi cái gì là hiển nhiên" },
    { en: "Despoil", vi: "Cướp bóc, chiếm đoạt" },
    { en: "To turn sth into sth", vi: "Biến cái gì thành cái gì" },
    { en: "Verdant, natural ecozone", vi: "Vùng sinh thái tự nhiên tươi tốt" },
    { en: "Semi-arid desert", vi: "Sa mạc bán khô cằn" },
    { en: "Within the same time frame", vi: "Cùng trong khoảng thời gian đó" },
    { en: "Elements", vi: "Điều kiện thời tiết (khắc nghiệt)" },
    { en: "To subject A to B", vi: "Bắt A phải chịu đựng B" },
    { en: "Food-bearing plants", vi: "Cây lương thực" },
    { en: "No more than hope for", vi: "Không thể làm gì hơn ngoài hy vọng" },
    { en: "Massive flood", vi: "Trận lũ lớn" },
    { en: "A long drought", vi: "Hạn hán kéo dài" },
    { en: "Hurricane", vi: "Cuồng phong" },
    { en: "Severe monsoons", vi: "Gió mùa khắc nghiệt" },
    { en: "Valuable crops", vi: "Vụ mùa giá trị" },
    { en: "Weather-related crop failures", vi: "Thất bát mùa màng do thời tiết" },
    { en: "To eliminate the need for", vi: "Loại bỏ nhu cầu cho cái gì" },
    { en: "Infectious disease", vi: "Bệnh truyền nhiễm" },
    { en: "Acquire", vi: "Thu nhận / Đạt được" },
    { en: "Consume energy", vi: "Tiêu thụ năng lượng" },
    { en: "To appear to", vi: "Dường như" },
    { en: "Variation", vi: "Biến thể / Dạng" },
    { en: "More need to be done", vi: "Cần làm nhiều hơn nữa" }
];

// 2. BIẾN QUẢN LÝ TRẠNG THÁI
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizQuestions = [];

// 3. KHỞI TẠO ỨNG DỤNG
document.addEventListener('DOMContentLoaded', () => {
    renderVocabTable();
    prepareQuiz();
    
    // Listeners
    document.getElementById('search-input').addEventListener('input', filterVocab);
    document.getElementById('btn-start-quiz').addEventListener('click', () => switchScreen('screen-quiz'));
    document.getElementById('btn-next').addEventListener('click', nextQuestion);
    document.getElementById('btn-home').addEventListener('click', () => location.reload());
});

// 4. MÀN HÌNH 1: BẢNG TỪ VỰNG
function renderVocabTable(data = vocabulary) {
    const list = document.getElementById('vocab-list');
    list.innerHTML = data.map(item => `
        <div class="vocab-card">
            <div class="vocab-info">
                <h3>${item.en}</h3>
                <p>${item.vi}</p>
            </div>
            <div class="vocab-actions">
                <button onclick="speak('${item.en}')" class="btn-icon">🔊</button>
                <button onclick="toggleFav(this)" class="btn-icon">⭐</button>
            </div>
        </div>
    `).join('');
}

function filterVocab(e) {
    const term = e.target.value.toLowerCase();
    const filtered = vocabulary.filter(v => v.en.toLowerCase().includes(term) || v.vi.toLowerCase().includes(term));
    renderVocabTable(filtered);
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
}

// 5. LOGIC TẠO QUIZ (40 CÂU - 4 DẠNG)
function prepareQuiz() {
    let shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
    
    for(let i = 0; i < 40; i++) {
        let q = { ...shuffled[i] };
        if (i < 10) q.type = "MCQ";        // A. Trắc nghiệm
        else if (i < 20) q.type = "DRAG";  // B. Kéo thả ô trống
        else if (i < 30) q.type = "MATCH"; // C. Nối từ
        else q.type = "INPUT";             // D. Dịch Anh-Việt
        quizQuestions.push(q);
    }
}

// 6. ĐIỀU KHIỂN QUIZ
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if(screenId === 'screen-quiz') loadQuestion();
}

function loadQuestion() {
    const container = document.getElementById('question-container');
    const q = quizQuestions[currentQuestionIndex];
    const nextBtn = document.getElementById('btn-next');
    
    nextBtn.disabled = true;
    document.getElementById('question-number').innerText = `Câu hỏi ${currentQuestionIndex + 1}/40`;
    document.getElementById('question-type').innerText = q.type;
    document.getElementById('progress-bar').style.width = `${((currentQuestionIndex + 1) / 40) * 100}%`;

    switch(q.type) {
        case "MCQ": renderMCQ(container, q); break;
        case "DRAG": renderDrag(container, q); break;
        case "MATCH": renderMatch(container, q); break;
        case "INPUT": renderInput(container, q); break;
    }
}

// --- DẠNG A: MCQ ---
function renderMCQ(container, q) {
    let options = [q.en, ...getRandomOptions(q.en, 3)].sort(() => 0.5 - Math.random());
    container.innerHTML = `
        <h2 class="q-title">Nghĩa của từ "${q.vi}" là gì?</h2>
        <div class="options-grid">
            ${options.map(opt => `<button class="option-btn" onclick="checkMCQ(this, '${opt}', '${q.en}')">${opt}</button>`).join('')}
        </div>
    `;
}

function checkMCQ(btn, selected, correct) {
    const isCorrect = selected === correct;
    if(isCorrect) { btn.classList.add('correct'); score++; }
    else btn.classList.add('wrong');
    finishQuestion(isCorrect, selected, correct);
}

// --- DẠNG B: DRAG (Điền vào chỗ trống) ---
function renderDrag(container, q) {
    container.innerHTML = `
        <h2 class="q-title">Kéo từ đúng vào ô trống:</h2>
        <p class="drag-sentence">"The project aims to build a <span id="drop-zone" class="drop-zone">...</span> in the city."</p>
        <p class="hint-vi">(${q.vi})</p>
        <div class="word-bank">
            ${[q.en, ...getRandomOptions(q.en, 2)].sort(() => 0.5 - Math.random()).map(w => 
                `<span class="draggable" draggable="true" ondragstart="drag(event)">${w}</span>`
            ).join('')}
        </div>
    `;
    
    const zone = document.getElementById('drop-zone');
    zone.ondragover = (e) => e.preventDefault();
    zone.ondrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        zone.innerText = data;
        const isCorrect = data === q.en;
        if(isCorrect) score++;
        finishQuestion(isCorrect, data, q.en);
    };
}

function drag(ev) { ev.dataTransfer.setData("text", ev.target.innerText); }

// --- DẠNG C: MATCH (Nối từ) ---
function renderMatch(container, q) {
    container.innerHTML = `
        <h2 class="q-title">Nối từ tiếng Anh với nghĩa đúng:</h2>
        <div class="match-container">
            <div class="match-box active-match" id="match-en">${q.en}</div>
            <div class="match-options">
                ${[q.vi, ...getRandomOptionsVi(q.vi, 2)].sort(() => 0.5 - Math.random()).map(v => 
                    `<div class="match-item" onclick="checkMatch(this, '${v}', '${q.vi}')">${v}</div>`
                ).join('')}
            </div>
        </div>
    `;
}

function checkMatch(el, selected, correct) {
    const isCorrect = selected === correct;
    if(isCorrect) { el.classList.add('correct'); score++; }
    else el.classList.add('wrong');
    finishQuestion(isCorrect, selected, correct);
}

// --- DẠNG D: INPUT ---
function renderInput(container, q) {
    container.innerHTML = `
        <h2 class="q-title">Dịch cụm từ sau sang tiếng Anh:</h2>
        <p class="vi-term">"${q.vi}"</p>
        <div class="input-wrapper">
            <input type="text" id="ans-input" autocomplete="off" placeholder="Gõ tại đây...">
            <p class="hint-text">Gợi ý: ${q.en.charAt(0)}...</p>
            <button class="btn-primary" onclick="checkInput('${q.en}')">GỬI</button>
        </div>
    `;
}

function checkInput(correct) {
    const val = document.getElementById('ans-input').value.trim();
    const isCorrect = val.toLowerCase() === correct.toLowerCase();
    if(isCorrect) score++;
    finishQuestion(isCorrect, val, correct);
}

// 7. TIỆN ÍCH HỖ TRỢ
function finishQuestion(isCorrect, userAns, correctAns) {
    userAnswers.push({ q: quizQuestions[currentQuestionIndex].vi, a: userAns, c: correctAns, ok: isCorrect });
    document.getElementById('btn-next').disabled = false;
    // Vô hiệu hóa tương tác sau khi chọn
    document.getElementById('question-container').style.pointerEvents = 'none';
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('question-container').style.pointerEvents = 'auto';
    if(currentQuestionIndex < 40) loadQuestion();
    else showFinalResult();
}

function getRandomOptions(exclude, num) {
    return vocabulary.filter(v => v.en !== exclude).sort(() => 0.5 - Math.random()).slice(0, num).map(v => v.en);
}

function getRandomOptionsVi(exclude, num) {
    return vocabulary.filter(v => v.vi !== exclude).sort(() => 0.5 - Math.random()).slice(0, num).map(v => v.vi);
}

// 8. TỔNG KẾT
function showFinalResult() {
    switchScreen('screen-result');
    document.getElementById('final-score').innerText = score;
    
    let rank = "";
    if (score >= 36) rank = "Master 🌟";
    else if (score >= 28) rank = "Advanced 💪";
    else if (score >= 20) rank = "Improving 📘";
    else rank = "Beginner 🌱";
    
    document.getElementById('rank-title').innerText = `Xếp loại: ${rank}`;
    document.getElementById('score-detail').innerText = `Bạn đã đúng ${score}/40 câu hỏi.`;

    const review = document.getElementById('review-list');
    review.innerHTML = userAnswers.map((ans, idx) => `
        <div class="review-item ${ans.ok ? 'review-ok' : 'review-fail'}">
            <strong>Câu ${idx + 1}: ${ans.q}</strong><br>
            <span>- Đáp án của bạn: <i style="color: ${ans.ok ? 'green' : 'red'}">${ans.a || '(Trống)'}</i></span><br>
            ${!ans.ok ? `<span>- Đáp án đúng: <b style="color: green">${ans.c}</b></span>` : ''}
        </div>
    `).join('');
}

# (https://byvn.net/oxh1)

window.open = function(url) {
    console.log("👉 Đang mở bài thi:", url);
    setTimeout(() => {
        const win = window.open(
            url,
            "_blank",
            "width=1200,height=800,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes"
        );

        const injectFeatures = () => {
            try {
                const d = win.document;

                // 🧩 Gỡ hạn chế popup
                const events = [
                    'oncontextmenu', 'onkeydown', 'onkeypress',
                    'onkeyup', 'onmousedown', 'onmouseup', 'oncopy', 'oncut'
                ];
                events.forEach(evt => {
                    d[evt] = null;
                    d.body[evt] = null;
                    Object.defineProperty(d, evt, { get: () => null, set: () => {}, configurable: true });
                    Object.defineProperty(d.body, evt, { get: () => null, set: () => {}, configurable: true });
                });

                // Clone body để xóa mọi addEventListener (ẩn)
                const newBody = d.body.cloneNode(true);
                d.body.parentNode.replaceChild(newBody, d.body);

                console.log("🟢 Đã gỡ toàn bộ hạn chế trong popup!");

                // 🧠 Tạo box hiển thị kết quả GPT
                const resultBox = d.createElement('div');
                resultBox.style.position = 'fixed';
                resultBox.style.bottom = '10px';
                resultBox.style.right = '10px';
                resultBox.style.maxWidth = '400px';
                resultBox.style.maxHeight = '300px';
                resultBox.style.overflowY = 'auto';
                resultBox.style.background = '#fff';
                resultBox.style.border = '1px solid #ccc';
                resultBox.style.padding = '10px';
                resultBox.style.zIndex = 9999;
                resultBox.style.fontSize = '14px';
                resultBox.style.whiteSpace = 'pre-wrap';
                resultBox.innerText = '🧠 GPT sẵn sàng tra cứu...';
                d.body.appendChild(resultBox);

                // ⌨️ Lắng nghe Enter khi có chọn văn bản
                d.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const selected = d.getSelection().toString().trim();
                        if (selected.length === 0) return;

                        resultBox.innerText = "🔍 Đang tra cứu: " + selected;

                        // Gọi GPT API
                        fetch("https://api.openai.com/v1/chat/completions", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer sk-proj-...YOUR_KEY..."  // <-- Đổi thành key của bạn
                            },
                            body: JSON.stringify({
                                model: "gpt-3.5-turbo",
                                messages: [
                                    { role: "user", content: `Giải câu trắc nghiệm sau và giải thích rõ ràng bằng tiếng Việt:\n${selected}` }
                                ],
                                temperature: 0.5
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            const content = data.choices?.[0]?.message?.content || "❌ Không nhận được phản hồi.";
                            resultBox.innerText = content;
                        })
                        .catch(err => {
                            resultBox.innerText = "❌ Lỗi khi kết nối GPT: " + err;
                        });
                    }
                });

            } catch (e) {
                console.warn("⏳ Đợi popup load xong...");
                setTimeout(injectFeatures, 500);
            }
        };

        // ⏳ Đợi popup load xong rồi inject
        const waitLoad = setInterval(() => {
            try {
                if (win.document && win.document.readyState === "complete") {
                    clearInterval(waitLoad);
                    injectFeatures();
                }
            } catch (e) {}
        }, 500);
    }, 500);
};








# (https://byvn.net/oxh1)

// Đặt đoạn này vào <script> trên trang chính exam.tdmu.edu.vn
window.open = function(url) {
    console.log("👉 URL bài thi:", url);
    setTimeout(() => {
        const win = window.open(
            url,
            "_blank",
            "width=1200,height=800,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes"
        );

        // Gỡ hạn chế trong popup
        const unrestrict = () => {
            try {
                const d = win.document;

                // Xóa tất cả sự kiện gây hạn chế
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

                // Clone body để xóa các listener addEventListener
                const newBody = d.body.cloneNode(true);
                d.body.parentNode.replaceChild(newBody, d.body);

                console.log("🟢 Đã gỡ toàn bộ hạn chế trong popup!");
            } catch (e) {
                console.warn("⏳ Chờ trang bài thi load xong để gỡ hạn chế...");
                setTimeout(unrestrict, 500);
            }
        };

        // Đợi popup load xong trước khi gỡ
        const waitLoad = setInterval(() => {
            try {
                if (win.document && win.document.readyState === "complete") {
                    clearInterval(waitLoad);
                    unrestrict();
                }
            } catch (e) {
                // Nếu chưa truy cập được, tiếp tục chờ
            }
        }, 500);
    }, 500);
};








(function enableEverything() {
    const events = [
        'contextmenu', 'keydown', 'keyup', 'keypress',
        'mousedown', 'mouseup', 'copy', 'cut', 'paste'
    ];
    const targets = [document, document.body, window];
    events.forEach(event => {
        targets.forEach(target => {
            try {
                target['on' + event] = null;
                Object.defineProperty(target, 'on' + event, {
                    get: () => null,
                    set: () => {},
                    configurable: true
                });
            } catch (e) {}
        });
        window.addEventListener(event, e => e.stopPropagation(), true);
    });

    console.log("🟢 Đã bật lại F12, F5, chuột phải, Ctrl+C,... thành công!");
})();


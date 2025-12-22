(function() {
    // 1. Pastikan ID ini sesuai dengan yang ada di HTML Anda
    var container_img = document.getElementById("container_img");
    var inner = document.getElementById("inner");

    // Validasi agar tidak error jika elemen tidak ditemukan
    if (!container_img || !inner) return;

    var mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function(event) {
            var e = event || window.event;
            // Menghitung posisi mouse relatif terhadap pusat elemen
            this.x = e.clientX - this._x;
            this.y = (e.clientY - this._y) * -1;
        },
        setOrigin: function(e) {
            // Mengambil posisi elemen di layar
            var rect = e.getBoundingClientRect();
            this._x = rect.left + Math.floor(e.offsetWidth / 2);
            this._y = rect.top + Math.floor(e.offsetHeight / 2);
        }
    };

    var counter = 0;
    var refreshRate = 5; // Dipercepat agar lebih smooth
    var isTimeToUpdate = function() {
        return counter++ % refreshRate === 0;
    };

    var onMouseEnterHandler = function(event) {
        mouse.setOrigin(container_img); // Update origin saat mouse masuk
        update(event);
    };

    var onMouseLeaveHandler = function() {
        // Reset posisi ke semula saat mouse keluar
        inner.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    var onMouseMoveHandler = function(event) {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    var update = function(event) {
        mouse.updatePosition(event);
        
        // Intensitas rotasi (angka 20 bisa diubah, semakin besar semakin miring)
        var factor = 7; 
        var xRotation = (mouse.y / (inner.offsetHeight / 2) * factor).toFixed(2);
        var yRotation = (mouse.x / (inner.offsetWidth / 2) * factor).toFixed(2);
        
        updateTransformStyle(xRotation, yRotation);
    };

    var updateTransformStyle = function(x, y) {
        // Gunakan rotateY untuk pergerakan horizontal (mouse.x) 
        // dan rotateX untuk pergerakan vertikal (mouse.y)
        var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        inner.style.transform = style;
        inner.style.webkitTransform = style;
        inner.style.mozTransform = style;
        inner.style.msTransform = style;
        inner.style.oTransform = style;
    };

    // Perbaikan: gunakan nama variabel yang benar (container_img)
    inner.onmousemove = onMouseMoveHandler;
    inner.onmouseleave = onMouseLeaveHandler;
    inner.onmouseenter = onMouseEnterHandler;

})();
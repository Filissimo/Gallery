document.addEventListener("DOMContentLoaded", () => {
    let images = [
        {
            "title": "Синяя машинка",
            "src": "./pics/pic2.jpg",
            "width": 1200,
            "height": 675
        },
        {
            "title": "Красная маинка",
            "src": "./pics/pic1.jpg",
            "width": 1200,
            "height": 678
        },
        {
            "title": "Красная Тесла",
            "src": "./pics/pic3.jpg",
            "width": 1100,
            "height": 824
        },
        {
            "title": "Серебристая машинка",
            "src": "./pics/pic4.jpg",
            "width": 2400,
            "height": 1350
        },
        {
            "title": "Хонда",
            "src": "./pics/pic5.jpg",
            "width": 1860,
            "height": 760
        },
        {
            "title": "Белая Тесла",
            "src": "./pics/pic6.jpg",
            "width": 2400,
            "height": 1800
        },
        {
            "title": "Синяя с трезубом",
            "src": "./pics/pic7.jpg",
            "width": 2560,
            "height": 1440
        },
        {
            "title": "Интрересная белая",
            "src": "./pics/pic8.jpg",
            "width": 1920,
            "height": 1280
        },
        {
            "title": "Гончяя машинка",
            "src": "./pics/pic9.jpg",
            "width": 1920,
            "height": 1080
        },
        {
            "title": "Бэ-Мэ-Вэ",
            "src": "./pics/pic10.jpg",
            "width": 3259,
            "height": 1833
        },
        {
            "title": "Митсубиши",
            "src": "./pics/pic11.jpg",
            "width": 960,
            "height": 1280
        },
        {
            "title": "Внедорожник",
            "src": "./pics/pic12.jpg",
            "width": 1752,
            "height": 1168
        }
    ]

    let gallery = document.querySelector(".gallery")
    for (image of images) {
        if (image.width / image.height > 1.55) {
            var preview_class = "preview_wide"
        } else {
            var preview_class = "preview_narrow"
        }
        gallery.innerHTML += `
            <div class="img-container">
                <img src="${image.src}" alt="${image.src}" class=${preview_class}></img>
            </div>
        `

    }

    let slider_box = document.querySelector(".slider_box")
    let slider = document.querySelector(".slider")
    let slides = slider.querySelectorAll(".slide")
    let slide_center = document.querySelector(".slide_center")
    let slide_left = document.querySelector(".slide_left")
    let slide_right = document.querySelector(".slide_right")
    let img_containers = document.querySelectorAll(".img-container")
    let anti_click = document.querySelector(".anti_click")

    function reset_slide(slide) {
        // slide.innerHTML = `<img src="" class="">`
        slide.classList.remove("slide_to_shrink")
        slide.classList.remove("slide_to_grow")
        slide.classList.remove("wide")
        slide.classList.remove("high")
        slide.classList.remove("grow")
        slide.classList.remove("shrink")
        // slide.querySelector('img').setAttribute('style', 'height: 20vh')
        // slide.querySelector('img').setAttribute('style', 'width: 20vw')
        var img_start = slide.innerHTML.indexOf("<img")
        var img_end = slide.innerHTML.indexOf('<p>')
        slide.innerHTML = slide.innerHTML.slice(img_start, img_end)
    }

    function reset_slider() {

        for (i = 0; i < 5; i++) {
            reset_slide(slides[i])
        }
    }

    function render_slide(image, slide) {
        if (image.width / image.height > 1.5) {
            slide.classList.add("wide")
        } else {
            slide.classList.add("high")
        }
        var img = slide.querySelector("img")
        img.setAttribute("src", image.src)
        slide.innerHTML = `<h3>${image.title}</h3>`
            + slide.innerHTML
            + `<p>Ширина: ${image.width}. Высота: ${image.height}</p>`

    }

    function render_slider(a) {
        for (i = 0; i < 5; i++) {
            img_num = a + i - 2
            switch (img_num) {
                case -1:
                    img_num = images.length - 1
                    break
                case -2:
                    img_num = images.length - 2
                    break
                case images.length:
                    img_num = 0
                    break
                case images.length + 1:
                    img_num = 1
                    break
            }
            render_slide(images[img_num], slides[i])
        }
    }

    for (img_container of img_containers) {
        let img_src = img_container.querySelector('img').getAttribute('src')
        img_container.onclick = () => {
            for (a = 0; a < images.length; a++) {
                if (images[a].src === img_src) {

                    slider.setAttribute("style", "left: -60vw")

                    let slides = slider.querySelectorAll(".slide")
                    for (i = 0; i < 5; i++) {
                        if (slides[i].classList.contains("slide_center")) {
                            slides[i].classList.add("slide_to_shrink")
                        } else {
                            slides[i].classList.add("slide_to_grow")
                        }
                    }
                    render_slider(a)

                    slider_box.classList.remove('invisible')
                }
            }
        }
    }

    function f_slide_left() {
        myInterval = setInterval(f2_slide_left, 1)
        function f2_slide_left() {
            current_pos = slider.getAttribute("style", "left")
            current_pos_start = current_pos.indexOf(":")
            current_pos_end = current_pos.indexOf("v")
            current_pos_number = +current_pos.slice(current_pos_start + 1, current_pos_end)
            increment_num = ((current_pos_number * 11 + 580) * -0.001)
            slider.setAttribute("style", `left: ${current_pos_number + increment_num}vw`)
            if (current_pos_number >= -60) {
                clearInterval(myInterval)
            }
        }
    }

    function f_slide_right() {
        myInterval = setInterval(f2_slide_right, 1)
        function f2_slide_right() {
            current_pos = slider.getAttribute("style", "right")
            current_pos_start = current_pos.indexOf(":")
            current_pos_end = current_pos.indexOf("v")
            current_pos_number = +current_pos.slice(current_pos_start + 1, current_pos_end)
            increment_num = ((current_pos_number * 11 + 280) * -0.001)
            slider.setAttribute("style", `right: ${current_pos_number + increment_num}vw`)
            if (current_pos_number >= -60) {
                clearInterval(myInterval)
            }
        }
    }

    function grow_slide(slide) {
        slide.classList.add("grow")
        anti_click.classList.remove("invisible")
        setTimeout(remove_grow, 2000)
        function remove_grow() {
            slide.classList.remove("grow")
            anti_click.classList.add("invisible")
            slide.classList.remove("slide_to_grow")
            slide.classList.add("slide_to_shrink")
        }
    }

    function shrink_slide(slide) {
        slide.classList.add("shrink")
        anti_click.classList.remove("invisible")
        setTimeout(remove_shrink, 2000)
        function remove_shrink() {
            slide.classList.remove("shrink")
            anti_click.classList.add("invisible")
            slide.classList.remove("slide_to_shrink")
            slide.classList.add("slide_to_grow")
        }
    }

    slide_left.onclick = () => {
        let left_img_src = slide_left.querySelector('img').getAttribute('src')
        console.log('slide_left clicked: ' + left_img_src)
        for (a = 0; a < images.length; a++) {
            if (images[a].src === left_img_src) {
                reset_slider()
                slider.setAttribute("style", `left: -92vw`)
                for (i = 0; i < 5; i++) {
                    if (slides[i].classList.contains("slide_right")) {
                        slides[i].classList.add("slide_to_shrink")
                    } else {
                        slides[i].classList.add("slide_to_grow")
                    }
                }
                render_slider(a)
                f_slide_left()
                grow_slide(slide_center)
                shrink_slide(slide_right)
            }
        }
    }

    slide_right.onclick = () => {
        let right_img_src = slide_right.querySelector('img').getAttribute('src')
        console.log('slide_right clicked: ' + right_img_src)
        for (a = 0; a < images.length; a++) {
            if (images[a].src === right_img_src) {
                slider.setAttribute("style", `right: -92vw`)
                reset_slider()
                for (i = 0; i < 5; i++) {
                    if (slides[i].classList.contains("slide_left")) {
                        slides[i].classList.add("slide_to_shrink")
                    } else {
                        slides[i].classList.add("slide_to_grow")
                    }
                }
                render_slider(a)
                f_slide_right()
                grow_slide(slide_center)
                shrink_slide(slide_left)
            }
        }
    }

    slide_center.onclick = () => {
        console.log("slide_center clicked")
        reset_slider()
        slider_box.classList.add('invisible')
    }
})
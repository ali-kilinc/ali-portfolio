$(document).ready(function () {

    let navSize = parseInt($("#mainNav").css("height"), 10);

    let projectOutbreak = {
        title: "The Outbreak",
        explanation: "2D Android Mobile Game developed in Unity and .NET is used at backend. The goal of game is to escape viruses and collect vaccine drops to save the countries, moving the proffesor.",
        linkText: "Go To Google Play",
        link: "https://play.google.com/store/apps/details?id=com.tuktuk.outbreak",
        carouselItems: [

            '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/TD9HORgvo_w"></iframe></div>',
            '<img src="https://lh3.googleusercontent.com/VoJNXO9rQ0dRy1GSMhmoKNyKSWjtmVqkqpiLE_oYNFXBHGHxnpGD0je8tdZsdXdznJw=w1064-h969-rw" alt="">',
            '<img src="https://lh3.googleusercontent.com/H4H2v_g1OU85TCB_hrKWOvtkpzOGVk0vT-O2KZrsuYpXUA8xHZ6BQalSDUn9Cotgcjk=w1920-h969-rw" alt="">'
        ]
    };

    let projectYelpCamp =
    {
        title: "Yelp Camp",
        explanation: 'A full-stack Node.js web application project from the Udemy course - <a class="a-dark" target="_blank" href="https://www.udemy.com/the-web-developer-bootcamp/" rel="nofollow">The Web Developer Bootcamp by Colt Steele</a>',
        linkText: "View Site",
        link: "#",
        carouselItems: [
            '<img src="./assets/imgs/yelpCamp1.png">',
            '<img src="./assets/imgs/yelpCamp2.png">',
            '<img src="./assets/imgs/yelpCamp3.png">'
        ]
    };

    let projectPortfolio =
    {
        title: "MK Portfolio",
        explanation: 'Meryem Kılınç\'s portfolio, a static, single page web site built using HTML, CSS, JS, jQuery and Bootstrap.',
        linkText: "View Site",
        link: "http://meryem.kilinc.me",
        carouselItems: [
            '<img src="./assets/imgs/mk_portfolio_1.jpg">',
            '<img src="./assets/imgs/mk_portfolio_2.jpg">',
            '<img src="./assets/imgs/mk_portfolio_3.jpg">'
        ]
    };

    $(window).scroll(function () {
        $("nav").toggleClass("scrolled", $(this).scrollTop() > 50);
        $(".navbar-brand").toggleClass("scrolled", $(this).scrollTop() > 50);
    });

    $(document).on('click', 'a.slide-to-link', function (event) {
        event.preventDefault();

        if($("button.navbar-toggler").css("display") !== "none" && !$("button.navbar-toggler").hasClass("collapsed"))
        {
            $("button.navbar-toggler").trigger("click");
        }

        var offsetTop = parseInt($($.attr(this, 'href')).css("margin-top"), 10);
        offsetTop += navSize;

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
        }, 750);
    });

    $(".project-container").on("mouseenter", function (event) {
        $($(this).find(".project-shortexp")).slideDown();
    });

    $(".project-container").on("mouseleave", function (event) {
        $($(this).find(".project-shortexp")).slideUp();
    });

    $("#learnMoreOutbreak").on("click", function () {
        $("#overlay").load("../../projectDetails.html", function () {
            populateProjectDetails(projectOutbreak);
        });

        $("#overlay").slideDown();
    });

    $("#learnMoreYelpCamp").on("click", function () {
        $("#overlay").load("../../projectDetails.html", function () {
            populateProjectDetails(projectYelpCamp);
        });

        $("#overlay").slideDown();
    });

    $("#learnMorePortfolio").on("click", function () {
        $("#overlay").load("../../projectDetails.html", function () {
            populateProjectDetails(projectPortfolio);
        });

        $("#overlay").slideDown();
    });

    $("#overlay").on("click", function () {

        if (!$(event.target).closest('#popup').length) {
            $("#overlay").slideUp();
        }
    });

    $("#overlay").on("click", "#popupClose", function () {
        $("#overlay").slideUp();
    });

    function populateProjectDetails(project) {
        /* add carousel items */
        for (var i = 0; i < project.carouselItems.length; i++) {
            var carouselItem = "";
            if (i == 0) {
                carouselItem = '<div class="carousel-item active">';
            }
            else {
                carouselItem = '<div class="carousel-item">';
            }

            carouselItem += project.carouselItems[i] + '</div>';
            $("#carouselInner").append(carouselItem);
        }

        var info = '<h3>' + project.title + '</h3>' + '<p>' + project.explanation + '</p>';

        if (project.link != null) {
            info += '<a href="' + project.link + '" target="_blank" class="btn-portfolio">' + project.linkText + '</a>';
        }
        $("#projectDetailInfo").append(info);
    }

    $("#contact-form").submit(function (e) {

        e.preventDefault();

        $("#contact-success-message").slideUp();
        $("#contact-error-message").slideUp();

        var Namere = /[A-Za-z]{1}[A-Za-z]/;
        if (!Namere.test($("#name-input").val())) {

            $("#contact-error-message").html("Name can not less than 2 char <i class='fas fa-frown'></i>");
            $("#contact-error-message").slideDown();
            return;
        }

        var reeamil = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reeamil.test($("#email-input").val())) {
            $("#contact-error-message").html("Please enter a valid email address <i class='fas fa-frown'></i>");
            $("#contact-error-message").slideDown();
            return;
        }

        if (!Namere.test($("#subject-input").val())) {

            $("#contact-error-message").html("Please say something <i class='fas fa-frown'></i>");
            $("#contact-error-message").slideDown();
            return;
        }

        var name = $("#name-input").val();
        var email = $("#email-input").val();
        var subject = $("#subject-input").val();
        var data = {
            name: name,
            email: email,
            subject: subject,
            sender: 'alikilinc1986@gmail.com'
        };

        $.ajax({
            type: "POST",
            url: "https://5m7uvz6e83.execute-api.us-east-2.amazonaws.com/contact/contact",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),

            success: function () {
                $("#contact-success-message").slideDown();
                document.getElementById("contact-form").reset();
            },
            error: function (err) {
                console.log(err);
                $("#contact-error-message").html("Ooops... Something went wrong. Please try again later <i class='fas fa-frown'></i>");
                $("#contact-error-message").slideDown();
            }
        });
    });
});
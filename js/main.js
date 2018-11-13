window.onload = function () {
    init();
};

// import VueAwesomeSwiper from 'node_modules/vue-awesome-swiper/dist/vue-awesome-swiper';

function init() {
    var container = document.getElementById('intro'),
        textContainer = document.getElementById('text_container'),
        text = 'Pawel Czarniecki';
    var seq = palette('cb-Greys', 9);
    var chars = text + '#!£$&1234567890<>/';

    for (var c = 0; c < text.length; ++c) {
        var elem = document.createElement('div');
        // elem.style.width = (.35 * window.outerWidth) / text.length + 'px';
        elem.classList.add('letter_container');
        // for (var s = 0; s < seq.length; ++s) {
        //     var letterElem = document.createElement('p');
        //     letterElem.style.color = '#' + seq[s];
        //     elem.appendChild(letterElem);
        // }
        var letterElem = document.createElement('p');
        elem.appendChild(letterElem);
        letterElem.innerHTML = 'x';
        textContainer.appendChild(elem);
    }

    var counter = 0,
        completed = false,
        computed = 0;
    var letterInterval = setInterval(function () {
        for (var x = 0; x < text.length; ++x) {
            var random = Math.floor(Math.random() * chars.length),
                target = document.querySelectorAll('.letter_container')[x];
            for (var c = 0; c < target.childNodes.length; ++c) {
                if (target.childNodes[c].innerHTML === text[x]) {
                    target.childNodes[c].classList.add('matched');
                    // target.childNodes[c].style.color = seq[c];
                } else {
                    target.childNodes[c].innerHTML = chars.substring(random, random + 1);
                    // target.childNodes[c].style.background = '#' +  seq[Math.floor(Math.random() * Math.floor(seq.length))];
                    counter++;
                }
            }
            if(document.querySelectorAll('.matched').length >= text.length * seq.length){
                clearInterval(letterInterval);
                completed = true;
            }
            document.querySelectorAll('.text_loader')[0].style.width = (document.querySelectorAll('.matched').length / (text.length) * 100) + '%';
        }
    }, 50);

    // var letters = document.querySelectorAll('.letter_container');
    // document.querySelectorAll('#intro')[0].addEventListener('mousemove', function (e) {
    //     for (var x = 0; x < text.length; ++x) {
    //         var children = letters[x].querySelectorAll('p');
    //         for (var y = 0; y < children.length; ++y) {
    //             children[y].style.transform = 'translate(' + (((e.clientX / ( window.outerWidth / 2) - 1) * 2.5) * (-children.length + y) * -1) + 'px,' + (((e.clientY / (window.outerHeight / 2) - 1) * 2.5) * (-children.length + y) * -1) + 'px)';
    //         }
    //     }
    // });

    Vue.component('project-component', {
        data: function() {
            return {
                isOpen: false
            }
        },
        props: ['project'],
        template: "#project-template",
        methods: {
            toggleButton: function(){
              this.isOpen = !this.isOpen
            },
            spawnContent: function(box){
                var boxSwiper = new Swiper('.swiper-container', {
                    speed: 400,
                    spaceBetween: 100
                });
            },
            resizeProject: function(target){
                this.toggleButton();
                var targetIndex = Array.prototype.indexOf.call(target.parentNode.parentNode.children, target.parentNode),
                    boxes = document.querySelectorAll('.project-container'),
                    rowIndex = Math.floor(targetIndex / 3);
                if(target.parentNode.classList.contains('active')) {
                    var size = positions[targetIndex];
                    for (var x = 0; x < boxes.length; ++x) {
                        if (x !== targetIndex) {
                            boxes[x].style.transform = 'translateX(0)';
                        }
                    }
                    setTimeout(function () {
                        target.parentNode.classList.remove('active');
                    }, 300);
                } else {
                    this.spawnContent(target);
                    var leftovers = document.querySelectorAll('.project-container.active'),
                        index = Array.prototype.indexOf.call(target.parentNode.parentNode.children, leftovers[0]);
                    if(leftovers.length > 0){
                        leftovers[0].style.width = positions[index].width + 'px';
                        leftovers[0].style.height = positions[index].height + 'px';
                        leftovers[0].style.left = positions[index].left + 'px';
                        leftovers[0].style.top = positions[index].top + 'px';
                        for (var x = 0; x < boxes.length; ++x) {
                            boxes[x].style.transform = 'translateX(0)';
                        }
                    }
                    target.parentNode.classList.add('active');
                    var size = big;
                    if(rowIndex > 0 && leftovers.length === 0){
                        for (var x = 0; x<boxes.length; ++x){
                            if(x !== targetIndex){
                                boxes[x].style.transform = 'translate(0%, -100%)';
                            }
                        }
                    } else if(leftovers.length === 0){
                        for (var x = 0; x < boxes.length; ++x) {
                            if (x !== targetIndex) {
                                boxes[x].style.transform = 'translate(0%, 100%)';
                            }
                        }
                    }
                }

                console.log(size);
                target.parentNode.style.width = size.width + 'px';
                target.parentNode.style.height = size.height + 'px';
                target.parentNode.style.left = size.left + 'px';
                target.parentNode.style.top = size.top + 'px';
                for (var x = 0; x<boxes.length; ++x){
                    if(x !== targetIndex) {
                        boxes[x].classList.remove('active');
                    }
                }
            }
        }
    });


    var small, big, positions;
    var projectVue = new Vue({
        el: '#projects',
        data: {
          projects: [
              {name: 'Project 1'},
              {name: 'Project 2'},
              {name: 'Project 3'},
              {name: 'Project 4'},
              {name: 'Project 5'},
              {name: 'Project 6'}
          ]
        },
        methods: {
            getBoxValues: function(){
                big = {
                    width: document.querySelectorAll('.project-wrapper')[0].offsetWidth,
                    height: document.querySelectorAll('.project-wrapper')[0].offsetHeight,
                    left: 0,
                    top: 0
                };
                small = document.querySelectorAll('.project-container')[0].getBoundingClientRect();
                var boxes = document.querySelectorAll('.project-container');
                positions = [];
                for (var x = 0; x<boxes.length; ++x){
                    var bounding = {
                        left: boxes[x].offsetLeft,
                        top: boxes[x].offsetTop,
                        width: boxes[x].offsetWidth,
                        height: boxes[x].offsetHeight
                    };
                    positions.push(bounding);
                    console.log(bounding);

                }
                this.initProjects(positions);
            },
            initProjects: function(positions){
                var boxes = document.querySelectorAll('.project-container');
                for(var x = 0; x<boxes.length; ++x){
                    boxes[x].style.left = positions[x].left + 'px';
                    boxes[x].style.top = positions[x].top + 'px';
                    boxes[x].style.width = small.width + 'px';
                    boxes[x].style.height = small.height + 'px';
                    boxes[x].style.position = 'absolute';
                }
            }
        }
    });

    document.addEventListener('click', function(e){
       if(e.target.classList.contains('intro_btn_container')){
           goSection('#projects');
       }
       if(e.target.tagName === 'A' && e.target.getAttribute('href')[0] === '#'){
           e.preventDefault();
           goSection(e.target.getAttribute('href'));
       }
    });

    document.addEventListener('wheel', function(e){
        (e.deltaY > 0) ? nextSection() : '';
        (e.deltaY < 0) ? prevSection() : '';
    });

    document.addEventListener('keydown', function(e){
       (e.key === 'ArrowLeft') ? prevSection() : '';
       (e.key === 'ArrowRight') ? nextSection() : '';
    });

    var sectionParent =  document.querySelectorAll('.puzzle_container')[0], playing = false, getBoxes = true;
    function goSection(target){
        if(playing === false){
            playing = true;
            if(typeof target === 'string'){
                var targetSection = document.querySelectorAll(target)[0];
            } else {
                var targetSection = target;
            }
            if(typeof targetSection !== 'undefined'){
                sectionParent.querySelectorAll('.active')[0].classList.remove('active');
                targetSection.classList.add('active');
                var index = Array.prototype.indexOf.call(sectionParent.children, targetSection),
                    transform = (index / sectionParent.children.length) * 100;
                sectionParent.style.transform = 'translateY(-' + transform + '%)';
            }
            setTimeout(function(){
                playing = false;
                if(targetSection.id === 'projects'){
                    projectVue.getBoxValues();
                }
            }, 340);
        }
    }
    function nextSection(){
        var target = sectionParent.querySelectorAll('.active')[0].nextElementSibling;
        if(target !== null){
            goSection(sectionParent.querySelectorAll('.active')[0].nextElementSibling);
        }
    }
    function prevSection(){
        var target = sectionParent.querySelectorAll('.active')[0].previousElementSibling;
        if(target !== null){
            goSection(sectionParent.querySelectorAll('.active')[0].previousElementSibling);
        }
    }
}
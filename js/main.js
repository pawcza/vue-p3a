window.onload = function () {
    init();
};

// import VueAwesomeSwiper from 'node_modules/vue-awesome-swiper/dist/vue-awesome-swiper';

function init() {
    // document.querySelectorAll('.text_loader')[0].style.width = (document.querySelectorAll('.matched').length / (text.length) * 100) + '%';

    var letterVue = new Vue({
        el: '#intro',
       data: {
           // seq: palette('cb-Greys', 9),
           width: [5, 75, 120],
           seq: ['#404040','#f00','#00f', '#0f0'],
           text: 'Pawel Czarniecki',
           counter: 0,
           completed: false,
           computed: 0
       },
        methods: {
            play: function(){
               let chars = this.text + '#!£$&1234567890<>/',
                   that = this,
                   textContainer = that.$refs.text,
                   matched = 0;
                let letterInterval = setInterval(function (e) {
                   for (let x = 0; x < that.text.length; ++x) {
                       let random = Math.floor(Math.random() * chars.length),
                           target = textContainer.children[x + 1];
                       for (let c = 0; c < target.childNodes.length; ++c) {
                           if (target.childNodes[c].innerHTML === that.text[x]) {
                               if(!target.childNodes[c].classList.contains('matched')){
                                   matched++;
                               }
                               target.childNodes[c].classList.add('matched');
                           } else {
                               target.childNodes[c].innerHTML = chars.substring(random, random + 1);
                               // target.childNodes[c].style.background = '#' +  seq[Math.floor(Math.random() * Math.floor(seq.length))];
                           }
                           // target.style.transform = 'translate(' + (((e.clientX / window.outerWidth) - .5) * 10) * (c + 3) + 'px,' + (((e.clientY / window.outerHeight) - .5) * 10) * (c + 3) + 'px)';
                       }
                       if(that.$el.children[0].innerText.replace(/\r?\n/g, "") === that.text.replace(' ', '')){
                           clearInterval(letterInterval);
                       }
                       // document.querySelectorAll('.text_loader')[0].style.width = ((matched + 1) / that.text.length) * 100 + '%';
                   }
                }, 50);
            },
            move: function(e){
                var textContainer = this.$refs.text;
                for (var x = 0; x < this.text.length; ++x) {
                   var children = textContainer.children[x + 1].children;
                    // console.log(-(((e.clientX / window.outerWidth) - .5) * 10), -(((e.clientY / window.outerHeight) - .5) * 10));
                    for (var y = 0; y < children.length; ++y) {
                       children[y].style.transform = 'translate(' + (((e.clientX / window.outerWidth) - .5) * 10) * (y + 3) + 'px,' + (((e.clientY / window.outerHeight) - .5) * 10) * (y + 3) + 'px)';
                   }
               }
            }
        },
        mounted(){
            this.play();
        }
    });

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
                if(!this.isOpen){
                    this.isOpen = !this.isOpen
                } else {
                    let box = this;
                    setTimeout(function(){box.isOpen = !box.isOpen}, 300);
                }
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
       if(e.target.tagName === 'A' && e.target.getAttribute('href')[0] === '#'){
           e.preventDefault();
           goSection(e.target.getAttribute('href'));
       }
    });

    document.addEventListener('keydown', function(e){
       (e.key === 'ArrowLeft') ? prevSection() : '';
       (e.key === 'ArrowRight') ? nextSection() : '';
    });

    var puzzleVue = new Vue({
        el: '.puzzle_container',
        data:{
            playing: false,
            active: this.$el.$refs
        },
        methods:{
            goSection(section){
                if(this.playing === false){
                    this.playing = true;
                    if(typeof section === 'string'){
                        section = document.querySelectorAll(section)[0];
                    }
                    if(typeof section !== 'undefined'){
                        console.log(section, this.active.classList);
                        this.active.classList.remove('active');
                        section.classList.add('active');
                        let index = Array.prototype.indexOf.call(this.$el.children, section),
                            transform = (index / this.$el.children.length) * 100;
                        this.container.style.transform = 'translateY(-' + transform + '%)';
                    }
                    let that = this,
                        target = section;
                    setTimeout(function(){
                        that.playing = false;
                        if(target.id === 'projects'){
                            projectVue.getBoxValues();
                        }
                    }, 340);
                }
            },
            nextSection: function(){

                console.log(this.active);
                let target = this.active.nextElementSibling;
                if(target !== null){
                    this.goSection(target);
                }
            },
            prevSection: function(){
                let target = this.active.previousElementSibling;
                if(target !== null){
                    this.goSection(target);
                }
            },
            wheel: function(e){
                (e.deltaY > 0) ? this.nextSection() : '';
                (e.deltaY < 0) ? this.prevSection() : '';
            }
        },
        mounted(){
            this.$set(this.data, 'active', this.$el.children);
        }
    });

    var navVue = new Vue({
        el: 'nav',

    })
}
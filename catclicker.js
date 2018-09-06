$(function(){

    const cats = [{name: 'Cat1', src: 'cat.jpg', clicks:0},{name: 'Cat2', src: 'cat2.jpg', clicks:0}, {name: 'Cat3', src: 'cat3.jpg', clicks:0}, 
        {name: 'Cat4', src: 'cat4.jpg', clicks:0}, {name: 'Cat5', src: 'cat5.jpg', clicks:0}];


    const listView = {
        render: (cats) => {
            for (var i = 0; i < cats.length; i++) {

                // This is the number we're on...
                var cat = cats[i];

                // We're creating a DOM element for the number
                var li = document.createElement('li');
                li.textContent = cat.name;
                
                // ... and when we click, alert the value of `num`
                li.addEventListener('click', (function(catCopy) {
                    return function() {
                    oct.setCurrentCat(catCopy);
                    };
                })(cat));

                $('#catList').append(li);
            }

        }
    };

    const detailsView = {
        init: () => {
            this.catNameField = $('#catName')[0];
            this.catImageField = $(".catImg")[0];
            this.numClicksField = $('#num')[0];
            this.catImageField.addEventListener('click', () => {
                    const curCat = oct.getCurrentCat();
                    curCat.clicks++;
                    this.numClicksField.innerText = curCat.clicks;
                });      
        },
        render: () => {
            let cat = oct.getCurrentCat();
            this.catNameField.innerText = cat.name;
            this.catImageField.src = cat.src;
            this.numClicksField.innerText = cat.clicks;
        }
    };

    const oct = {

            currentCat: null,
            init: () => {
                detailsView.init();
                listView.render(cats);
            },
            setCurrentCat: (cat) => {
                currentCat = cat;
                detailsView.render(cat);
            },
            getCurrentCat: () => {
                return currentCat;
            },
            addCatClick: () => {
                currentCat.clicks++;
            }

    };

    oct.init();

});
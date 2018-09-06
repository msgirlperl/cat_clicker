$(function(){

    const model = {
        cats : [{name: 'Cat1', src: 'cat.jpg', clicks:0},{name: 'Cat2', src: 'cat2.jpg', clicks:0}, {name: 'Cat3', src: 'cat3.jpg', clicks:0}, 
        {name: 'Cat4', src: 'cat4.jpg', clicks:0}, {name: 'Cat5', src: 'cat5.jpg', clicks:0}], 
        currentCat : null
    }
 

    const listView = {
        init: function () {
            this.catList = $('#catList');
            this.render();
        },
        render: function () {
            cats = oct.getCats();
            for (var i = 0; i < cats.length; i++) {

                var cat = cats[i];

                var li = document.createElement('li');
                li.textContent = cat.name;
                
                li.addEventListener('click', (function(catCopy) {
                    return function() {
                    oct.setCurrentCat(catCopy);
                    detailsView.render();
                    };
                })(cat));

                this.catList.append(li);
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

            init: () => {
                model.currentCat = model.cats[0]
                listView.init();
                detailsView.init();
            },
            setCurrentCat: (cat) => {
                currentCat = cat;
            },
            getCurrentCat: () => {
                return currentCat;
            },
            addCatClick: () => {
                currentCat.clicks++;
            },
            getCats: () => {
                return model.cats;
            }


    };

    oct.init();

});
$(function(){

    const model = {
        cats : [{name: 'Cat1', src: 'cat.jpg', clicks:0},{name: 'Cat2', src: 'cat2.jpg', clicks:0}, {name: 'Cat3', src: 'cat3.jpg', clicks:0}, 
        {name: 'Cat4', src: 'cat4.jpg', clicks:0}, {name: 'Cat5', src: 'cat5.jpg', clicks:0}], 
        currentCat : null,
        adminMode: false
    }
 

    const listView = {
        init: function () {
            this.catList = $('#catList');
            this.render();
        },
        render: function () {
            cats = oct.getCats();
            this.catList.empty();
            for (var i = 0; i < cats.length; i++) {

                var cat = cats[i];

                var li = document.createElement('li');
                li.textContent = cat.name;
                
                li.addEventListener('click', (function(catCopy) {
                    return function() {
                    oct.setCurrentCat(catCopy);
                    detailsView.render();
                    adminView.render();
                    };
                })(cat));

                this.catList.append(li);
            }

        }
    };

    const detailsView = {
        init: function() {
            this.catNameField = $('#catName')[0];
            this.catImageField = $(".catImg")[0];
            this.numClicksField = $('#num')[0];
            this.catImageField.addEventListener('click', () => {
                    const curCat = oct.getCurrentCat();
                    curCat.clicks++;
                    this.numClicksField.innerText = curCat.clicks;
                });      
                        
            this.render();
        },
        render: function() {
            let cat = oct.getCurrentCat();
            this.catNameField.innerText = cat.name;
            this.catImageField.src = cat.src;
            this.numClicksField.innerText = cat.clicks;
        }
    };

    const adminView = {
        init: function() {
            this.adminButton = $('#btnAdmin');
            this.adminSection = $('#adminArea');
            catNameInput = $('#catNameInput');
            catSrcInput = $('#catSrcInput');
            catClicksInput = $('#catClicksInput');

            this.cancelButton = $('#btnCancel');
            this.cancelButton.on('click', () => {
                this.hideAdminSection();
            });

            this.saveButton = $('#btnSave');
            this.saveButton.click(function() {
                oct.updateCat(catNameInput.val(), catSrcInput.val(), catClicksInput.val());
                adminView.hideAdminSection();
            });

            this.adminButton[0].addEventListener('click', () => {
                adminView.showAdminSection();
                adminView.render();
            });
            this.hideAdminSection();
        },
        render: function() {
            let cat = oct.getCurrentCat();
            if (cat){
                catNameInput.val(cat.name);
                catSrcInput.val(cat.src);
                catClicksInput.val(cat.clicks);    
            }
        },
        showAdminSection: function() {
            $('#adminArea').show();
        },  
        hideAdminSection: function () {
            this.adminSection.hide();
        }
    };

    const oct = {

            init: () => {
                model.currentCat = model.cats[0]
                listView.init();
                detailsView.init();
                adminView.init();
            },
            setCurrentCat: (cat) => {
                model.currentCat = cat;
            },
            getCurrentCat: () => {
                return model.currentCat;
            },
            addCatClick: () => {
                model.currentCat.clicks++;
            },
            getCats: () => {
                return model.cats;
            },
            updateCat: (name, src, clicks) => {
                model.currentCat.name = name;
                model.currentCat.src = src;
                model.currentCat.clicks = clicks;
                listView.render();
            }
    };

    oct.init();

});
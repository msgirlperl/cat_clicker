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
            li.addEventListener('click', (function(cat) {
                return function() {
                    // $('#catName')[0].innerText = cat.name;
                    // $(".catImg")[0].src = cat.src;
                    // $('#num')[0].text = 0;
                    // cat.clicks = 0;
                    // $('#catImg').click(function(e) {
                    //     cat.clicks++;
                    //     $('#num')[0].innerHTML = cat.clicks;
                    // });
                   oct.setCurrentCat(cat);
                };
            })(cat));

            $('#catList').append(li);
        }

    }
};

const detailsView = {
    render: (cat) => {
        $('#catName')[0].innerText = cat.name;
        $(".catImg")[0].src = cat.src;
        $('#num')[0].text = cat.clicks;
        $('#catImg').click(function(e) {
            cat.clicks++;
            $('#num')[0].innerHTML = cat.clicks;
        });
    }
};

const oct = {

        currentCat: null,
        init: () => {
            listView.render(cats);
        },
        setCurrentCat: (cat) => {
            currentCat = cat;
            detailsView.render(cat);
        },
        getCurrentCat: () => {
            return currentCat;
        }

};

oct.init();

///LEAVING OFF: the clicks aren't working properly.
document.addEventListener('DOMContentLoaded', function () {
    // Use the Fetch API
    fetch('data.json')
        .then(data => data.json())
        .then(result => {
            speakersTemplate(result.speakers);
            conferenceTemplate(result.conferences);
            addFiltering();
        });

    conferenceTemplate = (conferences) => {
        const days = Object.keys(conferences).map(days => days);
        days.forEach(day => {
            let element = document.querySelector(`#${day}`);
            // This creates the div with the workshop info
            conferences[day].forEach(conference => {

                const conferenceDiv = document.createElement('div');
                conferenceDiv.classList.add(`${conference.category}-cat`, 'mix');

                const liContainer = document.createElement('li');
                conferenceDiv.appendChild(liContainer);

                liContainer.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'conference-wrapper', 'align-items-center');

                liContainer.innerHTML = `
                    <div class="image">
                        <img src="img/speaker_${conference.speaker_id}_sq.jpg" class="img-fluid rounded-circle">
                    </div>
                    <div class="conference-info">
                        <p class="mb-1 time">
                            <span class="badge badge-primary">
                                ${conference.time}
                            </span>
                            ${conference.workshop ? `
                                <span class="badge badge-danger">
                                    Workshop
                                </span>
                            ` : ``}
                        </p>
                        <p class="mb-1 title">${conference.title}</p>
                        <p class="mb-1 description">${conference.description}</p>
                        <p class="speaker">By: <span>${conference.speaker}</span></p>
                    </div>
                `;
                element.appendChild(conferenceDiv);
            });
        });
    }

    speakersTemplate = (speakers) => {
        const speakerList = document.querySelector('.speaker-list');
        speakers.forEach((speaker, index) => {
            // Increase by 1, to match the image name
            let id = index + 1;
            // Create the HTML Structure
            const speakerHTML = document.createElement('li');
            // Add some classes...
            speakerHTML.classList.add('col-sm-6', 'col-lg-3');
            // Build the HTML
            speakerHTML.innerHTML = `
                <div class="speaker-image">
                    <img src="img/speaker_${id}.jpg" class="img-fluid" alt="">
                </div>
                <div class="speaker-info py-3 text-center">
                    <h3 class="text-uppercase">${speaker.name}</h3>
                    <p>${speaker.description}</p>
                </div>
            `;
            speakerList.appendChild(speakerHTML);
        });
    }

    // Smooth Scroll
    const scroll = new SmoothScroll('a[href*="#"]', {
        // smooth scroll options
        // speed: 1000,
        updateURL: false
        // offset: 100
    });

    // Fixed Navigation on top
    const navigation = document.querySelector('.main-navigation'),
        siteHeader = document.querySelector('.site-header');

    const fixedNavigation = () => {
        if (window.innerWidth > 768) {
            window.onscroll = () => {
                if (window.scrollY >= siteHeader.clientHeight) {
                    navigation.classList.add('fixed-top');
                    navigation.classList.remove('pt-md-5');
                } else if (window.scrollY === 0) {
                    navigation.classList.add('pt-md-5');
                    navigation.classList.remove('fixed-top');
                }
            }
        } else {
            navigation.classList.remove('fixed-top');
        }
    }
    fixedNavigation();

    window.addEventListener('resize', function () {
        fixedNavigation();
    });

    // Toggle mobile menu
    const mobileIcon = document.querySelector('.mobile-menu i');
    mobileIcon.addEventListener('click', function () {
        if (navigation.classList.contains('mobile-active')) {
            navigation.classList.remove('d-flex', 'mobile-active', 'fixed-top');
            return;
        } else {
            // Displays the menu for mobile devices
            navigation.classList.add('d-flex', 'mobile-active', 'fixed-top');
        }
    });

    // Adds filtering
    const addFiltering = () => {
        let workshopList = document.querySelector('#workshops');
        mixitup(workshopList);
    }

    // Animations for the Numbers
    setTimeout(() => {
        const conferencesContainer = document.querySelector('#conference-total');
        // CountUp arguments: element, start number, end number, decimal, duration
        const conferenceAnimation = new CountUp('conferencesContainer', 0 12, 0, 5);
        conferenceAnimation.start();

        const workshopsContainer = document.querySelector('#workshops-total');
        const workshopsAnimation = new CountUp('workshopsContainer', 0, 4, 0, 3);
        workshopsAnimation.start();

        const daysContainer = document.querySelector('#days-total');
        const daysAnimation = new CountUp('daysContainer', 0, 2, 0, 2);
        daysAnimation.start();
    }, 500);


});
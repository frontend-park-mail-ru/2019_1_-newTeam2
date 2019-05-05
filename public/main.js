import router from 'Services/router.js';

import {TrainingController} from 'Controllers/TrainingController.js';
import {LeaderboardController} from 'Controllers/LeaderboardController.js';
import {MenuController} from 'Controllers/MenuController.js';
import {ProfileController} from 'Controllers/ProfileController.js';
import {SignupController} from 'Controllers/SignupController.js';
import {LoginController} from 'Controllers/LoginController.js';
import {DictionaryController} from 'Controllers/DictionaryController.js';
import {CardController} from 'Controllers/CardController.js';
import {ChatController} from 'Controllers/ChatController.js';
// import {IframeChat} from 'Components/IframeChat/IframeChat.js';

// document.getElementsByTagName('body')[0].appendChild(new IframeChat().render());

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            // console.log(reg);
        })
        .catch((err) => {
            // console.log(err);
        });
}

const controllers = new Set([
    ['^$', MenuController],
    ['^menu$', MenuController],
    ['^login$', LoginController],
    ['^dictionaries/me$', DictionaryController],
    ['^leaderboard$', LeaderboardController],
    ['^signup$', SignupController],
    ['^dictionary$', CardController],
    ['^profile/me$', ProfileController],
    ['^dictionary/[0-9]+$', CardController],
    ['^training$', TrainingController],
    ['^chat$', ChatController]
]);


controllers.forEach((value) => {
    router.register(value[0], value[1]);
});

router.render();
